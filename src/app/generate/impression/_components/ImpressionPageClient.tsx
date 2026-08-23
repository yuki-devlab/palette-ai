"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import {
    ArrowLeftAlt as ArrowLeftAltW700,
    ArrowRightAlt as ArrowRightAltW700,
    Check as CheckW700,
} from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";

const impressions = [
    "愛情", "興奮", "生命力", "安心", "伝統",
    "温もり", "親しみ", "自由", "陽気", "活発",
    "幸福", "躍動感", "潤い", "安らぎ", "若々しい",
    "エコ", "成長", "平和", "信頼感", "知性",
    "冷静", "高級", "神秘", "優雅", "可愛い",
    "優しさ", "ロマンス", "祝福", "純粋", "清潔感",
    "穏やか", "実用的", "控えめ", "クール", "洗練",
];

export default function ImpressionClient() {
    const [selected, setSelected] = useState<string[]>([]);
    const router = useRouter();

    const handleToggle = (impression: string) => {
        setSelected((prev) =>
            prev.includes(impression) ? prev.filter((item) => item !== impression) : [...prev, impression]
        );
    };

    const handleNavigate = () => {
        if (selected.length === 0) return;

        const historyId = nanoid(15);

        sessionStorage.setItem("generated-colors", JSON.stringify({
            id: historyId,
            mode: "impression",
            params: selected,
        }));

        router.push(`/generate/result?id=${historyId}`);
    };

    return (
        <div className={cn(
            "flex flex-col gap-10 justify-center flex-1 mx-auto px-5 max-w-2xl",
            "md:gap-16 md:w-fit",
        )}>
            <div className="flex items-center justify-between">
                <Link
                    href="/"
                    className={cn(
                        "bg-slate-300 flex h-10 items-center justify-center rounded-full w-10 transition-colors",
                        "hover:bg-slate-400",
                    )}
                >
                    <ArrowLeftAltW700
                        size={24}
                        color="var(--color-white)"
                    />
                </Link>
                <p className="[text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                    {selected.length}件 選択済み
                </p>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-8 text-center">
                    <h2 className="font-bold text-2xl [text-box:trim-both_cap_alphabetic]">
                        与えたい印象から自動生成
                    </h2>
                    <div className="bg-white drop-shadow p-7 relative rounded-lg">
                        <p className="leading-relaxed [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                            ユーザーに与えたい印象を選択してください。
                            <br />
                            複数選択も可能です！
                        </p>
                        <div className="absolute bg-white -bottom-2.5 h-5 left-1/2 rotate-45 rounded-br -translate-x-1/2 w-5" />
                    </div>
                </div>
                <div className={cn(
                    "gap-7 grid grid-cols-3",
                    "md:grid-cols-5",
                )}>
                    {impressions.map((impression) => {
                        const isChecked = selected.includes(impression);

                        return (
                            <label
                                key={impression}
                                className="cursor-pointer flex gap-1.5 items-center"
                            >
                                <span className="flex items-center justify-center relative">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleToggle(impression)}
                                        className={cn(
                                            "appearance-none bg-white border border-sky-500 h-4 peer rounded w-4",
                                            "checked:bg-sky-500",
                                        )}
                                    />
                                    <CheckW700
                                        size={14}
                                        color="var(--color-white)"
                                        className={cn(
                                            "absolute hidden",
                                            "peer-checked:block",
                                        )}
                                    />
                                </span>
                                <span className="[text-box:trim-both_cap_alphabetic] text-sm">
                                    {impression}
                                </span>
                            </label>
                        );
                    })}
                </div>
                <button
                    type="button"
                    onClick={handleNavigate}
                    disabled={selected.length === 0}
                    className={cn(
                        "bg-sky-500 py-4.5 relative rounded-full transition-all",
                        "disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:bg-blue-500",
                    )}
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