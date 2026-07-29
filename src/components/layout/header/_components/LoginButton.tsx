"use client";

import { useState } from "react";
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
                className="bg-slate-200 font-bold p-3 rounded-lg [text-box:trim-both_cap_alphabetic] text-xs"
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