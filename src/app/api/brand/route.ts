import { getCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { NewBrandInterface } from "@/model/brand.interface";

export async function GET(): Promise<Response> {
    const { storeId } = await getCookie("storeData");
    if (!storeId) {
        return Response.json(
            { message: "Store ID not found" },
            { status: 400 }
        );
    }
    const sql = `
        SELECT
            pb.id AS "id",
            pb.name AS "name",
            pc.name AS "category",
            pb.detail AS "detail",
            pb.created_at AS "createdAt",
            pb.updated_at AS "updatedAt",
            creator.name AS "createdBy",
            updator.name AS "updatedBy"
        FROM
            product_brand pb
        JOIN product_category pc ON
            pb.product_category_id = pc.id
        JOIN "user" creator ON
            creator.id = pc.created_by
        JOIN "user" updator ON
            updator.id = pc.updated_by
        WHERE
            pc.store_id = $1;`;
    try {
        const query = await db.query(sql, [storeId]);
        if (!query.rowCount) {
            return Response.json({ message: "Failed to fetch brand data" });
        }
        const categories = query.rows;
        return Response.json(
            { message: "Fetch brand data success", data: categories },
            { status: 200 }
        );
    } catch (error) {
        console.error("api/brand/route.ts", error);
        return Response.json(
            { message: "Error fetching brand data", error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request): Promise<Response> {
    const newBrand: NewBrandInterface = await request.json();
    if (!newBrand) {
        return Response.json(
            { message: "Brand data is required" },
            { status: 400 }
        );
    }

    const { userId } = await getCookie("session");
    console.log("userId", userId);
    if (!userId) {
        return Response.json(
            { message: "User not authenticated" },
            { status: 401 }
        );
    }

    const { storeId } = await getCookie("storeData");
    console.log("storeId", storeId);
    if (!storeId) {
        return Response.json({ message: "Store not found" }, { status: 404 });
    }

    const sql = `
		INSERT
		INTO
		product_brand (
			id,
			"name",
			product_category_id,
			detail,
			created_at,
			updated_at,
			store_id,
			created_by,
			updated_by)
		VALUES (
			$1,
			$2,
			$3,
			$4,
			now(),
			now(),
			$5,
			$6,
			$6);`;
    try {
        const query = await db.query(sql, [
            newBrand.id,
            newBrand.name,
            newBrand.categoryId,
            newBrand.detail,
            storeId,
            userId,
        ]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Failed to create brand" },
                { status: 500 }
            );
        }

        return Response.json(
            { message: "Brand created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating brand", error);
        return Response.json(
            { message: "Error creating brand", error },
            { status: 500 }
        );
    }
}
