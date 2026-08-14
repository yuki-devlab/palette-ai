"use client";

import { useState } from "react";
import Image from "next/image";
import type { Session } from "next-auth";
import AccountSettingsModal from "@/components/ui/modal/account-settings/AccountSettingsModal";

type AccountSettingsButtonProps = {
    user: Session["user"];
    isPro: boolean;
};

export default function AccountSettingsButton({ user, isPro }: AccountSettingsButtonProps) {
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
                className="border border-slate-300 p-0.5 rounded-full"
            >
                <Image
                    src={user.image || "/default-avatar.png"}
                    width={34}
                    height={34}
                    alt="アカウント設定"
                    className="rounded-full"
                />
            </button>
            <AccountSettingsModal
                isOpen={isOpen}
                onClose={closeModal}
                user={user}
                isPro={isPro}
            />
        </>
    );
}