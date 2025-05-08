import { db } from "@/lib/db";
import { getDecryptedCookie } from "@/lib/cookie";
import { getProductSql } from "../../sql";

export async function GET(): Promise<Response> {
    const { storeId } = await getDecryptedCookie("authToken");
    try {
        const query = await db.query(getProductSql, [storeId]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Fetch product data success but dataset is empty" },
                { status: 200 }
            );
        }
        return Response.json(
            { message: "Get product data success", data: query.rows },
            { status: 200 }
        );
    } catch (error) {
        console.error("api/product/active/display/route.ts", error);
        return Response.json(
            { message: "Error fetching product data", error },
            { status: 500 }
        );
    }
}
