import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { z } from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { setStore } from "@/lib/store";

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { mode, input } = await req.json();

        const result = await generateText({
            model: openai("gpt-4o-mini"),
            output: Output.object({
                schema: z.object({
                    base: z.string(),
                    main: z.string(),
                    accent: z.string(),
                }),
            }),
            prompt: buildPrompt(mode, input, siteColors),
        });

        console.log("AI OUTPUT:", result.output);

        // 🧠 ここが重要：DBが唯一のIDソース
        const history = await prisma.history.create({
            data: {
                userId: session.user.id,
                mode,
                base: result.output.base,
                main: result.output.main,
                accent: result.output.accent,
            },
        });

        // （任意）メモリキャッシュ
        setStore(history.id, result.output);

        return Response.json({
            id: history.id,
        });

    } catch (e) {
        console.error("API ERROR:", e);

        return Response.json(
            {
                error: "generation failed",
                detail: String(e),
            },
            { status: 500 }
        );
    }
}

/**
 * 🎯 プロンプト生成
 */
function buildPrompt(mode: string, input: any, siteColors: string[]) {
    return `
あなたはプロのUIデザイナーです。
Webサイト用の配色（base / main / accent）を生成してください。

# 出力形式
{
  "base": "#xxxxxx",
  "main": "#xxxxxx",
  "accent": "#xxxxxx"
}

# ルール
- 必ずHEX形式
- UIとして自然な配色
- コントラストを考慮
- 3色を調和させる

---

# モード
${mode}

---

# 入力
${formatInput(mode, input)}

---

${mode === "impression" ? `
印象を強く反映してください。
` : ""}

${mode === "condition" ? `
条件を解釈してUIとして最適化してください。
` : ""}

${mode === "remaining" ? `
指定色は変更禁止、未入力のみ補完してください。
base: ${input?.base || ""}
main: ${input?.main || ""}
accent: ${input?.accent || ""}
` : ""}

`;
}

/**
 * 入力整形
 */
function formatInput(mode: string, input: any) {
    if (!input) return "なし";

    if (mode === "site") return `URL: ${input}`;

    if (typeof input === "string") return input;

    return JSON.stringify(input);
}