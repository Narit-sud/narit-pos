import { db } from "@/lib/db";
import { comparePassword } from "@/lib/encrypt";
import { NextRequest, NextResponse } from "next/server";
import { createShortLiveSession } from "@/lib/token";

export async function POST(request: NextRequest): Promise<Response> {
    const { username, password } = await request.json();
    if (!username || !password) {
        return Response.json(
            { message: "Login failed. Credentials required." },
            { status: 400 },
        );
    }
    try {
        // get hash
        const sql = `select id, password from "user" where username = $1;`;
        const query = await db.query(sql, [username.toLowerCase()]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Username or password not found" },
                { status: 500 },
            );
        }
        // compare password
        const hash = query.rows[0].password;
        const isPasswordMatched = comparePassword(password, hash);
        // if password matched, redirect to store/select
        if (isPasswordMatched) {
            const userId = query.rows[0].id;
            await createShortLiveSession(userId);
            return Response.json(
                {
                    message: "Login success",
                },
                { status: 200 },
            );
        }
        // if password doesn't match, return error response
        return Response.json(
            { message: "Username or password not found" },
            { status: 500 },
        );
    } catch (error) {
        console.error("Login failed:", error);
        if (error instanceof Error) {
            return Response.json(
                { message: error.message || "Login failed" },
                { status: 500 },
            );
        }

        return Response.json({ message: "Unexpected Error" }, { status: 500 });
    }
}
