import { getCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { NewBrandInterface } from "@/model/brand.interface";

export async function GET():Promise<Response>{
    const { storeId } = await getCookie("storeData");
    if (!storeId) {
        return Response.json({ message: "Store not found" }, { status: 404 });
    }
    const 
   const sql = `` 
try {

} catch (error) {
    
}
}

export async function POST(request: Request): Promise<Response> {
    const newBrand: NewBrandInterface = await request.json();
    if (!newBrand) {
        return Response.json(
            { message: "Brand data is required" },
            { status: 400 },
        );
    }

    const { userId } = await getCookie("session");
    console.log("userId", userId);
    if (!userId) {
        return Response.json(
            { message: "User not authenticated" },
            { status: 401 },
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
                { status: 500 },
            );
        }

        return Response.json(
            { message: "Brand created successfully" },
            { status: 201 },
        );
    } catch (error) {
        console.error("Error creating brand", error);
        return Response.json(
            { message: "Error creating brand", error },
            { status: 500 },
        );
    }
}
