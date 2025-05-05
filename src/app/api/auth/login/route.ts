import { db } from "@/lib/db";
import { comparePassword } from "@/lib/encrypt";
import { NextRequest, NextResponse } from "next/server";
import { createShortLiveToken } from "@/lib/token";
import { loginSql, getStoreDataSql } from "@/lib/sql";
import { setEncryptedCookie } from "@/lib/cookie";

export async function POST(request: NextRequest): Promise<Response> {
    const { username, password } = await request.json();
    if (!username || !password) {
        return Response.json(
            { message: "Login failed. Credentials required." },
            { status: 400 }
        );
    }
    try {
        // get hash
        const query = await db.query(loginSql, [username.toLowerCase()]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Username or password not found" },
                { status: 500 }
            );
        }
        // compare password
        const hash = query.rows[0].password;
        const isPasswordMatched = comparePassword(password, hash);

        // if password not matched
        if (!isPasswordMatched) {
            return Response.json(
                { message: "Username or password not found" },
                { status: 500 }
            );
        }

        // get store data
        const userId = query.rows[0].id;
        const storeData = await db.query(getStoreDataSql, [userId]);

        await setEncryptedCookie("authToken", { userId }, 1);
        if (!storeData.rowCount) {
            return Response.json(
                { message: "Login success", store: [] },
                { status: 200 }
            );
        }
        return Response.json(
            {
                message: "Login success",
                store: storeData.rows,
            },
            { status: 200 }
        );

        // if password doesn't match, return error response
    } catch (error) {
        console.error("Login failed:", error);
        if (error instanceof Error) {
            return Response.json(
                { message: error.message || "Login failed" },
                { status: 500 }
            );
        }

        return Response.json({ message: "Unexpected Error" }, { status: 500 });
    }
}
