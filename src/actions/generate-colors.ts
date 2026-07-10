"use server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

type GenerateColorProps = {
    base: string;
    main: string;
    accent: string;
};

type saveHistoryProps = {
    id: string;
    base: string;
    main: string;
    accent: string;
    mode: string;
};

export async function generateColors({ base, main, accent }: GenerateColorProps) {
    const { text } = await generateText({
        model: openai("gpt-5"),
        instructions: "あなたは、プロのWebデザイナーです。以下の条件に従い、おすすめの配色をJSON形式で回答してください。",
        prompt: `
            Webデザインでよく使われている、おすすめのベースカラー・メインカラー・アクセントカラーを教えてください。
            
            【条件】
            - ベースカラー（背景色など 70%）：${base || "おまかせ"}
            - メインカラー（ロゴ・見出しなど 25%）：${main || "おまかせ"}
            - アクセントカラー（ボタンなど 5%）：${accent || "おまかせ"}

            【出力形式】
            { "base": "Hexコード", "main": "Hexコード", "accent": "Hexコード" }
        `,
    });

    return JSON.parse(text.trim()) as { base: string; main: string; accent: string };
}

export async function saveHistory({ id, base, main, accent, mode }: saveHistoryProps) {
    const session = await auth();

    if (!session?.user.id) {
        return {
            success: false,
        };
    }

    await prisma.history.upsert({
        where: {
            id: id,
        },
        update: {
            baseColor: base,
            mainColor: main,
            accentColor: accent,
        },
        create: {
            id: id,
            userId: session.user.id,
            mode: mode,
            baseColor: base,
            mainColor: main,
            accentColor: accent,
        },
    });

    return {
        success: true,
    };
}