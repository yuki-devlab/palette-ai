"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { ArrowLeftAlt as ArrowLeftAltW700, ArrowRightAlt as ArrowRightAltW700 } from "@material-symbols-svg/react/w700";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ConditionClient() {
    const [inputText, setInputText] = useState("");
    const router = useRouter();

    const handleNavigate = () => {
        if (!inputText.trim()) return;

        const conditions = inputText
            .split(/[、,]/)
            .map((item) => item.trim())
            .filter(Boolean);
        
        if (conditions.length === 0) return;

        const historyId = nanoid(15);

        sessionStorage.setItem("generatedColors", JSON.stringify({
            id: historyId,
            mode: "condition",
            params: conditions,
        }));

        router.push(`/generate/result?id=${historyId}`);
    };

    return (
        <div className={`
            flex flex-col gap-16 justify-center flex-1 mx-auto px-4 w-full
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
                    <h2 className="font-bold text-2xl [text-box:trim-both_cap_alphabetic]">
                        指定した条件から自動生成
                    </h2>
                    <div className="bg-white drop-shadow p-7 relative rounded-lg">
                        <p className="leading-relaxed [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                            指定したい条件を、読点もしくはカンマで区切って入力してください
                        </p>
                        <div className="absolute bg-white -bottom-2.5 h-5 left-1/2 rotate-45 rounded-br -translate-x-1/2 w-5" />
                    </div>
                </div>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="カフェ、20代女性、ナチュラル…"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                            e.preventDefault();
                            handleNavigate();
                        }
                    }}
                    className={`
                        bg-slate-200 border border-slate-400 p-5 rounded-lg text-sm w-full focus:border-slate-800 focus:outline-none
                        md:w-lg md:px-6
                    `}
                />
                <button
                    type="button"
                    className="bg-sky-500 py-4.5 relative rounded-full disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:bg-blue-500"
                    onClick={handleNavigate}
                    disabled={!inputText.trim()}
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