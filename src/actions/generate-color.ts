"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { z } from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getSubscription } from "@/lib/subscription";

type GenerateColorProps = {
    historyId: string;
    mode: "auto" | "impression" | "condition" | "remaining";
    params?: any;
    lockedColors?: {
        base?: string | null;
        main?: string | null;
        accent?: string | null;
    };
};

export async function generateColor({ historyId, mode, params, lockedColors }: GenerateColorProps) {
    const session = await auth();
    const { isPro } = await getSubscription();

    const MAX_GENERATIONS = isPro ? 100 : 10;
    const AI_MODEL = isPro ? "gpt-4o" : "gpt-4o-mini";

    if (session?.user) {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const usageCount = await prisma.history.count({
            where: {
                userId: session.user.id,
                createdAt: {
                    gte: startOfDay,
                },
            },
        });

        if (usageCount >= MAX_GENERATIONS) {
            throw new Error(
                isPro
                    ? "本日の生成上限（100回）に達しました。明日またお試しください。"
                    : "本日の生成上限（10回）に達しました。無制限で生成するには、Proプランへのアップグレードをご検討ください。"
            );
        }
    } else {
        const cookieStore = await cookies();
        const guestUsage = cookieStore.get("guest_generation_count");
        const count = guestUsage ? parseInt(guestUsage.value, 10) : 0;

        const GUEST_MAX_LIMIT = 5;

        if (count >= GUEST_MAX_LIMIT) {
            return {
                success: false,
                error: "お試し生成の上限（５回）に達しました。続けて生成するには、無料アカウント登録をお願いします！",
            };
        }

        cookieStore.set({
            name: "guest_generation_count",
            value: String(count + 1),
            maxAge: 60 * 60 * 24,
            httpOnly: true,
            path: "/",
        });
    }

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
        model: openai(AI_MODEL),
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

        revalidatePath("/");
    }

    return finalColors;
}