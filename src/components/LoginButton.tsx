"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import LoginModal from "@/components/LoginModal";

export default function LoginButton() {
    const t = useTranslations("sidebar");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="bg-sky-500 font-bold py-6 rounded-full [text-box:trim-both_cap_alphabetic] text-sm text-white hover:bg-blue-500"
            >
                {t("login")}
            </button>
            <LoginModal
                isOpen={modalIsOpen}
                onClose={closeModal}
            />
        </>
    );
}