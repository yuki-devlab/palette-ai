"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import LoginModal from "@/components/ui/modal/LoginModal";

export default function SidebarLoginButton() {
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
                    "bg-sky-500 font-bold py-5 rounded-full [text-box:trim-both_cap_alphabetic] text-white text-xs",
                    "hover:bg-blue-500",
                    "xl:py-6 xl:text-sm",
                )}
                onClick={openModal}
            >
                ログイン
            </button>
            <LoginModal
                isOpen={isOpen}
                onClose={closeModal}
            />
        </>
    );
}