import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * remove all cookies from the client
 */
export async function DELETE(request: Request): Promise<Response> {
    try {
        const cookieStore = await cookies();
        const cookie = cookieStore.getAll();
        cookie.map((c) => {
            cookieStore.delete(c.name);
        });
        return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
        console.error("Error logging out:", error);
        return Response.json({ message: "Failed to logout" }, { status: 500 });
    }
}
