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
        )}>
            <h2 className="font-semibold [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                アカウント
            </h2>
            <div className="flex flex-col rounded-3xl bg-white">
                <div className="flex w-full items-center gap-5 p-5">
                    <div className="flex flex-col gap-4 flex-1 min-w-0">
                        <h2 className="font-semibold [text-box:trim-both_cap_alphabetic]">
                            ログアウト
                        </h2>
                        <p className="line-clamp-2 [text-box:trim-both_cap_alphabetic] overflow-clip [overflow-clip-margin:2px] text-[13px] leading-normal text-slate-500">
                            このデバイスからログアウトします。
                        </p>
                    </div>
                    <form action={logout}>
                        <button
                            type="submit"
                            className={cn(
                                "text-sm [text-box:trim-both_cap_alphabetic] px-5 py-4 rounded-full bg-white border border-slate-300 transition-colors",
                                "hover:bg-slate-50",
                            )}
                        >
                            ログアウト
                        </button>
                    </form>
                </div>
                <hr className="border-slate-200 mx-5" />
                <div className="flex w-full items-center gap-5 p-5 border-b border-slate-200 last:border-b-0">
                    <div className="flex flex-col gap-4 flex-1 min-w-0">
                        <h2 className="font-semibold [text-box:trim-both_cap_alphabetic]">
                            アカウントの削除
                        </h2>
                        <p className="line-clamp-2 [text-box:trim-both_cap_alphabetic] overflow-clip [overflow-clip-margin:2px] text-[13px] leading-normal text-slate-500">
                            このアカウントを削除します。一度削除したデータは元に戻せません。
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className={cn(
                            "text-sm [text-box:trim-both_cap_alphabetic] px-5 py-4 rounded-full bg-white border border-slate-300 transition-colors",
                            "hover:bg-slate-50",
                        )}
                    >
                        アカウントを削除
                    </button>
                </div>
            </div>
        </div>
    );
}