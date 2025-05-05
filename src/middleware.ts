import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/token";
import { getDecryptedCookie } from "./lib/cookie";

/**
 * To check only login status, add the route to this array.
 */
const afterLoginRoutes = [
    "/app/store/",
    "/api/store",
    "/api/auth/store-select",
    "/auth/store-select",
];

/**
 * To check login status, and store permission, add the route to this array.
 */
const protectedRoutes = ["/app"];

// Routes that are publicly accessible
/**
 * To bypass the middleware, add the route to this array.
 */
const publicRoutes = [
    "/auth", // login, sighup, logout page
    "/api/auth", // login, sighup, logout routes
    "/_next/static/chunks",
    "/favicon.ico",
];

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl;

    // if pathname is matched the afterLoginRoutes
    if (afterLoginRoutes.some((route) => pathname === route)) {
        console.log("MIDDLEWARE: stuck at afterLoginRoutes");
        // get authToken
        const authToken = request.cookies.get("authToken");
        // if no token
        if (!authToken) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
        try {
            const decrypted = await decrypt(authToken.value); // verify token
            return NextResponse.next(); // token valid
        } catch (error) {
            // token invalid
            return NextResponse.json(
                { message: "User authentication failed" },
                { status: 401 },
            );
        }
    }

    // if pathname is matched the protectedRoutes
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        console.log("MIDDLEWARE: stuck at protectedRoutes");
        // get authToken
        const authToken = request.cookies.get("authToken");
        // if no token
        if (!authToken) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        try {
            // read token
            const { userId, storeId } = await getDecryptedCookie("authToken");
            // if no userId
            if (!userId) {
                // send to login page
                return NextResponse.redirect(
                    new URL("/auth/login", request.url),
                );
            }
            // if no storeId
            if (!storeId) {
                // send to store select page
                return NextResponse.redirect(
                    new URL("/auth/store-select", request.url),
                );
            }
            // if everything is ok
            return NextResponse.next(); // token valid
        } catch (error) {
            // token invalid
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    // public routes always accessible
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
        // if you want to select store, you have to have userId with you
        if (pathname === "/auth/store-select") {
            try {
                const authToken = await getDecryptedCookie("authToken");
                if (authToken) return NextResponse.next();
            } catch (error) {
                return NextResponse.redirect(
                    new URL("/auth/login", request.url),
                );
            }
        }
    }
    return NextResponse.next();
}
