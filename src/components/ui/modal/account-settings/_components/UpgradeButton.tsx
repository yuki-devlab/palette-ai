"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import UpgradeModal from "@/components/ui/modal/upgrade/UpgradeModal";

export default function UpgradeButton() {
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
                className={cn(
                    "bg-sky-500 font-bold p-3 rounded-full text-[10px] [text-box:trim-both_cap_alphabetic] text-white",
                    "hover:bg-blue-500",
                    "md:p-3.5 md:text-xs",
                    "lg:p-3 lg:text-[10px]",
                    "xl:px-3.5 xl:py-3.75 xl:text-xs",
                )}
                onClick={openModal}
            >
                アップグレード
            </button>
            <UpgradeModal
                isOpen={isOpen}
                onClose={closeModal}
            />
        </>
    );
}