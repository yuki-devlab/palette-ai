"use server";

import prisma from "@/lib/prisma";

type GetHistoryProps = {
    historyId: string;
};

export async function getHistory({ historyId }: GetHistoryProps) {
    const history = await prisma.history.findUnique({
        where: {
            id: historyId,
        },
    });

    return history;
}