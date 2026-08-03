"use server";

import { signIn, signOut } from "@/lib/auth";

export async function login() {
    await signIn("google", {
        redirectTo: "/",
    });
}

export async function logout() {
    await signOut({
        redirectTo: "/",
    });
}