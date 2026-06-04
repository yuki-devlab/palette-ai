import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
    const session = await auth();

    if (!session?.user?.id) {
        return Response.json([]);
    }

    const histories = await prisma.history.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return Response.json(histories);
}