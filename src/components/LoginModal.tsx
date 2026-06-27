"use client";

import { useEffect, useState } from "react";
import { createPortal, useFormStatus } from "react-dom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Close as CloseW700 } from "@material-symbols-svg/react/w700";
import { login } from "@/actions/auth";

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

function LoginButton() {
    const t = useTranslations("loginModal");
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-google-login flex gap-3 items-center justify-center py-5 rounded-full w-full hover:bg-slate-800"
        >
            {pending ? (
                <div className="animate-spin border-[3px] border-t-white border-white/25 h-5 rounded-full w-5" />
            ) : (
                <Image
                    src="/google-logo.svg"
                    width={20}
                    height={20}
                    alt=""
                />
            )}
            <span className="font-bold [text-box:trim-both_cap_alphabetic] text-white">
                {t("login")}
            </span>
        </button>
    )
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const t = useTranslations("loginModal");
    const [mounted, setMounted] = useState(false);
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMounted(true);
        setPortalRoot(document.getElementById("portal"));
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }
    }, [isOpen])

    if (!mounted || !portalRoot) {
        return null;
    }

    return createPortal (
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
                    {/* <Logo /> */}
                </div>
                <div className="flex flex-col gap-7 pb-6 pt-7 px-6 text-center">
                    <h2 className="font-bold [text-box:trim-both_cap_alphabetic] text-xl">
                        {t("title")}
                    </h2>
                    <p className="leading-relaxed [text-box:trim-both_cap_alphabetic] text-slate-500 text-sm">
                        {t("description.line1")}
                        <br />
                        {t("description.line2")}
                    </p>
                    <form action={login}>
                        <LoginButton />
                    </form>
                </div>
            </div>
        </div>,
        portalRoot,
    )
}