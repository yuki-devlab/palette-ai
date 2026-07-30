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
                "bg-white p-2 rounded-2xl shadow",
                "hover:shadow-lg hover:-translate-y-1",
                "lg:flex lg:gap-3 lg:items-center lg:pl-1.5 lg:pr-3 lg:py-1.5 lg:rounded-md",
                "xl:gap-4 xl:pl-2 xl:pr-4 xl:py-2 xl:w-102",
            )}
            onClick={modeInfo.id === "auto" ? handleNavigate : undefined}
        >
            <div className={cn(
                "bg-sky-100 flex h-50 items-center justify-center rounded-t-lg w-75",
                "lg:h-20 lg:rounded lg:shrink-0 lg:w-20",
                "xl:h-25 xl:w-25",
            )}>
                {/* ロゴ */}
            </div>
            <div className={cn(
                "flex flex-col gap-5 pb-4 pt-6 px-4 w-full",
                "lg:gap-4 lg:p-0",
                "xl:gap-4.5",
            )}>
                <h2 className={cn(
                    "font-bold [text-box:trim-both_cap_alphabetic] text-center",
                    "lg:text-left lg:text-xs",
                    "xl:text-base",
                )}>
                    {modeInfo.title}
                </h2>
                <p className={cn(
                    "[text-box:trim-both_cap_alphabetic] text-slate-500 text-xs leading-relaxed whitespace-pre-line",
                    "lg:text-[9px]",
                    "xl:text-xs",
                )}>
                    {modeInfo.description}
                </p>
            </div>
        </Link>
    );
}