"use client";

import { useState } from "react";
import { BoltFill } from "@material-symbols-svg/react";
import { cn } from "@/lib/utils";
import UpgradeModal from "@/components/ui/modal/upgrade/UpgradeModal";

type UpgradeButtonProps = {
    isPro: boolean;
};

export default function UpgradeButton({ isPro }: UpgradeButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className={cn(
                    "bg-sky-500 flex gap-1 items-center px-4 py-3.5 rounded-full transition-colors",
                    "hover:bg-blue-500",
                )}
            >
                <BoltFill
                    size={16}
                    color="var(--color-white)"
                />
                <span className="font-semibold [text-box:trim-both_cap_alphabetic] text-white text-xs">
                    アップグレード
                </span>
            </button>
            <UpgradeModal
                isOpen={isOpen}
                onClose={closeModal}
                isPro={isPro}
            />
        </>
    );
}