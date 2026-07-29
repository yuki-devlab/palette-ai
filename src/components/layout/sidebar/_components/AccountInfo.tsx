"use client";

import { useState } from "react";
import Image from "next/image";
import type { Session } from "next-auth";
import { cn } from "@/lib/utils";
import AccountSettingsModal from "@/components/ui/modal/account-settings/AccountSettingsModal";

type AccountInfoProps = {
    user: Session["user"];
    isPro: boolean;
};

export default function AccountInfo({ user, isPro }: AccountInfoProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className={cn(
                "flex flex-1 gap-1.5 items-center",
                "xl:gap-2",
            )}>
                <button
                    type="button"
                    className={cn(
                        "border border-slate-300 group p-0.5 rounded-full shrink-0",
                        "hover:border-slate-400",
                    )}
                    onClick={openModal}
                >
                    <Image
                        src={user.image || "/default-avatar.png"}
                        width={40}
                        height={40}
                        alt=""
                        className={cn(
                            "h-8 rounded-full w-8",
                            "group-hover:opacity-75",
                            "xl:h-10 xl:w-10",
                        )}
                    />
                </button>
                <div className="flex flex-1 flex-col gap-2.5 min-w-0">
                    <span className={cn(
                        "text-[8px] [text-box:trim-both_cap_alphabetic] text-slate-500",
                        "xl:text-[10px]",
                    )}>
                        {isPro ? "Proプラン" : "無料プラン"}
                    </span>
                    <span className={cn(
                        "overflow-x-clip text-[10px] [text-box:trim-both_cap_alphabetic] text-ellipsis whitespace-nowrap",
                        "xl:text-xs",
                    )}>
                        {user.name}
                    </span>
                </div>
            </div>
            <AccountSettingsModal
                isOpen={isOpen}
                onClose={closeModal}
                user={user}
                isPro={isPro}
            />
        </>
    );
}