"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImageClient() {
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        if (!file) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("/api/generate-image-color", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!res.ok || !data.id) {
            console.error(data);
            return;
        }

        router.replace(`/generate/result?id=${data.id}`);
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <h1 className="text-xl font-bold">
                画像から配色を抽出
            </h1>

            <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                    setFile(e.target.files?.[0] ?? null)
                }
                className="border border-gray-500 p-2"
            />

            <button
                onClick={generate}
                disabled={!file || loading}
                className="bg-black text-white p-3 rounded disabled:opacity-50"
            >
                {loading ? "解析中..." : "配色を抽出"}
            </button>
        </div>
    );
}