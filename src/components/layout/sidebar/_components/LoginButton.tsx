"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import LoginModal from "@/components/ui/modal/login/LoginModal";

export default function LoginButton() {
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
                    "bg-sky-500 font-semibold py-6 rounded-full [text-box:trim-both_cap_alphabetic] text-white transition-colors",
                    "hover:bg-blue-500",
                )}
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