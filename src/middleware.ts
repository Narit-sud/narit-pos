import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "./lib/cookie";

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
    return NextResponse.next();
    // public route
    // if (request.nextUrl.pathname.startsWith("/auth")) {
    //     return NextResponse.next();
    // }
    // // check if user is authenticated
    // try {
    //     const { userId } = await getCookie("session");
    //     const { storeId } = await getCookie("storeData");
    //     console.log(userId, storeId);
    //     if (userId && storeId) {
    //         const next = NextResponse.next();
    //         next.headers.set("userId", JSON.stringify(userId));
    //         next.headers.set("storeId", JSON.stringify(storeId));
    //         console.log(next);
    //         return next;
    //     }
    // } catch (error) {
    //     return NextResponse.redirect(new URL("/auth/login", request.url));
    // }
    // return NextResponse.redirect(new URL("/auth/login", request.url));
}
