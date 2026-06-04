"use client";

import { login, logout } from "@/lib/login-logout";

export function LoginButton() {
    return (
        <form
            action={login}
            className="w-full"
        >
            <button
                type="submit"
                className="w-full py-6 [text-box:trim-both_cap_alphabetic] bg-[var(--color-blue)] text-white font-bold rounded-full text-sm hover:bg-blue-400"
            >
                ログイン
            </button>
        </form>
    )
}

export function LogOutButton() {
    return (
        <form action={logout}>
            <button
                type="submit"
                className="p-4 rounded-full bg-[var(--color-blue)] text-white font-bold [text-box:trim-both_cap_alphabetic] text-xs hover:bg-blue-400"
            >
                ログアウト
            </button>
        </form>
    )
}