import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { updateCategorySql } from "../sql";
import { isDefaultCategory } from "@/lib/query/isDefaultEntry";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ categoryId: string }> }
) {
    const { categoryId } = await params;
    const { name, detail } = await request.json();

    try {
        const { userId, storeId } = await getDecryptedCookie("authToken");
        if (await isDefaultCategory(storeId as string, categoryId)) {
            return Response.json(
                { error: "Default category cannot be updated" },
                { status: 400 }
            );
        }
        const query = await db.query(updateCategorySql, [
            name,
            detail,
            userId,
            categoryId,
        ]);
        if (!query.rowCount) {
            return Response.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }
        return Response.json(
            { message: "Category updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating category:", error);
        return Response.json(
            { error: "Error updating category" },
            { status: 500 }
        );
    }
}
