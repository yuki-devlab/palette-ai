"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

type DeleteHistoryProps = {
    historyId: string;
};

export async function deleteHistory({ historyId }: DeleteHistoryProps) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("ログインしてください");
    }

    await prisma.history.deleteMany({
        where: {
            id: historyId,
            userId: session.user.id,
        },
    });

    revalidatePath("/", "layout");
}