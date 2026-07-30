"use client";

import { useState } from "react";
import { ArrowRightAlt } from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";
import { createCheckoutSession } from "@/actions/stripe";

type SubscribeButtonProps = {
    plan: "monthly" | "yearly";
};

export default function SubscribeButton({ plan }: SubscribeButtonProps) {
    const handleSubscribe = async () => {
        try {
            const res = await createCheckoutSession({ plan });

            if (res.url) {
                window.location.href = res.url;
            }
        } catch (error) {
            throw new Error("エラーが発生しました");
        }
    };

    return (
        <button
            type="button"
            className={cn(
                "w-full py-5 rounded-full bg-sky-500 flex items-center justify-center gap-6 relative",
                "hover:bg-blue-500",
            )}
            onClick={handleSubscribe}
        >
            <span className={cn(
                "font-bold text-sm [text-box:trim-both_cap_alphabetic] text-white",
            )}>
                Proプランをはじめる
            </span>
            <ArrowRightAlt
                size={16}
                color="var(--color-white)"
                className="absolute right-10"
            />
        </button>
    );
}