"use client";

import { useState } from "react";
import { Check, ContentCopy, LockOpen, LockFill } from "@material-symbols-svg/react";

type ColorSchemeItemProps = {
    title: string;
    description: string;
    color: string;
    isLocked: boolean;
    onToggleLock: () => void;
    isLoading: boolean;
};

const isDark = (color: string) => {
    if (!color) {
        return false;
    }

    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness < 128;
};

export default function ColorSchemeItem({ title, description, color, isLocked, onToggleLock, isLoading }: ColorSchemeItemProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        if (!color) return;

        try {
            await navigator.clipboard.writeText(color);

            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1000);
        } catch (error) {
            console.error("コピーに失敗しました", error);
        }
    }

    return (
        <div className={`
            flex flex-col gap-5
            md:contents
        `}>
            <div className="flex flex-col gap-4 whitespace-nowrap">
                <dt className="font-bold [text-box:trim-both_cap_alphabetic] text-sm">
                    {title}
                </dt>
                <dd className="[text-box:trim-both_cap_alphabetic] text-slate-500 text-xs">
                    {description}
                </dd>
            </div>
            <div
                style={isLoading ? undefined : { backgroundColor: color }}
                className={`
                    border border-slate-300 flex items-center justify-between p-5 rounded w-full
                    md:w-64
                    ${isLoading ? "animate-pulse bg-slate-300" : ""}
                `}
            >
                <button
                    type="button"
                    className={`
                        ${
                            isDark(color) ? (
                                "text-white/50 hover:text-white/75"
                            ) : (
                                "text-slate-800/50 hover:text-slate-800/75"
                            )
                        }
                        ${isLoading ? "invisible": ""}
                    `}
                    onClick={onToggleLock}
                    disabled={isLoading}
                >
                    {isLocked ? (
                        <LockFill size={16} />
                    ) : (
                        <LockOpen size={16} />
                    )}
                </button>
                <span className={`
                    [text-box:trim-both_cap_alphabetic] text-sm
                    ${isDark(color) ? "text-white" : "text-slate-800"}
                    ${isLoading ? "invisible" : ""}
                `}>
                    {color}
                </span>
                <button
                    type="button"
                    className={`
                        ${
                            isDark(color) ? (
                                "text-white/50 hover:text-white/75"
                            ) : (
                                "text-slate-800/50 hover:text-slate-800/75"
                            )
                        }
                        ${isLoading ? "invisible" : ""}
                    `}
                    onClick={handleCopy}
                    disabled={isLoading}
                >
                    {isCopied ? (
                        <Check size={16} />
                    ) : (
                        <ContentCopy size={16} />
                    )}
                </button>
            </div>
        </div>
    );
}