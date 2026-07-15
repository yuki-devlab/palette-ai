import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getSubscription() {
    const session = await auth();

    if (!session?.user) {
        return { isPro: false };
    }

    const subscription = await prisma.subscription.findUnique({
        where: {
            userId: session.user.id,
        },
    });

    if (!subscription) {
        return { isPro: false };
    }

    const isPro =
        subscription.currentPeriodEnd.getTime() + 86_400_000 > Date.now();

    return { isPro };
}