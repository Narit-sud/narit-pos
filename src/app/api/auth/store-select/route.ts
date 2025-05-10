import { db } from "@/lib/db";
import { getStoreUserPermissionIdSql } from "@/app/api/store/sql";
import { setEncryptedCookie } from "@/lib/cookie";
import { getDecryptedCookie } from "@/lib/cookie";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
    console.log("store-select route");
    const authToken = await getDecryptedCookie("authToken");
    if (!authToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    // get user credencials
    const body = await request.json();
    const { storeId } = body;
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
        // check if the user is authorized in this store
        const query = await db.query(getStoreUserPermissionIdSql, [
            userId,
            storeId,
        ]);
        // if not
        if (!query.rowCount) {
            return Response.json(
                { message: "User is not authorized in that store." },
                { status: 403 }
            );
        }
        // if yes, set cookie to the client
        await setEncryptedCookie("authToken", { userId, storeId });
        return Response.json(
            { message: "User is authorized in this store." },
            { status: 200 }
        );
    } catch (error) {
        console.log("store-select route error: ", error);
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}
