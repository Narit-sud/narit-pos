import { createProductSql, incrementStockSql } from "@/app/api/product/sql";
import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import {
    validateProduct,
    type NewProductInterface,
} from "@/model/product.interface";
import { v4 as uuidv4 } from "uuid";

/**
 * this route is used to create a new product and set the initial value to the product
 * @param request to extract product data
 * @returns response to client
 */
export async function POST(request: Request): Promise<Response> {
    const newProduct: NewProductInterface = await request.json();
    const {
        id: prodId,
        name,
        brandId,
        price,
        cost,
        stock,
        detail,
    } = newProduct;
    const { userId, storeId } = await getDecryptedCookie("authToken");

    const client = await db.connect();
    try {
        validateProduct(newProduct);
        await client.query("begin");
        // create product
        await client.query(createProductSql, [
            prodId,
            name,
            brandId,
            price,
            cost,
            detail,
            storeId,
            userId,
        ]);
        // add product stock
        if (stock > 0) {
            await client.query(incrementStockSql, [
                prodId,
                stock,
                stock * price,
                storeId,
            ]);
        }
        await client.query("commit");
        return Response.json(
            { message: "Product created successfully" },
            { status: 201 }
        );
    } catch (error) {
        await client.query("rollback");
        console.error("Error creating product", error);
        if (error instanceof Error) {
            return Response.json(
                { message: error.message || "Error creating product" },
                { status: 400 }
            );
        } else {
            return Response.json(
                { message: "Error creating product", error },
                { status: 500 }
            );
        }
    } finally {
        client.release();
    }
}
