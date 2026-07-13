"use client";

import { ArrowLeftAlt as ArrowLeftAltW700 } from "@material-symbols-svg/react/w700";
import { Check as CheckW700 } from "@material-symbols-svg/react/w700";
import { ErrorFill } from "@material-symbols-svg/react";
import { useRouter } from "@/i18n/navigation";

type ResultHeaderProps = {
    mode: string | null;
    status: "generating" | "regenerating" | "success" | "generate-error" | "fetch-error";
    isLogin: boolean;
};

export default function ResultHeader({ mode, status, isLogin }: ResultHeaderProps) {
    const router = useRouter();

    const handleNavigate = () => {
        if (mode === "random") {
            router.push("/");
        } else {
            router.push(`/generate/${mode}`);
        }
    };

    const statusMessages = () => {
        switch (status) {
            case "generating":
            case "regenerating": {
                return (
                    <div className="flex gap-1.5 items-center">
                        <div className="animate-spin border-2 border-sky-500/25 border-t-sky-500 h-4 rounded-full w-4" />
                        <p className="[text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                            生成中…
                        </p>
                    </div>
                );
            };
            case "success": {
                return isLogin ? (
                    <div className="flex gap-1 items-center">
                        <CheckW700
                            size={20}
                            color="var(--color-sky-500)"
                        />
                        <p className="[text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                            保存済み
                        </p>
                    </div>
                ): (
                    <p className="decoration-[20%] decoration-dotted decoration-slate-300 text-slate-500 text-sm underline underline-offset-[50%]">
                        ログインすると、生成履歴を保存できます
                    </p>
                );
            };
            case "generate-error": {
                return (
                    <div className="flex gap-1 items-center">
                        <ErrorFill
                            size={20}
                            color="var(--color-red-400)"
                        />
                        <p className="[text-box:trim-both_cap_alphabetic] text-red-400 text-sm">
                            生成に失敗しました
                        </p>
                    </div>
                );
            };
            case "fetch-error": {
                return (
                    <div className="flex gap-1 items-center">
                        <ErrorFill
                            size={20}
                            color="var(--color-red-400)"
                        />
                        <p className="[text-box:trim-both_cap_alphabetic] text-red-400 text-sm">
                            データの取得に失敗しました
                        </p>
                    </div>
                );
            };
        }
    };

    return (
        <div className="flex items-end justify-between">
            <button
                type="button"
                className="bg-slate-300 flex h-10 items-center justify-center rounded-full w-10 hover:bg-slate-400"
                onClick={handleNavigate}
            >
                <ArrowLeftAltW700
                    size={24}
                    color="var(--color-white)"
                />
            </button>
            {statusMessages()}
        </div>
    );
}