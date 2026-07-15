"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getSubscription } from "@/lib/subscription";

export async function getSidebarHistory() {
    const session = await auth();

    if (!session?.user) {
        return [];
    }

    const { isPro } = await getSubscription();
    const takeCount = isPro ? undefined : 10;

    const histories = await prisma.history.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: takeCount,
    });

    return histories;
}