"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ToggleButtonProps = {
    value: "terms" | "privacy" | "commercial-transactions";
    onChange: (value: "terms" | "privacy" | "commercial-transactions") => void;
};

export default function ToggleButton({ value, onChange }: ToggleButtonProps) {
    const termsRef = useRef<HTMLButtonElement>(null);
    const privacyRef = useRef<HTMLButtonElement>(null);
    const commercialTransactionsRef = useRef<HTMLButtonElement>(null);

    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0,
    });

    useEffect(() => {
        let activeElement: HTMLButtonElement | null = null;

        if (value === "terms") activeElement = termsRef.current;
        if (value === "privacy") activeElement = privacyRef.current;
        if (value === "commercial-transactions") activeElement = commercialTransactionsRef.current;
        
        if (activeElement) {
            setIndicatorStyle({
                left: activeElement.offsetLeft,
                width: activeElement.offsetWidth,
            });
        }
    }, [value]);

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
                onClick={() => onChange("terms")}
                ref={termsRef}
                className={cn(
                    "font-semibold h-10 px-4 relative rounded-full [text-box:trim-both_cap_alphabetic] transition-colors text-[15px] whitespace-nowrap",
                    "sm:text-base",
                    value === "terms"
                        ? "text-slate-800"
                        : "text-slate-500 hover:text-slate-600",
                )}
            >
                利用規約
            </button>
            <button
                type="button"
                onClick={() => onChange("privacy")}
                ref={privacyRef}
                className={cn(
                    "font-semibold h-10 px-4 relative rounded-full [text-box:trim-both_cap_alphabetic] transition-colors text-[15px] whitespace-nowrap",
                    "sm:text-base",
                    value === "privacy"
                        ? "text-slate-800"
                        : "text-slate-500 hover:text-slate-600",
                )}
            >
                プライバシーポリシー
            </button>
            <button
                type="button"
                onClick={() => onChange("commercial-transactions")}
                ref={commercialTransactionsRef}
                className={cn(
                    "font-semibold h-10 px-4 relative rounded-full [text-box:trim-both_cap_alphabetic] transition-colors text-[15px] whitespace-nowrap",
                    "sm:text-base",
                    value === "commercial-transactions"
                        ? "text-slate-800"
                        : "text-slate-500 hover:text-slate-600",
                )}
            >
                特商法表記
            </button>
        </div>
    );
}