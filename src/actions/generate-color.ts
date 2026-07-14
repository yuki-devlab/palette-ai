"use server";

import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { z } from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

type GenerateColorProps = {
    historyId: string;
    mode: "random" | "impression" | "condition" | "remaining";
    params?: any;
    lockedColors?: {
        base?: string | null;
        main?: string | null;
        accent?: string | null;
    };
};

export async function generateColor({ historyId, mode, params, lockedColors }: GenerateColorProps) {
    const session = await auth();
    const isLocked = lockedColors?.base || lockedColors?.main || lockedColors?.accent;

    let promptMessage = `
        Webサイトによく使われている、おすすめのベースカラー・メインカラー・アクセントカラーを教えてください。
        ただしベースカラーは、背景色など全体の70%を占める色、そしてメインカラーは、ロゴや見出しなど全体の25%を占める色、さらにアクセントカラーは、ボタンなど全体の5%を占める色として考えてください。\n\n
    `;

    if (mode === "impression") {
        const impressionText = Array.isArray(params) ? params.join("、") : "";

        if (impressionText) {
            promptMessage += `
                また、色彩心理学に基づいて、以下の印象に合う配色にしてください。

                ${impressionText}
            `;
        }
    } else if (mode === "condition") {
        const conditionText = Array.isArray(params) 
            ? params.join("、") 
            : (typeof params === "string" ? params : "");

        if (conditionText) {
            promptMessage += `
                また、以下の条件に合う配色にしてください。

                ${conditionText}
            `;
        }
    }

    if (isLocked) {
        promptMessage += `そして、以下の色が固定されている場合、この色を固定した状態で、その色に合う他の色を再生成してください。\n\n`;

        if (lockedColors.base) {
            promptMessage += `- ベースカラー：${lockedColors.base}\n`;
        }
        if (lockedColors.main) {
            promptMessage += `- メインカラー：${lockedColors.main}\n`;
        }
        if (lockedColors.accent) {
            promptMessage += `- アクセントカラー：${lockedColors.accent}`;
        }
    }

    const result = await generateText({
        model: openai("gpt-4o"),
        output: Output.object({
            schema: z.object({
                baseColor: z.string().describe("HEXカラーコード（例：#E2E8F0）"),
                mainColor: z.string().describe("HEXカラーコード（例：#1D293D）"),
                accentColor: z.string().describe("HEXカラーコード（例：#00A6F4）"),
            }),
        }),
        prompt: promptMessage,
    });

    const generatedColors = result.output;

    const finalColors = {
        baseColor: lockedColors?.base || generatedColors.baseColor,
        mainColor: lockedColors?.main || generatedColors.mainColor,
        accentColor: lockedColors?.accent || generatedColors.accentColor,
    };

    if (session?.user) {
        await prisma.history.upsert({
            where: { id: historyId },
            update: {
                baseColor: finalColors.baseColor,
                mainColor: finalColors.mainColor,
                accentColor: finalColors.accentColor,
            },
            create: {
                id: historyId,
                userId: session.user.id,
                mode: mode,
                baseColor: finalColors.baseColor,
                mainColor: finalColors.mainColor,
                accentColor: finalColors.accentColor,
            },
        });
    }

    return finalColors;
}