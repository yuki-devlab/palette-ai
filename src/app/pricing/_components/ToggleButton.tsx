import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ToggleButtonProps = {
    value: "monthly" | "yearly";
    onChange: (value: "monthly" | "yearly") => void;
};

export default function ToggleButton({ value, onChange }: ToggleButtonProps) {
    const monthlyRef = useRef<HTMLButtonElement>(null);
    const yearlyRef = useRef<HTMLButtonElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0,
    });

    useEffect(() => {
        const activeElement = value === "monthly"
            ? monthlyRef.current
            : yearlyRef.current;
        
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
                onClick={() => onChange("monthly")}
                ref={monthlyRef}
                className={cn(
                    "font-bold h-10 px-4 relative rounded-full [text-box:trim-both_cap_alphabetic]",
                    value === "monthly" ? "text-slate-800" : "text-slate-500",
                )}
            >
                月ごと
            </button>
            <button
                type="button"
                onClick={() => onChange("yearly")}
                ref={yearlyRef}
                className="flex gap-2 h-10 items-center px-4 relative rounded-full"
            >
                <span className={cn(
                    "font-bold [text-box:trim-both_cap_alphabetic]",
                    value === "yearly" ? "text-slate-800" : "text-slate-500",
                )}>
                    年ごと
                </span>
                <span className="bg-sky-500 font-bold p-2 rounded-full [text-box:trim-both_cap_alphabetic] text-white text-xs">
                    -20%
                </span>
            </button>
        </div>
    );
}