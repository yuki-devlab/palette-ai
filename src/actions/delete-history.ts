"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function deleteHistory(historyId: string) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("認証されていません");
    }

    const history = await prisma.history.findUnique({
        where: { id: historyId },
        select: { userId: true },
    });

    if (!history) {
        throw new Error("履歴が見つかりません");
    }

    if (history.userId !== session.user.id) {
        throw new Error("他のユーザーの履歴は削除できません");
    }

    await prisma.history.delete({
        where: {
            id: historyId,
        },
    });

    revalidatePath("/");
}