"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Close as CloseW700 } from "@material-symbols-svg/react/w700";
import { login } from "@/actions/auth";
import Logo from "@/components/Logo";
import ModalLoginButton from "@/components/login-button/ModalLoginButton";

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [mounted, setMounted] = useState(false);
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

    const handleLogin = async () => {
        sessionStorage.setItem("login-progress", "true");

        await login();
    };

    useEffect(() => {
        setMounted(true);
        setPortalRoot(document.getElementById("portal") ?? document.body);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    if (!mounted || !portalRoot) {
        return null;
    }

    return createPortal(
        <div
            className={`
                fixed flex inset-0 items-center justify-center
                ${
                    isOpen
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                }
            `}
        >
            <div
                className={`
                    backdrop-blur-md bg-slate-500/25 fixed inset-0 transition-all
                    ${
                        isOpen
                            ? "opacity-100"
                            : "opacity-0"
                    }
                `}
                onClick={onClose}
            >
                <button
                    className="absolute bg-slate-400 flex h-10 items-center justify-center right-6 rounded-full top-6 w-10 hover:bg-slate-500"
                    onClick={onClose}
                >
                    <CloseW700
                        size={20}
                        color="var(--color-white)"
                    />
                </button>
            </div>
            <div
                className={`
                    bg-white border-4 border-white origin-bottom rounded-3xl shadow-2xl transition-all w-md
                    ${
                        isOpen
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-50"
                    }
                `}
            >
                <div className="bg-sky-100 flex h-52 items-center justify-center rounded-t-3xl">
                    <div className="w-25 h-25">
                        <Logo />
                    </div>
                </div>
                <div className="flex flex-col gap-7 pb-6 pt-7 px-6 text-center">
                    <h2 className="font-bold [text-box:trim-both_cap_alphabetic] text-xl">
                        Palette AIへようこそ！
                    </h2>
                    <p className="leading-relaxed [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                        ログインすると、生成履歴を保存できます。
                        <br />
                        保存した履歴は、いつでもどこからでも確認できます。
                    </p>
                    <form action={handleLogin}>
                        <ModalLoginButton />
                    </form>
                </div>
            </div>
        </div>,
        portalRoot,
    );
}