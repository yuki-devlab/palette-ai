import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") || "";

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

        if (!session.metadata?.userId) {
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

        await prisma.subscription.create({
            data: {
                userId: session.metadata.userId,
                subscriptionId: subscription.id,
                customerId: session.customer as string,
                priceId: subscription.items.data[0].price.id,
                currentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
            },
        });
    }

    return new NextResponse(null, { status: 200 });
}