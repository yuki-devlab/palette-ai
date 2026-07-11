"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ModeSelectCardProps = {
    modeInfo: {
        title: string;
        description: string;
        url: string;
        isRecommended?: boolean;
    },
};

export default function ModeSelectCard({ modeInfo }: ModeSelectCardProps) {
    const t = useTranslations("home");
    
    return (
        <Link
            href={modeInfo.url}
            className="bg-white flex gap-5 items-center pl-2 pr-5 py-2 rounded shadow-md transition-all w-md hover:shadow-lg hover:-translate-y-1"
        >
            <div className="bg-sky-100 flex h-28 items-center justify-center relative rounded-sm shrink-0 w-28">
                {modeInfo.isRecommended && (
                    <span className="absolute bg-sky-500 font-bold left-0 px-2 py-2.5 rounded-br-sm rounded-tl-sm text-[10px] [text-box:trim-both_cap_alphabetic] text-white top-0">
                        {t("recommended")}
                    </span>
                )}
                {/* <Image /> */}
            </div>
            <div className="flex flex-col gap-5">
                <h2 className="font-bold [text-box:trim-both_cap_alphabetic]">
                    {modeInfo.title}
                </h2>
                <p className="leading-relaxed line-clamp-3 -my-0.5 py-0.5 [text-box:trim-both_cap_alphabetic] text-slate-500 text-xs whitespace-pre-line">
                    {modeInfo.description}
                </p>
            </div>
        </Link>
    );
}