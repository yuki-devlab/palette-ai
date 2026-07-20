"use client";

import { useFormStatus } from "react-dom";
import Image from "next/image";

export default function ModalLoginButton() {
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
                Googleでログイン
            </span>
        </button>
    );
}