import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/token";
import { off } from "process";

// Routes that are publicly accessible
/**
 * To bypass the middleware, add the route to this array.
 */
const publicRoutes = [
    "/auth",
    "/api/auth/login",
    "/api/auth/signup",
    "/api/auth/logout",
    "/_next/static/chunks",
    "/favicon.ico",
];
const protectedRoutes = ["/app"];

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl;

    // public routes
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // protected routes
    if (pathname.startsWith("/app")) {
        const sessionCookie = request.cookies.get("session")?.value;
        if (!sessionCookie) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        const decryptedSession = await decrypt(sessionCookie);
        if (!decryptedSession) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        // Create response with headers
        const response = NextResponse.next();

        // Attach custom headers
        response.headers.set("x-user-id", decryptedSession.userId as string);

        // If on store page, add any additional headers
        if (pathname === "/app/store") {
            response.headers.set("x-store-page", "true");
        }

        return response;
    }

    // not matching any route
    return NextResponse.redirect(new URL("/auth/login", request.url));
}
