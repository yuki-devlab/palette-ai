"use client";

import Link from "next/link";
import Image from "next/image";
import { LightMode, KeyboardArrowDown, HelpFill, Search } from "@material-symbols-svg/react";
import { Logo } from "@/components/Logo";
import { LoginButton, LogOutButton } from "@/components/LoginButton";
import GenHistory from "@/components/GenHistory";
import { useState } from "react";
import { useEffect } from "react";

type History = {
    id: string;
    base: string;
    main: string;
    accent: string;
}

export default function Sidebar() {
    const [histories, setHistories] = useState<History[]>([]);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const [historyRes, sessionRes] = await Promise.all([
                fetch("/api/history"),
                fetch("/api/session"),
            ]);

            const historiesData = await historyRes.json();
            const sessionData = await sessionRes.json();

            setHistories(historiesData);
            setSession(sessionData);
        };

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/history/${id}`, {
                method: "DELETE",
            });

            // まずテキストで受け取る（安全）
            const text = await res.text();

            let data;
            try {
                data = text ? JSON.parse(text) : null;
            } catch {
                data = null;
            }

            if (!res.ok) {
                console.error("削除失敗:", data || text);
                return;
            }

            setHistories((prev) => prev.filter((h) => h.id !== id));
        } catch (e) {
            console.error("通信エラー:", e);
        }
    }

    return (
        <div className="w-xs bg-white h-screen fixed p-6 flex flex-col">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Logo size={36} />
                    </Link>
                    <div className="flex items-center gap-4">
                        <LightMode size={20} className="text-gray-500" />
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <span className="[text-box:trim-both_cap_alphabetic]">JA</span>
                            <KeyboardArrowDown size={20} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <span className="[text-box:trim-both_cap_alphabetic]">ベース・メイン・アクセント</span>
                    <KeyboardArrowDown size={16} />
                </div>
                <hr className="text-gray-200" />
            </div>
            <div className="flex flex-col gap-4 flex-1 min-h-0 mt-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <span className="text-sm">生成履歴</span>
                        <HelpFill size={16} className="text-gray-400" />
                    </div>
                    <Search size={20} className="text-gray-500" />
                </div>
                <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                    {histories.length === 0 ? (
                        <span className="text-gray-500 text-xs [text-box:trim-both_cap_alphabetic]">
                            なし
                        </span>
                    ) : (
                        histories.map((history) => (
                            <GenHistory
                                key={history.id}
                                id={history.id}
                                base={history.base}
                                main={history.main}
                                accent={history.accent}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
                {
                    session?.user ? (
                        <>
                            <button>
                                <Image
                                    src={session.user.image || "/default-avatar.png"}
                                    alt="Profile Image"
                                    width={44}
                                    height={44}
                                    className="rounded-full border-2 border-gray-200"
                                />
                            </button>
                            <LogOutButton />
                        </>
                    ) : (
                        <LoginButton />
                    )
                }
            </div>
        </div >
    )
}