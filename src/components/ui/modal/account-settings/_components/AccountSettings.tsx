"use client";

import { cn } from "@/lib/utils";
import { logout } from "@/actions/auth";
import { deleteAccount } from "@/actions/delete-account";

export default function AccountSettings() {
    const handleDelete = async () => {
        if (window.confirm("この操作は取り消すことができません。よろしいですか？")) {
            await deleteAccount();
        }
    };

    return (
        <div className={cn(
            "flex flex-col gap-3",
            "xl:gap-4",
        )}>
            <h2 className={cn(
                "font-bold [text-box:trim-both_cap_alphabetic] text-slate-500 text-xs",
                "md:text-sm",
                "lg:text-xs",
                "xl:text-sm",
            )}>
                アカウント
            </h2>
            <div className={cn(
                "bg-white rounded-[20px]",
                "md:rounded-3xl",
                "lg:rounded-[20px]",
                "xl:rounded-3xl",
            )}>
                <div className={cn(
                    "flex gap-3 items-center p-4",
                    "md:gap-4 md:p-5",
                    "lg:gap-2 lg:p-4",
                    "xl:gap-4 xl:p-5",
                )}>
                    <div className={cn(
                        "flex flex-1 flex-col gap-3.5",
                        "md:gap-4",
                        "lg:gap-3",
                        "xl:gap-4",
                    )}>
                        <h3 className={cn(
                            "font-bold text-[13px] [text-box:trim-both_cap_alphabetic]",
                            "md:text-sm",
                            "lg:text-xs",
                            "xl:text-base",
                        )}>
                            ログアウト
                        </h3>
                        <p className={cn(
                            "text-[10px] leading-relaxed [text-box:trim-both_cap_alphabetic] text-slate-500",
                            "md:text-[11px]",
                            "lg:text-[9px]",
                            "xl:text-xs",
                        )}>
                            このデバイスからログアウトします。
                        </p>
                    </div>
                    <form action={logout}>
                        <button
                            type="submit"
                            className={cn(
                                "bg-white border border-slate-300 h-8 px-3 rounded-full text-[11px]",
                                "hover:bg-slate-50",
                                "md:h-10 md:px-4 md:text-xs",
                                "lg:h-8 lg:px-3 lg:text-[10px]",
                                "xl:h-11 xl:px-5 xl:text-sm",
                            )}
                        >
                            ログアウト
                        </button>
                    </form>
                </div>
                <div className={cn(
                    "flex gap-3 items-center p-4",
                    "md:gap-4 md:p-5",
                    "lg:gap-2 lg:p-4",
                    "xl:gap-4 xl:p-5",
                )}>
                    <div className={cn(
                        "flex flex-1 flex-col gap-3.5",
                        "md:gap-4",
                        "lg:gap-3",
                        "xl:gap-4",
                    )}>
                        <h3 className={cn(
                            "font-bold text-[13px] [text-box:trim-both_cap_alphabetic]",
                            "md:text-sm",
                            "lg:text-xs",
                            "xl:text-base",
                        )}>
                            アカウントの削除
                        </h3>
                        <p className={cn(
                            "text-[10px] leading-relaxed [text-box:trim-both_cap_alphabetic] text-slate-500",
                            "md:text-[11px]",
                            "lg:text-[9px]",
                            "xl:text-xs",
                        )}>
                            このアカウントを削除します。一度削除したデータは元に戻せません。
                        </p>
                    </div>
                    <form action={handleDelete}>
                        <button
                            type="submit"
                            className={cn(
                                "bg-white border border-slate-300 h-8 px-3 rounded-full text-[11px]",
                                "hover:bg-slate-50",
                                "md:h-10 md:px-4 md:text-xs",
                                "lg:h-8 lg:px-3 lg:text-[10px]",
                                "xl:h-11 xl:px-5 xl:text-sm",
                            )}
                        >
                            アカウントを削除
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}