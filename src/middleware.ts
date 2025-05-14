import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getDecryptedCookie } from "./lib/cookie";

const userIdRequiredRoute = [
    "/app/store",
    "/api/store",
    "/api/auth/store-select",
    "/auth/store-select",
];

const userAndStoreIdRequiredRoute = ["/app"];

const freeEnterRoutes = [
    "/auth", // login, sighup, logout page
    "/api/auth", // login, sighup, logout routes
    "/_next/static/chunks",
    "/favicon.ico",
];

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl;
    if (userIdRequiredRoute.some((route) => pathname === route)) {
        // exact match
        try {
            const { userId } = await getDecryptedCookie("authToken");
            if (!userId) {
                console.log("MIDDLEWARE: rejected, user not logged in.");
                return NextResponse.redirect(
                    new URL("/auth/login", request.url)
                );
            }
            return NextResponse.next(); // token valid
        } catch (error) {
            // token invalid
            console.error("MIDDLEWARE: rejected, user's token invalid.", error);
            return NextResponse.json(
                { message: "User authentication failed" },
                { status: 401 }
            );
        }
    }

    if (
        userAndStoreIdRequiredRoute.some((route) => pathname.startsWith(route))
        // starts with
    ) {
        try {
            const { userId, storeId } = await getDecryptedCookie("authToken");
            if (!userId) {
                console.log("MIDDLEWARE: rejected, user not logged in.");

                return NextResponse.redirect(
                    new URL("/auth/login", request.url)
                );
            }
            if (!storeId) {
                console.log("MIDDLEWARE: rejected, user not selected store.");
                return NextResponse.redirect(
                    new URL("/auth/store-select", request.url)
                );
            }
            return NextResponse.next(); // token valid
        } catch (error) {
            return NextResponse.redirect(new URL("/auth/login", request.url)); // token invalid
        }
    }

    if (freeEnterRoutes.some((route) => pathname.startsWith(route))) {
        // if you want to select store, you have to have userId with you
        try {
            const { userId, storeId } = await getDecryptedCookie("authToken");
            // there is userId and storeId and user is tring to register or login
            if (userId && storeId) {
                if (pathname === "/auth/login" || pathname === "/auth/signup") {
                    // redirect to app
                    return NextResponse.redirect(new URL("/app", request.url));
                }
            } else if (userId && !storeId) {
                // if userId and no storeId, redirect to store-select
                if (pathname !== "/auth/store-select") {
                    return NextResponse.redirect(
                        new URL("/auth/store-select", request.url)
                    );
                }
            }
        } catch (error) {
            return NextResponse.next();
        }
    }
    return NextResponse.next();
}
