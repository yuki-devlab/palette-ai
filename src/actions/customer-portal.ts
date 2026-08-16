"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function createCustomerPortalSession() {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("ログインしてください");
    }

    const subscription = await prisma.subscription.findUnique({
        where: {
            userId: session.user.id,
        },
        select: {
            customerId: true,
        },
    });

    if (!subscription?.customerId) {
        throw new Error("ご契約中のプランが見つかりません");
    }

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: subscription.customerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    });

    return {
        url: portalSession.url,
    };
}