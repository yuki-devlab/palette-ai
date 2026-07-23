"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getSubscription } from "@/lib/subscription";

export async function getSidebarHistory() {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return [];
    }

    const { isPro } = await getSubscription();

    return await prisma.history.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: isPro ? undefined : 10,
    });
}