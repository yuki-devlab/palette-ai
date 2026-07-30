import { cn } from "@/lib/utils";

type ToggleButtonProps = {
    isYearly: boolean;
    onChange: (isYearly: boolean) => void;
};

export default function ToggleButton({ isYearly, onChange }: ToggleButtonProps) {
    return (
        <div className={cn(
            "flex p-1 rounded-full bg-slate-200",
        )}>
            <button
                type="button"
                className={cn(
                    "font-bold text-sm [text-box:trim-both_cap_alphabetic] px-4 h-[stretch] rounded-full",
                    isYearly ? "bg-slate-200 text-slate-500" : "bg-white text-slate-800",
                )}
                onClick={() => onChange(false)}
            >
                月ごと
            </button>
            <button
                type="button"
                className={cn(
                    "flex gap-1 py-2 pr-2 pl-3 rounded-full items-center",
                    isYearly ? "bg-white" : "bg-slate-200",
                )}
                onClick={() => onChange(true)}
            >
                <span className={cn(
                    "font-bold text-sm [text-box:trim-both_cap_alphabetic]",
                    isYearly ? "text-slate-800" : "text-slate-500",
                )}>
                    年ごと
                </span>
                <span className="font-bold text-[10px] [text-box:trim-both_cap_alphabetic] text-white p-1.75 rounded-full bg-sky-500">
                    -25%
                </span>
            </button>
        </div>
    );
}