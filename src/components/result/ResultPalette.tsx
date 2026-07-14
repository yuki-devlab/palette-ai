"use client";

import { useState } from "react";
import { Refresh as RefreshW700 } from "@material-symbols-svg/react/w700";
import ColorSchemeItem from "@/components/result/ColorSchemeItem";

type ColorSchemeProps = {
    baseColor: string;
    mainColor: string;
    accentColor: string;
};

type LockColorProps = {
    base: boolean;
    main: boolean;
    accent: boolean;
};

type ResultPaletteProps = {
    colorScheme: ColorSchemeProps | null;
    onRegenerate: (locked: LockColorProps) => void;
    isRegenerating: boolean;
    isLoading: boolean;
};

const colorInfoList = [
    {
        id: "base",
        schemeKey: "baseColor",
        title: "ベースカラー",
        description: "（背景色など）",
    },
    {
        id: "main",
        schemeKey: "mainColor",
        title: "メインカラー",
        description: "（ロゴ・見出しなど）",
    },
    {
        id: "accent",
        schemeKey: "accentColor",
        title: "アクセントカラー",
        description: "（ボタンなど）",
    },
] as const;

export default function ResultPalette({ colorScheme, onRegenerate, isRegenerating, isLoading }: ResultPaletteProps) {
    const [isLocked, setIsLocked] = useState<LockColorProps>({
        base: false,
        main: false,
        accent: false,
    });

    const toggleLock = (key: keyof LockColorProps) => {
        setIsLocked((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="flex flex-col gap-8 items-center w-min">
            <div className="flex gap-4 items-end">
                <span className="bg-sky-500 h-6 origin-bottom -rotate-45 w-0.75" />
                <h2 className="font-bold text-2xl [text-box:trim-both_cap_alphabetic]">
                    生成結果
                </h2>
                <span className="bg-sky-500 h-6 origin-bottom rotate-45 w-0.75" />
            </div>
            <p className="bg-yellow-100 leading-loose p-6 rounded-lg [text-box:trim-both_cap_alphabetic] text-slate-500 text-xs">
                あなたにおすすめしたい配色はこちらです！
                <br />
                イメージに合う配色が見つからない場合は、何度でも再生成できます。
                <br />
                また、好きな色だけを固定して、それ以外の色を再生成することも可能です。
            </p>
            <dl className="gap-x-10 gap-y-5 grid grid-cols-[auto_auto] items-center">
                {colorInfoList.map((colorInfo) => {
                    const isThisLocked = isLocked[colorInfo.id];
                    const isItemLoading = isLoading && !isThisLocked;

                    return (
                        <ColorSchemeItem
                            key={colorInfo.id}
                            title={colorInfo.title}
                            description={colorInfo.description}
                            color={colorScheme?.[colorInfo.schemeKey] ?? ""}
                            isLocked={isLocked[colorInfo.id]}
                            onToggleLock={() => toggleLock(colorInfo.id)}
                            isLoading={isItemLoading}
                        />
                    )
                })}
            </dl>
            <button
                type="button"
                className="self-end text-slate-500 text-xs underline underline-offset-[50%] hover:text-slate-800"
            >
                ベースカラー・メインカラー・アクセントカラーとは？
            </button>
            <button
                type="button"
                className={`
                    bg-sky-500 flex gap-2 h-15 items-center justify-center rounded-lg w-full disabled:cursor-not-allowed disabled:opacity-75 hover:enabled:bg-blue-500
                    ${isRegenerating && "gap-2.5"}
                `}
                onClick={() => {
                    if (isRegenerating || isLoading) return;
                    
                    onRegenerate(isLocked);
                }}
                disabled={isRegenerating || isLoading}
            >
                {isRegenerating ? (
                    <div className="animate-spin border-3 border-t-white border-white/25 h-4.5 rounded-full w-4.5" />
                ) : (
                    <RefreshW700
                        size={20}
                        color="var(--color-white)"
                    />
                )}
                <span className="font-bold [text-box:trim-both_cap_alphabetic] text-white">
                    {isRegenerating ? "生成中…" : "再生成"}
                </span>
            </button>
        </div>
    );
}