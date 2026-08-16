"use client";

import { useState } from "react";
import Image from "next/image";
import type { Session } from "next-auth";
import { cn } from "@/lib/utils";
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
        setIsOpen(false)
    };;

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className={cn(
                    "border border-slate-300 group p-0.5 rounded-full transition-colors",
                    "hover:border-slate-400",
                )}
            >
                <Image
                    src={user.image || "/default-avatar.png"}
                    width={40}
                    height={40}
                    alt="アカウント設定"
                    className={cn(
                        "rounded-full transition-colors",
                        "group-hover:opacity-75",
                    )}
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