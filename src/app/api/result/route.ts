import { getStore } from "@/lib/store";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return Response.json(
            { error: "missing id" },
            { status: 400 }
        );
    }

    const data = getStore(id);

    if (!data) {
        return Response.json(
            { error: "not found" },
            { status: 404 }
        );
    }

    return Response.json(data);
}