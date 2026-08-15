"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { cn } from "@/lib/utils";
import PricingCard from "@/components/ui/modal/upgrade/_components/PricingCard";
import ToggleButton from "@/components/ui/modal/upgrade/_components/ToggleButton";

type UpgradeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    isPro: boolean;
};

export default function UpgradeModal({ isOpen, onClose, isPro }: UpgradeModalProps) {
    const [isYearly, setIsYearly] = useState(true);
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
                "bg-sky-100 flex flex-col gap-5 items-center origin-bottom p-5 rounded-4xl shadow-2xl transition-all w-full",
                "md:gap-6 md:p-6 md:w-md",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50",
            )}>
                <ToggleButton
                    isYearly={isYearly}
                    onChange={setIsYearly}
                />
                <PricingCard
                    isYearly={isYearly}
                    isPro={isPro}
                />
                <Link
                    href="/commercial-transactions"
                    className={cn(
                        "text-sm [text-box:trim-both_cap_alphabetic] text-slate-500 transition-colors",
                        "hover:text-slate-800",
                    )}
                >
                    特定商取引法に基づく表記
                </Link>
            </div>
        </div>,
        portal,
    );
}