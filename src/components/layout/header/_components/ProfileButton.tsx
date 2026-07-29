"use client";

import { useState } from "react";
import Image from "next/image";
import type { Session } from "next-auth";
import AccountSettingsModal from "@/components/ui/modal/account-settings/AccountSettingsModal";

type ProfileButtonProps = {
    user: Session["user"];
    isPro: boolean;
};

export default function ProfileButton({ user, isPro }: ProfileButtonProps) {
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
                className="border border-slate-300 p-0.5 rounded-full"
                onClick={openModal}
            >
                <Image
                    src={user.image || "/default-avatar.png"}
                    width={32}
                    height={32}
                    alt="プロフィール画像"
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