"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ToggleButtonProps = {
    isYearly: boolean;
    onChange: (isYearly: boolean) => void;
};

export default function ToggleButton({ isYearly, onChange }: ToggleButtonProps) {
    const monthlyRef = useRef<HTMLButtonElement>(null);
    const yearlyRef = useRef<HTMLButtonElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0,
    });

    useEffect(() => {
        const activeElement = isYearly
            ? yearlyRef.current
            : monthlyRef.current;
        
        if (activeElement) {
            setIndicatorStyle({
                left: activeElement.offsetLeft,
                width: activeElement.offsetWidth,
            });
        }
    }, [isYearly]);

    return (
        <div className="bg-slate-200 flex p-1 relative rounded-full">
            <div
                className="absolute bg-white h-10 rounded-full transition-all"
                style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                }}
            />
            <button
                type="button"
                onClick={() => onChange(false)}
                ref={monthlyRef}
                className={cn(
                    "font-semibold h-10 px-4 relative rounded-full [text-box:trim-both_cap_alphabetic] transition-colors",
                    !isYearly
                        ? "text-slate-800"
                        : "text-slate-500 hover:text-slate-600",
                )}
            >
                月ごと
            </button>
            <button
                type="button"
                onClick={() => onChange(true)}
                ref={yearlyRef}
                className="flex gap-2 group h-10 items-center px-4 relative rounded-full"
            >
                <span className={cn(
                    "font-semibold [text-box:trim-both_cap_alphabetic] transition-colors",
                    isYearly
                        ? "text-slate-800"
                        : "text-slate-500 group-hover:text-slate-600",
                )}>
                    年ごと
                </span>
                <span className="bg-sky-500 font-semibold p-2 rounded-full [text-box:trim-both_cap_alphabetic] text-white text-xs">
                    -20%
                </span>
            </button>
        </div>
    );
}