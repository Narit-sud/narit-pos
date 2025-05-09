import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";

export async function GET(): Promise<Response> {
    const { storeId } = await getDecryptedCookie("authToken");
    if (!storeId) {
        return Response.json(
            { message: "Store ID not found" },
            { status: 400 }
        );
    }
    const sql = `
        SELECT
            pc.id AS "id",
            pc.name AS "name",
            pc.detail AS "detail",
            pc.created_at AS "createdAt",
            pc.updated_at AS "updatedAt",
            creator.name AS "createdBy",
            updator.name AS "updatedBy"
        FROM
                product_category pc
        JOIN "user" creator ON
                creator.id = pc.created_by
        JOIN "user" updator ON
                updator.id = pc.updated_by
        WHERE
            pc.store_id = $1
        ORDER BY
            pc.created_at ASC;`;
    try {
        const query = await db.query(sql, [storeId]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Fetch category data success but dataset is empty" },
                { status: 200 }
            );
        }
        return Response.json(
            { message: "Fetch category data success", data: query.rows },
            { status: 200 }
        );
    } catch (error) {
        console.error("api/category/route.ts/GET", error);
        return Response.json(
            { message: "Error fetching store data", error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request): Promise<Response> {
    const newCategory = await request.json();
    const { id, name, detail } = newCategory;
    const { userId } = await getDecryptedCookie("authToken");
    if (!userId) {
        return Response.json(
            { message: "User not authenticated" },
            { status: 401 }
        );
    }
    const { storeId } = await getDecryptedCookie("authToken");
    // check if user has permission to create category (not pending or restricted)
    if (!storeId) {
        return Response.json(
            { message: "Store ID not found" },
            { status: 400 }
        );
    }
    const sql = `
        INSERT
        INTO
        product_category(
            id,
            "name",
            detail,
            created_at,
            updated_at,
            created_by,
            updated_by,
            store_id)
        VALUES(
            $1,
            $2,
            $3,
            now(),
            now(),
            $4,
            $4,
            $5);
`;
    try {
        const query = await db.query(sql, [id, name, detail, userId, storeId]);
        if (!query.rowCount) {
            return Response.json({ message: "Failed to create new category" });
        }
        return Response.json(
            { message: "Create new category success." },
            { status: 201 }
        );
    } catch (error) {
        console.error("api/category/route.ts/POST", error);
        return Response.json(
            { message: "Error creating new category", error },
            { status: 500 }
        );
    }
}
