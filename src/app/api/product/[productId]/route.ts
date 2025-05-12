import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { updateProductSql } from "../sql";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ productId: string }> }
) {
    const { productId } = await params;
    const { name, detail, categoryId } = await request.json();
    const { userId } = await getDecryptedCookie("authToken");
    try {
        // update brand data in pv table
        // get old stock qty from product_incoming and product_outgoing table
        // update stock qty by updating product_incoming and product_outgoing table
        const query = await db.query(updateProductSql, [
            name,
            categoryId,
            detail,
            userId,
            productId,
        ]);
        if (!query.rowCount) {
            return Response.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }
        return Response.json(
            { message: "Product updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating product:", error);
        return Response.json(
            { error: "Error updating product" },
            { status: 500 }
        );
    }
}
