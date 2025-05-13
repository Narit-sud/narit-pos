import { NextResponse } from "next/server";

export function handleApiError(error: any): NextResponse {
    console.error("API Error:", error);

    const status = error.statusCode || 500;

    return NextResponse.json(
        {
            error: {
                message: error.message || "Internal Server Error",
                name: error.name,
                code: error.code,
                stack:
                    process.env.NODE_ENV === "development"
                        ? error.stack
                        : undefined,
            },
        },
        { status }
    );
}
