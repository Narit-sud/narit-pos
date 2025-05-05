import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/token";
import { off } from "process";
import { getDecryptedCookie } from "./lib/cookie";

// Routes that are publicly accessible
/**
 * To bypass the middleware, add the route to this array.
 */
const publicRoutes = [
    "/auth", // login, sighup, logout page
    "/api/auth", // login, sighup, logout routes
    "/api/store", // select store route
    "/_next/static/chunks",
    "/favicon.ico",
];
const protectedRoutes = ["/app"];

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl;

    // public routes always accessible
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }
    // protected routes that need authentication
    if (pathname.startsWith("/app")) {
        console.log("Middleware is running at " + pathname);
        const authToken = await getDecryptedCookie("authToken");
        if (!authToken) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
        return NextResponse.next();
    }

    // not matching any route
    return NextResponse.redirect(new URL("/auth/login", request.url));
}
