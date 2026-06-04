import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { z } from "zod";
import { setStore } from "@/lib/store";
import { Vibrant } from "node-vibrant/node";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("image") as File | null;

        if (!file) {
            return Response.json(
                {
                    error: "image is required",
                },
                {
                    status: 400,
                }
            );
        }

        // 画像 → Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // node-vibrantで代表色抽出
        const palette = await Vibrant.from(buffer).getPalette();

        const extractedColors = [
            palette.Vibrant?.hex,
            palette.DarkVibrant?.hex,
            palette.LightVibrant?.hex,
            palette.Muted?.hex,
            palette.DarkMuted?.hex,
            palette.LightMuted?.hex,
        ].filter(Boolean) as string[];

        console.log("EXTRACTED COLORS:", extractedColors);

        const result = await generateText({
            model: openai("gpt-4o-mini"),

            output: Output.object({
                schema: z.object({
                    base: z.string(),
                    main: z.string(),
                    accent: z.string(),
                }),
            }),

            prompt: `
あなたはプロのUIデザイナーです。

以下は画像から実際に抽出した代表色です。

${extractedColors.join("\n")}

この色を分析し、

- base
- main
- accent

を決定してください。

ルール:

- HEX形式で返すこと
- baseは背景向き
- mainは主役カラー
- accentはCTA向き
- UIとして自然な配色
- コントラストを考慮
- 必ず抽出色をベースに選定すること
`,
        });

        console.log("AI OUTPUT:", result.output);

        const id = crypto.randomUUID();

        setStore(id, result.output);

        return Response.json({
            id,
        });
    } catch (e) {
        console.error("IMAGE API ERROR:", e);

        return Response.json(
            {
                error: "generation failed",
                detail: String(e),
            },
            {
                status: 500,
            }
        );
    }
}