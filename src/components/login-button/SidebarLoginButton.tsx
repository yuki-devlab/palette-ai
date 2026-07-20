"use client";

import { useState } from "react";
import LoginModal from "@/components/LoginModal";

export default function SidebarLoginButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="bg-sky-500 font-bold py-6 rounded-full [text-box:trim-both_cap_alphabetic] text-sm text-white w-full hover:bg-blue-500"
            >
                ログイン
            </button>
            <LoginModal
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
}