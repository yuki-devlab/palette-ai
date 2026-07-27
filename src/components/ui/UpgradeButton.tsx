import { cn } from "@/lib/utils";

export default function UpgradeButton() {
    return (
        <button
            type="button"
            className={cn(
                "bg-sky-500 font-bold p-2.5 rounded-full text-[10px] [text-box:trim-both_cap_alphabetic] text-white",
                "hover:bg-blue-500",
                "xl:p-3 xl:text-xs",
            )}
        >
            アップグレード
        </button>
    );
}