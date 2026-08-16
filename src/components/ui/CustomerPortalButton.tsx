"use client";

import { ArrowOutward } from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";
import { createCustomerPortalSession } from "@/actions/customer-portal";

export default function CustomerPortalButton() {
    const handleNavigate = async () => {
        const res = await createCustomerPortalSession();

        if (res.url) {
            window.open(res.url, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <button
            type="button"
            onClick={handleNavigate}
            className={cn(
                "bg-slate-800 flex gap-1 items-center px-4 py-3.5 rounded-full transition-colors",
                "hover:bg-slate-700",
            )}
        >
            <span className="font-semibold [text-box:trim-both_cap_alphabetic] text-white text-xs">
                お支払いを管理
            </span>
            <ArrowOutward
                size={16}
                color="var(--color-white)"
            />
        </button>
    );
}