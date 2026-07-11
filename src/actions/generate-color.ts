"use server";

import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { z } from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

type GenerateColorProps = {
    historyId: string;
    mode: string;
    lockedColors?: {
        baseColor?: string;
        mainColor?: string;
        accentColor?: string;
    };
};

export async function generateColor({ historyId, mode, lockedColors }: GenerateColorProps) {
    const session = await auth();

    const result = await generateText({
        model: openai("gpt-4o"),
        output: Output.object({
            schema: z.object({
                baseColor: z.string().describe("HEXカラーコード（例：#E2E8F0）"),
                mainColor: z.string().describe("HEXカラーコード（例：#1D293D）"),
                accentColor: z.string().describe("HEXカラーコード（例：#00A6F4）"),
            }),
        }),
        prompt: `
            Webサイトによく使われている、おすすめのベースカラー・メインカラー・アクセントカラーを教えてください。
            ただしベースカラーは、背景色など全体の70%を占める色、そしてメインカラーは、ロゴや見出しなど全体の25%を占める色、さらにアクセントカラーは、ボタンなど全体の5%を占める色として考えてください。
        `,
    });

    const generatedColors = result.output;

    const finalColors = {
        baseColor: lockedColors?.baseColor || generatedColors.baseColor,
        mainColor: lockedColors?.mainColor || generatedColors.mainColor,
        accentColor: lockedColors?.accentColor || generatedColors.accentColor,
    };

    if (session?.user) {
        await prisma.history.create({
            data: {
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