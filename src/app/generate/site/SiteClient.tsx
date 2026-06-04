"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SiteClient() {
    const router = useRouter();
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        if (!url.trim()) return;

        setLoading(true);

        const res = await fetch("/api/generate-color", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mode: "site",
                input: url,
            }),
        });

        const data = await res.json();

        console.log("API RESPONSE:", data);

        if (!res.ok || !data?.id) {
            console.error("API ERROR:", data);
            alert("配色生成に失敗しました");
            setLoading(false);
            return;
        }

        router.replace(`/generate/result?id=${data.id}`);
    };

    return (
        <div className="p-8 flex flex-col gap-6 max-w-xl">
            <h1 className="text-xl font-bold">
                サイトURLを入力してください
            </h1>

            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="border p-3 rounded"
            />

            <button
                onClick={generate}
                disabled={loading || !url.trim()}
                className="bg-black text-white p-3 rounded disabled:opacity-50"
            >
                {loading ? "解析中..." : "配色を抽出"}
            </button>
        </div>
    );
}