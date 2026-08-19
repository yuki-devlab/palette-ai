import prisma from "@/lib/prisma";

export async function getSubscriptionStatus(userId?: string | null) {
    if (!userId) {
        return {
            isPro: false,
        };
    }

    const subscription = await prisma.subscription.findUnique({
        where: {
            userId,
        },
        select: {
            currentPeriodEnd: true,
        },
    });

    const isPro =
        !!subscription &&
        subscription.currentPeriodEnd.getTime() + 86_400_000 > Date.now();
    
    return { isPro };
}