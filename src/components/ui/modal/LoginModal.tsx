import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Close } from "@material-symbols-svg/react/w700";
import { cn } from "@/lib/utils";
import { login } from "@/actions/auth";
import ModalLoginButton from "@/components/ui/login-button/ModalLoginButton";

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!mounted) {
        return null;
    }

    const portal = document.getElementById("portal");

    if (!portal) {
        return null;
    }

    return createPortal(
        <div className={cn(
            "fixed flex inset-0 items-center px-5",
            isOpen ? "pointer-events-auto" : "pointer-events-none",
            "md:justify-center md:p-0",
        )}>
            <div
                className={cn(
                    "backdrop-blur-md bg-slate-500/25 fixed inset-0",
                    isOpen ? "opacity-100" : "opacity-0",
                )}
                onClick={onClose}
            >
                <button
                    type="button"
                    className={cn(
                        "absolute bg-slate-400 flex h-9 items-center justify-center right-5 rounded-full top-5 w-9",
                        "hover:bg-slate-500",
                        "md:h-10 md:right-6 md:top-6 md:w-10",
                        "lg:h-8 lg:right-5 lg:top-5 lg:w-8",
                        "xl:h-10 xl:right-6 xl:top-6 xl:w-10",
                    )}
                    onClick={onClose}
                >
                    <Close
                        color="var(--color-white)"
                        className={cn(
                            "h-5 w-5",
                            "lg:h-4.5 lg:w-4.5",
                            "xl:h-5 xl:w-5",
                        )}
                    />
                </button>
            </div>
            <div className={cn(
                "bg-white origin-bottom p-2 rounded-4xl shadow-2xl w-full z-10",
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50",
                "md:w-sm",
                "lg:w-xs",
                "xl:w-md",
            )}>
                <div className={cn(
                    "bg-sky-100 flex h-36 items-center justify-center rounded-t-3xl",
                    "md:h-45",
                    "lg:h-38",
                    "xl:h-55",
                )}>
                    {/* ロゴ */}
                </div>
                <div className={cn(
                    "flex flex-col gap-6 items-center pb-4 pt-6 px-4",
                    "lg:gap-5 lg:pb-3 lg:pt-5 lg:px-3",
                    "xl:gap-7 xl:pb-5 xl:pt-7 xl:px-5",
                )}>
                    <h2 className={cn(
                        "font-bold [text-box:trim-both_cap_alphabetic] text-lg",
                        "md:text-xl",
                        "lg:text-base",
                        "xl:text-xl",
                    )}>
                        Palette AIへようこそ！
                    </h2>
                    <p className={cn(
                        "text-[11px] leading-relaxed [text-box:trim-both_cap_alphabetic] text-center text-slate-500",
                        "md:text-xs",
                        "lg:text-[10px]",
                        "xl:text-sm",
                    )}>
                        ログインすると、生成履歴を保存できます。
                        <br />
                        保存した履歴は、いつでもどこからでも確認できます。
                    </p>
                    <form action={login}>
                        <ModalLoginButton />
                    </form>
                </div>
            </div>
        </div>,
        portal,
    );
}