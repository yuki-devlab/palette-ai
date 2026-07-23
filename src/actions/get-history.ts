"use server";

import prisma from "@/lib/prisma";

export async function getHistory(historyId: string) {
    return await prisma.history.findUnique({
        where: {
            id: historyId,
        },
    });
}