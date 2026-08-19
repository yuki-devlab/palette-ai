import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const getNavigationData = cache(async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return {
            session,
            isPro: false,
            histories: [],
        };
    }

    const [subscription, histories] = await Promise.all([
        prisma.subscription.findUnique({
            where: { userId },
            select: {
                currentPeriodEnd: true,
            },
        }),

        prisma.history.findMany({
            where: { userId },
            orderBy: {
                createdAt: "desc",
            },
            take: 50,
            select: {
                id: true,
                baseColor: true,
                mainColor: true,
                accentColor: true,
            },
        }),
    ]);

    const isPro =
        !!subscription &&
        subscription.currentPeriodEnd.getTime() + 86_400_000 > Date.now();

    return {
        session,
        isPro,
        histories: isPro ? histories : histories.slice(0, 10),
    };
});