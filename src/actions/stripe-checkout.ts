"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

type CreateCheckoutSessionProps = {
    planType: "monthly" | "yearly";
};

export async function createCheckoutSession({ planType }: CreateCheckoutSessionProps) {
    const session = await auth();

    if (!session?.user?.id || !session.user.email) {
        throw new Error("ログインしてください");
    }

    const priceId =
        planType === "monthly"
            ? process.env.STRIPE_PRICE_ID_MONTHLY
            : process.env.STRIPE_PRICE_ID_YEARLY;
    
    if (!priceId) {
        throw new Error("料金プランの読み込みに失敗しました");
    }

    const subscription = await prisma.subscription.findUnique({
        where: {
            userId: session.user.id,
        },
        select: {
            customerId: true,
        },
    });

    const returnUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        ...(subscription?.customerId
            ? { customer: subscription.customerId }
            : { customer_email: session.user.email }),
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: returnUrl,
        cancel_url: returnUrl,
        metadata: {
            userId: session.user.id,
        },
    });

    return {
        url: checkoutSession.url,
    };
}