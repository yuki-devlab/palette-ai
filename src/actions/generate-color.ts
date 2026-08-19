"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { z } from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getSubscriptionStatus } from "@/lib/subscription-status";

type GenerateColorProps = {
    historyId: string;
    mode: "auto" | "impression" | "condition" | "remaining";
    params?: string | string[];
    lockedColors?: {
        base?: string | null;
        main?: string | null;
        accent?: string | null;
    };
};

export async function generateColor({
    historyId,
    mode,
    params,
    lockedColors,
}: GenerateColorProps) {
    const session = await auth();
    const { isPro } = await getSubscriptionStatus(session?.user?.id);

    const generationLimit = isPro ? 100 : 10;
    const aiModel = isPro ? "gpt-5.4-mini" : "gpt-4o-mini";

    if (session?.user?.id) {
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

        if (usageCount >= generationLimit) {
            return {
                success: false,
                errorType: "LIMIT_EXCEEDED",
            };
        }
    } else {
        const cookieStore = await cookies();
        const guestCount = Number(cookieStore.get("guest-generation-count")?.value || 0);

        if (guestCount >= 5) {
            return {
                success: false,
                errorType: "GUEST_LIMIT_EXCEEDED",
            };
        }

        cookieStore.set({
            name: "guest-generation-count",
            value: String(guestCount + 1),
            path: "/",
            maxAge: 60 * 60 * 24,
            httpOnly: true,
        });
    }

    const prompts = [
        "Webサイトによく使われている、おすすめのベースカラー・メインカラー・アクセントカラーを教えてください。",
        "ただしベースカラーは、背景色など全体の70%を占める色、メインカラーは、ロゴや見出しなど全体の25%を占める色、アクセントカラーは、ボタンなど全体の5%を占める色として考えてください。",
    ];

    const paramsText = Array.isArray(params) ? params.join("、") : params;

    if (paramsText) {
        if (mode === "impression") {
            prompts.push(`また、色彩心理学に基づいて、以下の印象に合う配色にしてください。\n${paramsText}`);
        } else if (mode === "condition") {
            prompts.push(`また、以下の条件に合う配色にしてください。\n${paramsText}`);
        }
    }

    if (lockedColors?.base || lockedColors?.main || lockedColors?.accent) {
        prompts.push("さらに、以下の色を固定した状態で、その色に合う配色を再生成してください。");

        if (lockedColors.base) {
            prompts.push(`ベースカラー：${lockedColors.base}`);
        }
        if (lockedColors.main) {
            prompts.push(`メインカラー：${lockedColors.main}`);
        }
        if (lockedColors.accent) {
            prompts.push(`アクセントカラー：${lockedColors.accent}`);
        }
    }

    const { output: generatedColors } = await generateText({
        model: openai(aiModel),
        output: Output.object({
            schema: z.object({
                baseColor: z.string().describe("HEXカラーコード"),
                mainColor: z.string().describe("HEXカラーコード"),
                accentColor: z.string().describe("HEXカラーコード"),
            }),
        }),
        prompt: prompts.join("\n\n"),
    });

    const finalColors = {
        baseColor: lockedColors?.base || generatedColors.baseColor,
        mainColor: lockedColors?.main || generatedColors.mainColor,
        accentColor: lockedColors?.accent || generatedColors.accentColor,
    };

    if (session?.user?.id) {
        await prisma.history.upsert({
            where: {
                id: historyId,
            },
            update: finalColors,
            create: {
                id: historyId,
                userId: session.user.id,
                mode,
                ...finalColors,
            },
        });

        revalidatePath("/", "layout");
    }

    return finalColors;
}