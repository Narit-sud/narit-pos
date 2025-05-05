import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/token";
<<<<<<< HEAD
import { off } from "process";
import { getDecryptedCookie } from "./lib/cookie";
=======
import { getCookie } from "@/lib/cookie";
>>>>>>> 2418357bcb458291bcba1319560b07daf812c64a

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

const afterLoginRoutes = ["/app/store", "/api/store", "/api/store/select"];

const protectedRoutes = ["/app"];

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl;

    // public routes always accessible
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }
<<<<<<< HEAD
    // protected routes that need authentication
=======

    // semi-protected Routes
    if (afterLoginRoutes.some((route) => pathname.startsWith(route))) {
        const authToken = await getCookie("authToken");
        console.log("authToken", authToken);
        if (authToken) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    console.log("This route is protected", pathname);

    // protected routes
>>>>>>> 2418357bcb458291bcba1319560b07daf812c64a
    if (pathname.startsWith("/app")) {
        console.log("Middleware is running at " + pathname);
        const authToken = await getDecryptedCookie("authToken");
        if (!authToken) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
<<<<<<< HEAD
        return NextResponse.next();
=======

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
            return NextResponse.next();
        }

        return response;
>>>>>>> 2418357bcb458291bcba1319560b07daf812c64a
    }

    // not matching any route
    return NextResponse.redirect(new URL("/auth/login", request.url));
}
