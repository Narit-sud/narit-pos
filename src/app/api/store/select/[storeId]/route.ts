import { db } from "@/lib/db";
import { validateUserAndStoreId } from "@/lib/sql";
import { setCookie } from "@/lib/cookie";
import { getDecryptedCookie } from "@/lib/cookie";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ storeId: string }> }
): Promise<Response> {
    const authToken = await getDecryptedCookie("authToken");
    if (!authToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    // get user credencials
    const { storeId } = await params;
    const { userId } = authToken;

    if (!storeId || !userId) {
        return Response.json(
            {
                message: "User authentication failed during select a store.",
            },
            { status: 401 }
        );
    }
    try {
        const query = await db.query(validateUserAndStoreId, [userId, storeId]);
        // validate data
        if (query.rowCount === 0) {
            return Response.json(
                { message: "User is not authorized in that store." },
                { status: 403 }
            );
        }
        // set cookie to the client
        await setCookie("authToken", { userId, storeId });
        return Response.json(
            { message: "User is authorized in this store." },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}
