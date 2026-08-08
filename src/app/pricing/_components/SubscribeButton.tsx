"use client";

import { useState } from "react";
import { ArrowRightAlt } from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";
import { createCheckoutSession } from "@/actions/stripe-checkout";

type SubscribeButtonProps = {
    planType: "monthly" | "yearly";
    isPro: boolean;
};

export default function SubscribeButton({ planType, isPro }: SubscribeButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async () => {
        setIsLoading(true);

        try {
            const res = await createCheckoutSession({ planType });

            if (res?.url) {
                window.location.href = res.url;
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            throw new Error("エラーが発生しました");
        }
    };

    return (
        <button
            type="button"
            onClick={handleSubscribe}
            disabled={isLoading || isPro}
            className={cn(
                "bg-sky-500 h-13 items-center rounded-full transition-colors",
                "enabled:hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
                isLoading
                    ? "flex gap-2 justify-center"
                    : "grid grid-cols-[1fr_auto_1fr]",
            )}
        >
            {isLoading ? (
                <>
                    <div className="animate-spin border-3 border-t-white border-white/25 h-5 rounded-full w-5" />
                    <span className="font-bold [text-box:trim-both_cap_alphabetic] text-white">
                        Proプランをはじめる
                    </span>
                </>
            ) : (
                <>
                    <div />
                    <span className="font-bold [text-box:trim-both_cap_alphabetic] text-white">
                        {isPro ? "登録中" : "Proプランをはじめる"}
                    </span>
                    <div className="flex justify-center">
                        {!isPro && (
                            <ArrowRightAlt
                                size={20}
                                color="var(--color-white)"
                                className="-translate-x-0.5"
                            />
                        )}
                    </div>
                </>
            )}
        </button>
    );
}