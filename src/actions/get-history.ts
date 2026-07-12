"use server";

import prisma from "@/lib/prisma";

export async function getHistory(historyId: string) {
    const history = await prisma.history.findUnique({
        where: {
            id: historyId,
        },
    });

    return history;
}