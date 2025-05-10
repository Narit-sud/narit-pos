import { db } from "@/lib/db";
import { getAuthSql } from "./sql";
import { getDecryptedCookie } from "@/lib/cookie";
import { createAuthInterface } from "@/model/auth.interface";

export async function GET(): Promise<Response> {
    try {
        const { userId } = await getDecryptedCookie("authToken");
        if (!userId) return new Response("Unauthorized", { status: 401 });
        const query = await db.query(getAuthSql, [userId]);
        if (query.rowCount === 0) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }
        return Response.json(
            { data: createAuthInterface(query.rows[0]) },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error getting auth data:", error);
        return Response.json({ error }, { status: 401 });
    }
}
