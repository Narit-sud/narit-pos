import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { updateBrandSql } from "../sql";
import { isDefaultBrand } from "@/lib/query/isDefaultEntry";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ brandId: string }> }
) {
    const { brandId } = await params;
    try {
        const { name, detail, categoryId } = await request.json();
        const { userId, storeId } = await getDecryptedCookie("authToken");
        if (await isDefaultBrand(storeId as string, brandId)) {
            return Response.json(
                { error: "Default brand cannot be updated" },
                { status: 400 }
            );
        }
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
