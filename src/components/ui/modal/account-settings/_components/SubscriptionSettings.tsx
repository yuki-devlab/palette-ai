"use client";

import { ArrowOutward } from "@material-symbols-svg/react";
import { cn } from "@/lib/utils";
import { createCustomerPortalSession } from "@/actions/customer-portal";

export default function SubscriptionSettings() {
    const handleNavigate = async () => {
        const res = await createCustomerPortalSession();

        if (res.url) {
            window.open(res.url, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className={cn(
            "flex flex-col gap-3",
            "xl:gap-4",
        )}>
            <h2 className={cn(
                "font-bold [text-box:trim-both_cap_alphabetic] text-slate-500 text-xs",
                "md:text-sm",
                "lg:text-xs",
                "xl:text-sm",
            )}>
                サブスクリプション
            </h2>
            <div className={cn(
                "bg-white flex gap-3 items-center p-4 rounded-[20px]",
                "md:gap-4 md:p-5 md:rounded-3xl",
                "lg:gap-2 lg:p-4 lg:rounded-[20px]",
                "xl:gap-4 xl:p-5 xl:rounded-3xl",
            )}>
                <div className={cn(
                    "flex flex-1 flex-col gap-3.5",
                    "md:gap-4",
                    "lg:gap-3",
                    "xl:gap-4",
                )}>
                    <h3 className={cn(
                        "font-bold text-[13px] [text-box:trim-both_cap_alphabetic]",
                        "md:text-sm",
                        "lg:text-xs",
                        "xl:text-base",
                    )}>
                        プランを管理
                    </h3>
                    <p className={cn(
                        "text-[10px] leading-relaxed [text-box:trim-both_cap_alphabetic] text-slate-500",
                        "md:text-[11px]",
                        "lg:text-[9px]",
                        "xl:text-xs",
                    )}>
                        お支払い方法の変更や解約などについては、こちらからお手続きください。
                    </p>
                </div>
                <button
                    type="button"
                    className={cn(
                        "bg-white border border-slate-300 flex gap-1 h-8 items-center px-3 rounded-full",
                        "hover:bg-slate-50",
                        "md:h-10 md:px-4",
                        "lg:h-8 lg:px-3",
                        "xl:gap-1.5 xl:h-11 xl:px-5",
                    )}
                    onClick={handleNavigate}
                >
                    <span className={cn(
                        "text-[11px] [text-box:trim-both_cap_alphabetic]",
                        "md:text-xs",
                        "lg:text-[10px]",
                        "xl:text-sm",
                    )}>
                        管理
                    </span>
                    <ArrowOutward
                        color="var(--color-slate-400)"
                        className={cn(
                            "h-3 w-3",
                            "md:h-3.5 md:w-3.5",
                            "lg:h-3 lg:w-3",
                            "xl:h-4 xl:w-4",
                        )}
                    />
                </button>
            </div>
        </div>
    );
}