"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function deleteHistory(historyId: string) {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        throw new Error("ログインしてください");
    }

    const result = await prisma.history.deleteMany({
        where: {
            id: historyId,
            userId,
        },
    });

    if (result.count === 0) {
        throw new Error("すでに削除されています");
    }

    revalidatePath("/", "layout");
}