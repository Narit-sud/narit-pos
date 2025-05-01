import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = [
    "/store",
    "/store/new",
    "/store/edit",
    "/pos",
    "/settings",
    "/api/store/",
];

// Routes that are publicly accessible
const publicRoutes = ["/", "/auth/login", "/auth/signup", "/about"];

export async function middleware(request: NextRequest) {
    console.log("Middleware triggered");
    const session = request.cookies.get("session");
    const { pathname } = request.nextUrl;
    console.log("path name", pathname);
    console.log(
        "include?",
        protectedRoutes.some((route) => pathname.includes(route))
    );
    console.log(
        "startsWith?",
        protectedRoutes.some((route) => pathname.startsWith(route))
    );

    // Check if route requires authentication
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        console.log("Middleware entered protected route check");
        // If no session exists, redirect to login
        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
            return NextResponse.json(
                { error: "Session not found" },
                { status: 401 }
            );
        }
        // Allow access to public routes without authentication
        if (publicRoutes.some((route) => pathname.startsWith(route))) {
            console.log("Middleware entered public route check");
            return NextResponse.next();
        }
        try {
            // If session exists but is invalid/expired, clear cookies and redirect to login
            if (session.value === "") {
                const response = NextResponse.redirect(
                    new URL("/auth/login", request.url)
                );
                response.cookies.delete("session");
                return response;
            }

            // Valid session, allow access
            return NextResponse.next();
        } catch (error) {
            // On any error, redirect to login
            const response = NextResponse.redirect(
                new URL("/auth/login", request.url)
            );
            response.cookies.delete("session");
            return response;
        }
    }

    // For all other routes, continue
    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
