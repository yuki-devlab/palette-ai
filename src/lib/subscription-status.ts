import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getSubscriptionStatus() {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            isPro: false,
        };
    }

    const subscription = await prisma.subscription.findUnique({
        where: {
            userId: session.user.id,
        },
        select: {
            currentPeriodEnd: true,
        },
    });

    const isPro =
        !!subscription &&
        subscription.currentPeriodEnd.getTime() + (24 * 60 * 60 * 1000) > Date.now();
    
    return { isPro };
}