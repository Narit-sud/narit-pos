import { db } from "@/lib/db";
import type { NewProductInterface } from "@/model/product.interface";

export async function GET(request: Request): Promise<Response> {
    const { name, brandId, price, cost } =
        (await request.json()) as NewProductInterface;
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
                gen_random_uuid(),-- id
                '',-- name
                ?,-- brandId
                0,-- price
                0,-- cost
                '',--detail
                now(),-- createdAt
                now(),-- updatedAt
                ?,-- storeId
                1,-- status
                ?,-- createdBy
                ?-- updatedBy
            );`;
    const client = await db.connect();
    try {
        await client.query("begin");
        const create = await client.query(sql1, []);
        const initializeQty = await client.query(sql2, []);
        await client.query("commit");
    } catch (error) {
        await client.query("rollback");
    } finally {
        client.release();
    }
}
