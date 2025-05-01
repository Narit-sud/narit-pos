import { cookies } from "next/headers";
export async function DELETE(request: Request): Promise<Response> {
    try {
        const cookieStore = await cookies();
        const cookie = cookieStore.getAll();
        cookie.map((c) => {
            cookieStore.delete(c.name);
        });
        return Response.json(
            { message: "Cookie has been reset" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting cookie:", error);
        return Response.json(
            { message: "Failed to delete cookie" },
            { status: 500 }
        );
    }
}
