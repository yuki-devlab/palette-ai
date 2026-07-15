"use server";

import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function createCheckoutSession(plan: "monthly" | "yearly") {
    const session = await auth();

    if (!session?.user || !session.user.email) {
        throw new Error("ログインが必要です");
    }

    const priceId = plan === "yearly"
        ? process.env.STRIPE_PRICE_ID_YEARLY
        : process.env.STRIPE_PRICE_ID_MONTHLY;
    
    if (!priceId) {
        throw new Error("料金プランのIDが設定されていません");
    }

    const subscription = await prisma.subscription.findUnique({
        where: {
            userId: session.user.id,
        },
    });

    let customerId = subscription?.customerId;

    if (!customerId) {
        const customer = await stripe.customers.create({
            email: session.user.email,
            metadata: {
                userId: session.user.id,
            },
        });

        customerId = customer.id;
    }

    const stripeSession = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}`,
        metadata: {
            userId: session.user.id,
        },
    });

    return { url: stripeSession.url };
}