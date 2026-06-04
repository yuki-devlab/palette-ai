"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConditionClient() {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        if (!input.trim()) return;

        setLoading(true);

        const res = await fetch("/api/generate-color", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mode: "condition",
                input,
            }),
        });

        const data = await res.json();

        router.replace(`/generate/result?id=${data.id}`);
    };

    return (
        <div className="p-8 flex flex-col gap-6 max-w-xl">
            <h1 className="text-xl font-bold">
                条件を入力してください
            </h1>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="例：IT系スタートアップ向けの信頼感のある配色"
                className="border p-3 rounded h-40"
            />

            <button
                onClick={generate}
                disabled={loading || !input.trim()}
                className="bg-black text-white p-3 rounded disabled:opacity-50"
            >
                {loading ? "生成中..." : "生成する"}
            </button>
        </div>
    );
}