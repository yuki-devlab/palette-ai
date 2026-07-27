"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import GoogleIcon from "@/components/icons/GoogleIcon";

export default function ModalLoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={cn(
                "bg-google-login flex gap-2 items-center justify-center py-4 rounded-full w-full",
                "enabled:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50",
                "md:gap-2.5 md:py-4.5",
                "lg:gap-2 lg:py-3.5",
                "xl:gap-2.5 xl:py-5",
            )}
        >
            {pending ? (
                <div className={cn(
                    "animate-spin border-[2.5px] border-white/25 border-t-white h-4 rounded-full w-4",
                    "md:border-[3px] md:h-5 md:w-5",
                    "lg:border-[2.5px] lg:h-4 lg:w-4",
                    "xl:border-[3px] xl:h-5 xl:w-5",
                )} />
            ) : (
                <GoogleIcon className={cn(
                    "h-4",
                    "md:h-5",
                    "lg:h-4",
                    "xl:h-5",
                )} />
            )}
            <span className={cn(
                "font-bold [text-box:trim-both_cap_alphabetic] text-sm text-white",
                "md:text-base",
                "lg:text-xs",
                "xl:text-base",
            )}>
                Googleでログイン
            </span>
        </button>
    );
}