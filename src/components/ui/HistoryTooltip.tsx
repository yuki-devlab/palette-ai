"use client";

import { useEffect, useRef, useState } from "react";
import { HelpFill } from "@material-symbols-svg/react";
import { cn } from "@/lib/utils";

export default function HistoryTooltip() {
    const [isOpen, setIsOpen] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const toggleTooltip = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: PointerEvent) => {
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={tooltipRef}
            className="group relative"
        >
            <HelpFill
                className={cn(
                    "h-3.5 text-slate-400 w-3.5",
                    "hover:text-slate-500",
                    "xl:h-4 xl:w-4"
                )}
                onClick={toggleTooltip}
            />
            <div className={cn(
                "absolute bg-slate-800 font-bold hidden left-1/2 px-2 py-3 rounded-xs text-[8px] [text-box:trim-both_cap_alphabetic] text-white top-[calc(100%+16px)] -translate-x-1/2 w-30",
                "before:absolute before:border-b-8 before:border-b-slate-800 before:border-x-8 before:border-x-transparent before:bottom-full before:content-[''] before:left-1/2 before:-translate-x-1/2",
                "group-hover:block", isOpen && "block",
                "xl:p-3 xl:text-[10px] xl:leading-relaxed xl:w-35",
            )}>
                ログインすると生成履歴を保存できます
            </div>
        </div>
    );
}