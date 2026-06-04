"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const impressions = [
    "高級感",
    "かわいい",
    "未来的",
    "ナチュラル",
    "ビジネス",
    "ポップ",
    "ミニマル",
    "ダーク",
];

export default function ImpressionClient() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const toggle = (item: string) => {
        setSelected((prev) =>
            prev.includes(item)
                ? prev.filter((v) => v !== item)
                : [...prev, item]
        );
    };

    const generate = async () => {
        if (selected.length === 0) return;

        setLoading(true);

        const res = await fetch("/api/generate-color", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mode: "impression",
                input: selected.join(","),
            }),
        });

        const data = await res.json();

        console.log("status", res.status);
        console.log("data", data);

        router.replace(`/generate/result?id=${data.id}`);
    };

    return (
        <div className="p-8 flex flex-col gap-6">
            <h1 className="text-xl font-bold">
                与えたい印象を選んでください
            </h1>

            <div className="grid grid-cols-2 gap-3">
                {impressions.map((item) => (
                    <label
                        key={item}
                        className={`border p-3 rounded cursor-pointer ${selected.includes(item)
                            ? "bg-blue-500 text-white"
                            : ""
                            }`}
                    >
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selected.includes(item)}
                            onChange={() => toggle(item)}
                        />
                        {item}
                    </label>
                ))}
            </div>

            <button
                onClick={generate}
                disabled={loading || selected.length === 0}
                className="bg-black text-white p-3 rounded disabled:opacity-50"
            >
                {loading ? "生成中..." : "生成する"}
            </button>
        </div>
    );
}