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
                    "bg-slate-100 font-semibold h-10 px-4 rounded-xl text-sm transition-colors",
                    "hover:bg-slate-200",
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