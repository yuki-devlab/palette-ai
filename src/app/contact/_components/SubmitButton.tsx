"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={cn(
                "bg-sky-500 flex gap-2 h-15 items-center justify-center rounded-full transition-colors",
                "enabled:hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
            )}
        >
            {pending && (
                <div className="animate-spin border-3 border-t-white border-white/25 h-5 rounded-full w-5" />
            )}
            <span className="font-bold [text-box:trim-both_cap_alphabetic] text-white">
                {pending ? "送信中" : "送信する"}
            </span>
        </button>
    );
}