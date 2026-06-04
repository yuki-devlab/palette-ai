"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Colors = {
    base: string;
    main: string;
    accent: string;
};

export default function ResultClient() {
    const params = useSearchParams();
    const id = params.get("id");

    const [colors, setColors] = useState<Colors | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            const res = await fetch(`/api/result?id=${id}`);
            const data = await res.json();

            setColors(data);
            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading || !colors) {
        return <div>🎨 生成結果を読み込み中...</div>;
    }

    return (
        <div style={{ display: "flex", gap: 20 }}>
            <ColorBox label="Base" color={colors.base} />
            <ColorBox label="Main" color={colors.main} />
            <ColorBox label="Accent" color={colors.accent} />
        </div>
    );
}

function ColorBox({ label, color }: any) {
    return (
        <div
            style={{
                width: 150,
                height: 150,
                background: color,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {label}
            <br />
            {color}
        </div>
    );
}