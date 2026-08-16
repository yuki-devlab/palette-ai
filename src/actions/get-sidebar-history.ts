"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getSubscriptionStatus } from "@/lib/subscription-status";

export async function getSidebarHistory() {
    const session = await auth();

    if (!session?.user.id) {
        return [];
    }

    const { isPro } = await getSubscriptionStatus();

    return await prisma.history.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: isPro ? undefined : 10,
    });
}