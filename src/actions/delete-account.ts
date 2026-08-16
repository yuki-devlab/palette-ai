"use server";

import { auth, signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function deleteAccount() {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("ログインしてください");
    }

    try {
        const subscription = await prisma.subscription.findUnique({
            where: {
                userId: session.user.id,
            },
            select: {
                subscriptionId: true,
            },
        });

        if (subscription?.subscriptionId) {
            await stripe.subscriptions.cancel(
                subscription.subscriptionId,
            );
        }

        await prisma.user.delete({
            where: {
                id: session.user.id,
            },
        });
    } catch (error) {
        throw new Error("アカウントの削除に失敗しました");
    }

    await signOut({
        redirectTo: "/",
    });
}