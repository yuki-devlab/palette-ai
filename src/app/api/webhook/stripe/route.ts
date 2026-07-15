import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    if (!signature) {
        return new NextResponse(
            "Stripe signature is required",
            { status: 400 },
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string,
        );
    } catch (error: any) {
        return new NextResponse(
            `Webhook Error: ${error.message}`,
            { status: 400 },
        );
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        if (!session?.metadata?.userId) {
            return new NextResponse(
                "User ID is required",
                { status: 400 },
            );
        }

        if (typeof session.subscription !== "string") {
            return new NextResponse(
                "Subscription ID is invalid",
                { status: 400 },
            );
        }

        const subscription = await stripe.subscriptions.retrieve(
            session.subscription,
        );

        const subscriptionItem = subscription.items.data[0];

        if (!subscriptionItem) {
            return new NextResponse(
                "Subscription item was not found",
                { status: 400 },
            );
        }

        await prisma.subscription.create({
            data: {
                userId: session.metadata.userId,
                subscriptionId: subscription.id,
                customerId:
                    typeof subscription.customer === "string"
                        ? subscription.customer
                        : subscription.customer.id,
                priceId: subscriptionItem.price.id,
                currentPeriodEnd: new Date(subscriptionItem.current_period_end * 1000),
            },
        });
    }

    return new NextResponse(
        null,
        { status: 200 },
    );
}