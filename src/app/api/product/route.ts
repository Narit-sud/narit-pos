import { createProductSql, incrementStockSql } from "@/app/api/product/sql";
import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import type { NewProductInterface } from "@/model/product.interface";
import { v4 as uuidv4 } from "uuid";

/**
 * this route is used to create a new product and set the initial value to the product
 * @param request to extract product data
 * @returns response to client
 */
export async function POST(request: Request): Promise<Response> {
    const {
        id: prodId,
        name,
        brandId,
        price,
        cost,
        initialQuantity,
        detail,
    } = (await request.json()) as NewProductInterface;
    const { userId, storeId } = await getDecryptedCookie("authToken");
    const productIncomingId = uuidv4();

    // add record to procurement table
    const sql2 = `
        INSERT
        INTO procurement (
            id,
            is_delivered,
            is_paid,
            paid_by,
            created_at,
            created_by_user_id,
            updated_at,
            updated_by_user_id,
            store_id,
            detail
        )
        VALUES(
            $1, -- id
            TRUE, -- is_delivered
            TRUE, -- is_paid
            'none', -- paid_by
            now(), -- created_at
            $2, -- created_by_user_id
            now(), -- updated_at
            $2, -- updated_by_user_id
            $3, -- store_id
            'stock adjustment'::CHARACTER VARYING -- detail
        );`;
    // add record item to procurement_product_variant table
    const sql3 = `
        INSERT
        INTO procurement_product_variant (
            procurement_id,
            product_variant_id,
            qty,
            total,
            created_at,
            updated_at,
            store_id
        )
        VALUES(
            $1, -- procurement_id
            $2, -- product_variant_id
            $3, -- qty
            $4, -- total
            now(), -- created_at
            now(), -- updated_at
            $5 -- store_id
        );
`;
    const client = await db.connect();
    try {
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
        if (initialQuantity > 0) {
            await client.query(incrementStockSql, [
                prodId,
                initialQuantity,
                initialQuantity * price,
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
        return Response.json(
            { message: "Error creating product", error },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
