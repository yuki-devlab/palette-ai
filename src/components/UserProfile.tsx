"use client";

import { useState } from "react";
import Image from "next/image";
import type { Session } from "next-auth";
import { logout } from "@/actions/auth";

type UserProfileProps = {
    user: Session["user"];
    isFreePlan: boolean;
};

export default function UserProfile({ user, isFreePlan }: UserProfileProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-1 gap-2 items-center">
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="border border-slate-200 group p-0.5 rounded-full shrink-0 hover:border-slate-300"
                >
                    <Image
                        src={user.image || "/default-avatar.png"}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full group-hover:opacity-85"
                    />
                </button>
                {isOpen && (
                    <ul className="absolute bottom-full mb-5 left-0 bg-white w-35 rounded-2xl shadow-md">
                        <li>
                            <form action={logout}>
                                <button
                                    type="submit"
                                    className="text-sm text-slate-500 p-4"
                                >
                                    ログアウト
                                </button>
                            </form>
                        </li>
                    </ul>
                )}
            </div>
            <div className="flex flex-col gap-3 min-w-0">
                <p className="text-[10px] [text-box:trim-both_cap_alphabetic] text-slate-500">
                    {isFreePlan ? "無料プラン" : "Proプラン"}
                </p>
                <p className="-my-0.5 py-0.5 [text-box:trim-both_cap_alphabetic] text-xs truncate">
                    {user.name}
                </p>
            </div>
        </div>
    );
}