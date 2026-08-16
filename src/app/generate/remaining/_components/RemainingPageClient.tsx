"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { ArrowLeftAlt as ArrowLeftAltW700, ArrowRightAlt as ArrowRightAltW700 } from "@material-symbols-svg/react/w700";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ColorSchemeItem from "@/app/generate/remaining/_components/ColorSchemeItem";

const colorInfoList = [
    {
        id: "base",
        title: "ベースカラー",
        description: "（背景色など）",
        placeholder: "#E2E8F0",
    },
    {
        id: "main",
        title: "メインカラー",
        description: "（ロゴ・見出しなど）",
        placeholder: "#1D293D",
    },
    {
        id: "accent",
        title: "アクセントカラー",
        description: "（ボタンなど）",
        placeholder: "#00A6F4",
    },
] as const;

export default function RemainingClient() {
    const router = useRouter();

    const [colors, setColors] = useState({
        base: "",
        main: "",
        accent: "",
    });

    const handleColorChange = (key: "base" | "main" | "accent", value: string) => {
        let formatted = value.trim();

        if (formatted && !formatted.startsWith("#")) {
            formatted = "#" + formatted;
        }

        if (formatted.length > 7) {
            formatted = formatted.slice(0, 7);
        }

        setColors((prev) => ({
            ...prev,
            [key]: formatted,
        }));
    };

    const isValidHex = (val: string) => {
        return /^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/.test(val);
    };

    const isReady = () => {
        const hasAtLeastOne = !!colors.base || !!colors.main || !!colors.accent;
        if (!hasAtLeastOne) return false;

        if (colors.base && !isValidHex(colors.base)) return false;
        if (colors.main && !isValidHex(colors.main)) return false;
        if (colors.accent && !isValidHex(colors.accent)) return false;

        return true;
    };

    const handleNavigate = () => {
        if (!isReady()) return;

        const historyId = nanoid(15);

        const lockedColors = {
            base: colors.base || null,
            main: colors.main || null,
            accent: colors.accent || null,
        };

        sessionStorage.setItem("generated-colors", JSON.stringify({
            id: historyId,
            mode: "remaining",
            lockedColors,
        }));

        router.push(`/generate/result?id=${historyId}`);
    };

    return (
        <div className={`
            flex flex-col gap-16 justify-center mx-auto px-4 w-full h-full
            md:w-fit
        `}>
            <Link
                href="/"
                className="bg-slate-300 flex h-10 items-center justify-center rounded-full w-10 hover:bg-slate-400"
            >
                <ArrowLeftAltW700
                    size={24}
                    color="var(--color-white)"
                />
            </Link>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-8 text-center">
                    <h2 className={`
                        font-bold text-[22px] [text-box:trim-both_cap_alphabetic]
                        md:text-2xl
                    `}>
                        決まっている色から残りを自動生成
                    </h2>
                    <div className="bg-white drop-shadow p-7 relative rounded-lg">
                        <p className="leading-relaxed [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                            ベースカラー・メインカラー・アクセントカラーのうち
                            <br />
                            決まっている色のみ入力してください
                        </p>
                        <div className="absolute bg-white -bottom-2.5 h-5 left-1/2 rotate-45 rounded-br -translate-x-1/2 w-5" />
                    </div>
                </div>
                <dl className={`
                    gap-10 grid grid-cols-1 items-center
                    md:grid-cols-[auto_auto]
                `}>
                    {colorInfoList.map((colorInfo) => (
                        <ColorSchemeItem
                            key={colorInfo.id}
                            title={colorInfo.title}
                            description={colorInfo.description}
                            value={colors[colorInfo.id]}
                            placeholder={colorInfo.placeholder}
                            onChange={(val) => handleColorChange(colorInfo.id, val)}
                        />
                    ))}
                </dl>
                <button
                    type="button"
                    className="bg-sky-500 py-4.5 relative rounded-full disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:bg-blue-500"
                    onClick={handleNavigate}
                    disabled={!isReady()}
                >
                    <span className="font-bold [text-box:trim-both_cap_alphabetic] text-white">
                        生成
                    </span>
                    <ArrowRightAltW700
                        size={20}
                        color="var(--color-white)"
                        className="absolute right-10 top-1/2 -translate-y-1/2"
                    />
                </button>
            </div>
        </div>
    );
}