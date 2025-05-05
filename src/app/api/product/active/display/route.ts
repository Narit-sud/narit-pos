import { db } from "@/lib/db";
import { getDecryptedCookie } from "@/lib/cookie";

export async function GET(request: Request): Promise<Response> {
    const sql = `
		SELECT
			pv.id AS "id",
			pb.name AS "brand", 
			pc.name AS "category",
			pv.name AS "name",
			pv.price AS "price",
			pv.cost AS "cost",
			pv.detail AS "detail",
			pv.updated_at AS "updatedAt",
			pv.updated_by AS "updatedBy",
			pv.created_at AS "createdAt",
			pv.created_by AS "createdBy"
		FROM
			product_variant pv
		JOIN "user" creator ON
			pv.created_by = creator.id
		JOIN "user" updator ON
			pv.updated_by = updator.id
		JOIN product_brand pb ON
			pv.id = pv.product_brand_id
		JOIN product_category pc ON
			pc.id = pb.product_category_id
		WHERE
			pv.store_id = $1 
			AND pv.status = '1'`;
    try {
        const { storeId } = await getDecryptedCookie("authToken");
        const query = await db.query(sql, [storeId]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Product not found" },
                { status: 404 },
            );
        }
        return Response.json(
            { message: "Get product data success", data: query.rows },
            { status: 200 },
        );
    } catch (error) {
        console.error("api/product/active/display/route.ts", error);
        return Response.json(
            { message: "Error fetching product data", error },
            { status: 500 },
        );
    }
}
