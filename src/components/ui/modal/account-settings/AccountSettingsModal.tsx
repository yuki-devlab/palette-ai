import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
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
    const [isRendered, setIsRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
            document.body.style.overflow = "hidden";

            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 10);

            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
            document.body.style.overflow = "";

            const timer = setTimeout(() => {
                setIsRendered(false);
            }, 150);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted || !isRendered) {
        return null;
    }

    const portal = document.getElementById("portal");

    if (!portal) {
        return null;
    }
    
    return createPortal(
        <div className={cn(
            "fixed flex inset-0 items-center justify-center px-5",
            isVisible ? "pointer-events-auto" : "pointer-events-none",
            "md:p-0",
        )}>
            <div
                onClick={onClose}
                className={cn(
                    "backdrop-blur-md bg-slate-500/25 fixed inset-0 transition-opacity",
                    isVisible ? "opacity-100" : "opacity-0",
                )}
            />
            <div className={cn(
                "flex flex-col w-full items-center gap-5 p-5 rounded-4xl bg-slate-100 shadow-2xl transition-all max-w-lg origin-bottom",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50",
                "md:w-lg md:gap-6 md:p-6"
            )}>
                <div className="flex flex-col gap-8 w-full">
                    <AccountSummary
                        user={user}
                        isPro={isPro}
                    />
                    <AccountSettings />
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <Link
                        href="/faq"
                        onNavigate={onClose}
                        className={cn(
                            "[text-box:trim-both_cap_alphabetic] transition-colors",
                            "hover:text-slate-800"
                        )}
                    >
                        よくある質問
                    </Link>
                    <span className="[text-box:trim-both_cap_alphabetic]">
                        ・
                    </span>
                    <Link
                        href="/contact"
                        onNavigate={onClose}
                        className={cn(
                            "[text-box:trim-both_cap_alphabetic] transition-colors",
                            "hover:text-slate-800"
                        )}
                    >
                        お問い合わせ
                    </Link>
                </div>
            </div>
        </div>,
        portal,
    );
}