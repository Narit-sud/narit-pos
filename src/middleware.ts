import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getDecryptedCookie } from "./lib/cookie";

/**
 * To check only login status, add the route to this array.
 * This route will check if user has authToken cookie and {userId}, and provided value is valid
 */
const loggedInRoutes = [
    "/app/store",
    "/api/store",
    "/api/auth/store-select",
    "/auth/store-select",
];

/**
 * To check login status, and store permission, add the route to this array.
 * This route will check if user has authToken cookie and {userId, storeId}, and provided value is valid
 */
const storeSelectedRoutes = ["/app", "/pos"];

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

    //======================================= LOGGED-IN ROUTES ==========================================

    // if pathname is matched the loggedInRoutes
    if (loggedInRoutes.some((route) => pathname === route)) {
        console.log("MIDDLEWARE: entered loggedInRoutes", pathname);
        // get authToken
        try {
            const authToken = request.cookies.get("authToken");
            if (!authToken) {
                console.log("MIDDLEWARE: rejected, no authToken", pathname);
                return NextResponse.redirect(
                    new URL("/auth/login", request.url)
                );
            }
            return NextResponse.next(); // token valid
        } catch (error) {
            // token invalid
            console.error(
                "MIDDLEWARE: rejected at loggedInRoutes",
                pathname,
                error
            );
            return NextResponse.json(
                { message: "User authentication failed" },
                { status: 401 }
            );
        }
    }

    //======================================= PROTECTED ROUTES ==========================================
    if (storeSelectedRoutes.some((route) => pathname.startsWith(route))) {
        console.log("MIDDLEWARE: entered protectedRoutes", pathname);
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
                console.log("MIDDLEWARE: rejected, no userId", pathname);
                // send to login page
                return NextResponse.redirect(
                    new URL("/auth/login", request.url)
                );
            }
            // if no storeId
            if (!storeId) {
                console.log("MIDDLEWARE: rejected, no storeId", pathname);
                // send to store select page
                return NextResponse.redirect(
                    new URL("/auth/store-select", request.url)
                );
            }
            // if everything is ok
            return NextResponse.next(); // token valid
        } catch (error) {
            // token invalid
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    //======================================= PUBLIC ROUTES ==========================================
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
        // if you want to select store, you have to have userId with you
        if (pathname === "/auth/store-select") {
            try {
                const authToken = await getDecryptedCookie("authToken");
                if (authToken) return NextResponse.next();
            } catch (error) {
                return NextResponse.redirect(
                    new URL("/auth/login", request.url)
                );
            }
        }
    }
    return NextResponse.next();
}
