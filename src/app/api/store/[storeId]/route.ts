import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/_lib/session";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/_lib/db";
import { getCookie, setCookie } from "@/_lib/cookie";
import type { StoreInterface } from "@/app/store/interface";
import type { StoreUserInterface } from "@/app/store/interface";

/**
 * This function is created to set the store for the client.
 * When the user is logged in, the store id will be set to the cookie.
 *
 * User can set the store id to their cookie if:
 * * User is logged in.
 * * User is authorized in that store.
 *
 * Yser cannot set the store id to their cookie if:
 * * User is not logged in.
 * * User is not authorized in that store.
 *
 * @param request request from client
 * @param params store id from client
 * @returns response and set store id to the client cookie
 */
export async function POST(
    request: Request,
    { params }: { params: Promise<{ storeId: string }> }
): Promise<NextResponse> {
    const { storeId } = await params;
    if (!storeId) {
        return NextResponse.json(
            { error: "Store ID is required" },
            { status: 400 }
        );
    }
    const { userId } = await getCookie("session");
    if (!userId) {
        return NextResponse.json(
            { error: "User authentication failed" },
            { status: 401 }
        );
    }
    // validate if user is authorized to access the store
    const sql = `
        SELECT
        CASE
            WHEN COUNT(*) > 0
            THEN TRUE
            ELSE FALSE
        END AS "isAuthorized"
        FROM
            store_user su
        WHERE
            su.user_id = $1
            AND su.store_id = $2`;
    try {
        const query = await db.query(sql, [userId, storeId]);
        const store = query.rows[0];
        if (!store.isAuthorized) {
            return NextResponse.json(
                { error: "Store not found" },
                { status: 403 }
            );
        }
        console.log("storeId", storeId);
        await setCookie("storeData", { storeId });
        return NextResponse.json(
            { message: `Selected store id: ${storeId}` },
            { status: 200 }
        );
    } catch (error) {
        console.error("api/store/[storeId]/route.ts", error);
        // if storeId type is not uuid
        if (
            error &&
            typeof error === "object" &&
            "where" in error &&
            typeof (error as any).where === "string" &&
            (error as any).where.includes("unnamed portal parameter $2")
        ) {
            return NextResponse.json(
                { error: "Store ID is invalid" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Error fetching store data", error },
            { status: 500 }
        );
    }
}
