import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { updateBrandSql } from "../sql";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ brandId: string }> }
) {
    const { brandId } = await params;
    const { name, detail, categoryId } = await request.json();
    const { userId } = await getDecryptedCookie("authToken");
    try {
        const query = await db.query(updateBrandSql, [
            name,
            categoryId,
            detail,
            userId,
            brandId,
        ]);
        if (!query.rowCount) {
            return Response.json({ error: "Brand not found" }, { status: 404 });
        }
        return Response.json(
            { message: "Brand updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating brand:", error);
        return Response.json(
            { error: "Error updating brand" },
            { status: 500 }
        );
    }
}
