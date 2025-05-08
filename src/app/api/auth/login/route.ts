import { db } from "@/lib/db";
import { comparePassword } from "@/lib/encrypt";
import { NextRequest } from "next/server";
import { loginSql } from "./sql";
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
        // get hash password to compare wiht string password
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

        // set authToken
        const userId = query.rows[0].id;
        await setEncryptedCookie("authToken", { userId }, 1);
        return Response.json(
            {
                message: "Login success",
            },
            { status: 200 }
        );
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
