"use client";

import { useState } from "react";
import { KeyboardArrowDown } from "@material-symbols-svg/react";
import { cn } from "@/lib/utils";

export type FaqItemProps = {
    question: string;
    answer: React.ReactNode;
};

export default function FaqItem({ question, answer }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={cn(
            "bg-white border-b border-slate-100",
            "first:rounded-t-3xl last:border-b-0 last:rounded-b-3xl",
            "xl:w-2xl",
        )}>
            <button
                type="button"
                onClick={toggleOpen}
                className="flex gap-4 items-center p-4 w-full"
            >
                <span className="flex-1 font-bold leading-relaxed [text-box:trim-both_cap_alphabetic] text-left">
                    {question}
                </span>
                <KeyboardArrowDown
                    size={28}
                    color="var(--color-slate-400)"
                    className={cn(
                        "transition-transform",
                        isOpen && "-rotate-180",
                    )}
                />
            </button>
            <div className={cn(
                "grid transition-all",
                isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
            )}>
                <div className="overflow-hidden">
                    <div className="leading-relaxed pb-5 px-4 [text-box:trim-both_text] text-slate-500">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
}