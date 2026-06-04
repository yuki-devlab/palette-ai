"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AutoClient() {
    const router = useRouter();

    useEffect(() => {
        const run = async () => {
            const res = await fetch("/api/generate-color", {
                method: "POST",
                body: JSON.stringify({
                    mode: "auto",
                }),
            })

            const data = await res.json();

            router.replace(`/generate/result?id=${data.id}`);
        }

        run();
    }, [router])

    return <p>配色を生成中...</p>;
}