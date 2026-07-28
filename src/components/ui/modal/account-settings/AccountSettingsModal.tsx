import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Session } from "next-auth";
import { Close } from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";
import AccountSettings from "@/components/ui/modal/account-settings/_components/AccountSettings";
import AccountSummary from "@/components/ui/modal/account-settings/_components/AccountSummary";
import SubscriptionSettings from "@/components/ui/modal/account-settings/_components/SubscriptionSettings";

type AccountSettingsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    user: Session["user"];
    isPro: boolean;
};

export default function AccountSettingsModal({ isOpen, onClose, user, isPro }: AccountSettingsModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!mounted) {
        return null;
    }

    const portal = document.getElementById("portal");

    if (!portal) {
        return null;
    }
    
    return createPortal(
        <div className={cn(
            "fixed flex inset-0 items-center justify-center px-5",
            isOpen ? "pointer-events-auto" : "pointer-events-none",
            "md:p-0",
        )}>
            <div
                className={cn(
                    "backdrop-blur-md bg-slate-500/25 fixed inset-0",
                    isOpen ? "opacity-100" : "opacity-0",
                )}
                onClick={onClose}
            >
                <button
                    type="button"
                    className={cn(
                        "absolute bg-slate-400 flex h-9 items-center justify-center right-5 rounded-full top-5 w-9",
                        "hover:bg-slate-500",
                        "md:h-10 md:right-6 md:top-6 md:w-10",
                        "lg:h-8 lg:right-5 lg:top-5 lg:w-8",
                        "xl:h-10 xl:right-6 xl:top-6 xl:w-10",
                    )}
                    onClick={onClose}
                >
                    <Close
                        color="var(--color-white)"
                        className={cn(
                            "h-5 w-5",
                            "lg:h-4.5 lg:w-4.5",
                            "xl:h-5 xl:w-5",
                        )}
                    />
                </button>
            </div>
            <div className={cn(
                "bg-slate-100 flex flex-col gap-6 origin-bottom px-4 py-5 rounded-4xl shadow-2xl w-full z-10",
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50",
                "md:gap-7 md:px-5 md:py-7 md:w-md",
                "lg:px-4 lg:py-6 lg:w-sm",
                "xl:px-6 xl:py-8 xl:w-lg",
            )}>
                <AccountSummary
                    user={user}
                    isPro={isPro}
                />
                {isPro && <SubscriptionSettings />}
                <AccountSettings />
            </div>
        </div>,
        portal,
    );
}