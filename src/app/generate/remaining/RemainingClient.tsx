"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Colors = {
    base: string;
    main: string;
    accent: string;
};

export default function RemainingClient() {
    const router = useRouter();

    const [colors, setColors] = useState<Colors>({
        base: "",
        main: "",
        accent: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (key: keyof Colors, value: string) => {
        setColors((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const generate = async () => {
        setLoading(true);

        const res = await fetch("/api/generate-color", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mode: "remaining",
                input: colors,
            }),
        });

        const data = await res.json();

        router.replace(`/generate/result?id=${data.id}`);
    };

    return (
        <div className="p-8 flex flex-col gap-6 max-w-md">
            <h1 className="text-xl font-bold">
                既存の色を入力してください（空欄あり）
            </h1>

            <input
                placeholder="Baseカラー (#xxxxxx)"
                value={colors.base}
                onChange={(e) => handleChange("base", e.target.value)}
                className="border p-2 rounded"
            />

            <input
                placeholder="Mainカラー (#xxxxxx)"
                value={colors.main}
                onChange={(e) => handleChange("main", e.target.value)}
                className="border p-2 rounded"
            />

            <input
                placeholder="Accentカラー (#xxxxxx)"
                value={colors.accent}
                onChange={(e) => handleChange("accent", e.target.value)}
                className="border p-2 rounded"
            />

            <button
                onClick={generate}
                disabled={loading}
                className="bg-black text-white p-3 rounded disabled:opacity-50"
            >
                {loading ? "生成中..." : "不足分を生成"}
            </button>
        </div>
    );
}