import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import type { NewProductInterface } from "@/model/product.interface";

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
    const procurementId = uuidv4();
    // add product to product_variant_table
    const sql1 = `
        INSERT
        INTO product_variant (
            id,
            "name",
            product_brand_id,
            price,
            "cost",
            detail,
            created_at,
            updated_at,
            store_id,
            status,
            created_by,
            updated_by
        )
        VALUES (
            $1, -- id
            $2, -- name
            $3, -- brandId
            $4, -- price
            $5, -- cost
            $6, --detail
            now(), -- createdAt
            now(), -- updatedAt
            $7, -- storeId
            1, -- status
            $8, -- createdBy
            $8 -- updatedBy
        );`;
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
        // product_variant table
        const q1 = await client.query(sql1, [
            prodId,
            name,
            brandId,
            price,
            cost,
            detail,
            storeId,
            userId,
        ]);
        if (initialQuantity > 0) {
            // procurement table
            const q2 = await client.query(sql2, [
                procurementId,
                userId,
                storeId,
            ]);
            console.log("q2", q2);
            // procurement_product_variant table
            const q3 = await client.query(sql3, [
                procurementId,
                prodId,
                initialQuantity,
                cost * initialQuantity,
                storeId,
            ]);
            console.log("q3", q3);
        }
        await client.query("commit");
        return Response.json(
            { message: "Product created successfully" },
            { status: 201 },
        );
    } catch (error) {
        await client.query("rollback");
        console.error("Error creating product", error);
        return Response.json(
            { message: "Error creating product", error },
            { status: 500 },
        );
    } finally {
        client.release();
    }
}
