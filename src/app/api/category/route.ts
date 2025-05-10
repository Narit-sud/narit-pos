import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { createCategorySql, getCategorySql } from "./sql";

export async function GET(): Promise<Response> {
    const { storeId } = await getDecryptedCookie("authToken");
    try {
        const query = await db.query(getCategorySql, [storeId]);
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
    const { userId, storeId } = await getDecryptedCookie("authToken");
    try {
        const query = await db.query(createCategorySql, [
            id,
            name,
            detail,
            userId,
            storeId,
        ]);
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
