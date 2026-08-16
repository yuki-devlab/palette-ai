"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { login } from "@/actions/auth";
import CloseButton from "@/components/ui/modal/login/_components/CloseButton";
import LoginButton from "@/components/ui/modal/login/_components/LoginButton";

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
            document.body.style.overflow = "hidden";

            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 10);

            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
            document.body.style.overflow = "";

            const timer = setTimeout(() => {
                setIsRendered(false);
            }, 150);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted || !isRendered) {
        return null;
    }

    const portal = document.getElementById("portal");

    if (!portal) {
        return null;
    }

    return createPortal(
        <div className={cn(
            "fixed flex inset-0 items-center justify-center px-5",
            isVisible ? "pointer-events-auto" : "pointer-events-none",
            "md:px-0",
        )}>
            <div
                className={cn(
                    "backdrop-blur-md bg-slate-500/25 fixed inset-0 transition-all",
                    isVisible ? "opacity-100" : "opacity-0",
                )}
                onClick={onClose}
            />
            <div className={cn(
                "bg-white flex flex-col gap-5 items-end origin-bottom p-5 rounded-4xl shadow-2xl transition-all w-full z-10",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50",
                "md:gap-6 md:p-6 md:w-sm",
                "xl:w-md",
            )}>
                <CloseButton onClick={onClose} />
                <div className="flex flex-col gap-6 items-center w-full">
                    <h2 className="font-bold text-[22px] [text-box:trim-both_cap_alphabetic]">
                        Palette AIへようこそ！
                    </h2>
                    <p className="leading-relaxed [text-box:trim-both_cap_alphabetic] text-center text-slate-500 text-sm">
                        ログインすると、生成履歴を保存できます。
                        <br />
                        保存された履歴は、いつでもどこからでも確認できます。
                    </p>
                    <form
                        action={login}
                        className="w-full"
                    >
                        <LoginButton />
                    </form>
                </div>
            </div>
        </div>,
        portal,
    );
}