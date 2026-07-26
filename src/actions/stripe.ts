"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

type createCheckoutSessionProps = {
    plan: "monthly" | "yearly";
    returnUrl: string;
};

export async function createCheckoutSession({ plan, returnUrl }: createCheckoutSessionProps) {
    const session = await auth();

    if (!session?.user.id || !session.user.email) {
        throw new Error("ログインしてください");
    }

    const priceId = plan === "monthly"
        ? process.env.STRIPE_PRICE_ID_MONTHLY
        : process.env.STRIPE_PRICE_ID_YEARLY;
    
    if (!priceId) {
        throw new Error("料金プランの設定に問題が発生しました");
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
        mode: "subscription",
        customer: customerId,
        payment_method_types: ["card"],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: `${returnUrl}/?success=true`,
        cancel_url: `${returnUrl}`,
        metadata: {
            userId: session.user.id,
        },
    });

    return { url: stripeSession.url };
}