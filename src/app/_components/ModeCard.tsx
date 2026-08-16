"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";

type ModeCardProps = {
    isSelected: boolean,
    modeInfo: {
        id: string;
        title: string;
        description: string;
    },
};

export default function ModeCard({ isSelected, modeInfo }: ModeCardProps) {
    const router = useRouter();

    const handleNavigate = (e: React.MouseEvent) => {
        e.preventDefault();

        const historyId = nanoid(15);

        sessionStorage.setItem("generated-colors", JSON.stringify({
            id: historyId,
            mode: "auto",
        }));

        router.push(`/generate/result?id=${historyId}`);
    };

    return (
        <Link
            href={`/generate/${modeInfo.id}`}
            className={cn(
                "flex flex-col w-full bg-white p-2 rounded-4xl shadow transition-all",
                "hover:shadow-lg hover:-translate-y-1",
                "lg:flex-row lg:gap-3 lg:items-center lg:pr-3 lg:rounded-md",
                "xl:gap-4 xl:w-102",
            )}
            onClick={modeInfo.id === "auto" ? handleNavigate : undefined}
        >
            <div className={cn(
                "bg-sky-100 flex h-55 items-center justify-center rounded-t-3xl w-full",
                "lg:h-25 lg:rounded lg:shrink-0 lg:w-25",
            )}>
                {/* ロゴ */}
            </div>
            <div className={cn(
                "flex flex-col gap-5.5 pb-3 pt-6 px-3 w-full",
                "lg:p-0 lg:gap-4",
            )}>
                <h2 className={cn(
                    "font-semibold [text-box:trim-both_cap_alphabetic] text-center text-lg",
                    "lg:text-left lg:text-base",
                )}>
                    {modeInfo.title}
                </h2>
                <p className={cn(
                    "[text-box:trim-both_cap_alphabetic] text-slate-500 text-[15px] leading-relaxed whitespace-pre-line",
                    "lg:text-[13px] lg:line-clamp-2 lg:overflow-clip lg:[overflow-clip-margin:2px]",
                )}>
                    {modeInfo.description}
                </p>
            </div>
        </Link>
    );
}