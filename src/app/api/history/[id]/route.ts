import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(
    _req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;

        console.log("🧨 DELETE HIT:", id);

        const session = await auth();
        console.log("SESSION:", session);

        if (!session?.user?.id) {
            console.log("NO SESSION");
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const history = await prisma.history.findUnique({
            where: { id },
        });

        console.log("HISTORY:", history);

        if (!history) {
            return Response.json({ error: "Not found" }, { status: 404 });
        }

        if (history.userId !== session.user.id) {
            return Response.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.history.delete({
            where: { id },
        });

        console.log("DELETED OK");

        return Response.json({ ok: true });
    } catch (e) {
        console.error("🔥 DELETE ERROR:", e);

        return Response.json(
            { error: "Internal Error", detail: String(e) },
            { status: 500 }
        );
    }
}