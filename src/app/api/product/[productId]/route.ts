import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import {
    getCurrentStockSql,
    updateProductSql,
    decrementStockSql,
    incrementStockSql,
} from "../sql";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ productId: string }> }
) {
    const { productId } = await params;
    const {
        name,
        brandId,
        detail,
        stock: updatedStock,
        price,
        cost,
    } = await request.json();
    const { userId, storeId } = await getDecryptedCookie("authToken");
    const client = await db.connect();
    try {
        // get current stock of the product_variant table
        const { currentStock } = (
            await client.query(getCurrentStockSql, [productId])
        ).rows[0];
        // update product data
        await db.query(updateProductSql, [
            name,
            brandId,
            price,
            cost,
            detail,
            userId,
            productId,
            storeId,
        ]);
        // increase stock if current stock is greater than stock
        if (currentStock < updatedStock) {
            await client.query(incrementStockSql, [
                productId,
                updatedStock - currentStock,
                (updatedStock - currentStock) * price,
                storeId,
            ]);
        }
        // decrease stock if current stock is less than stock
        else if (currentStock > updatedStock) {
            await client.query(decrementStockSql, [
                productId,
                currentStock - updatedStock,
                (currentStock - updatedStock) * price,
                storeId,
            ]);
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
