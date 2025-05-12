import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { NewBrandInterface } from "@/model/brand.interface";
import { createBrandSql, getBrandSql } from "./sql";

export async function GET(): Promise<Response> {
    const { storeId } = await getDecryptedCookie("authToken");
    if (!storeId) {
        return Response.json(
            { message: "Store ID not found" },
            { status: 400 }
        );
    }

    try {
        const query = await db.query(getBrandSql, [storeId]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Fetch brand data success but dataset is empty" },
                { status: 200 }
            );
        }
        return Response.json(
            { message: "Fetch brand data success", data: query.rows },
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

    const { userId } = await getDecryptedCookie("authToken");
    if (!userId) {
        return Response.json(
            { message: "User not authenticated" },
            { status: 401 }
        );
    }

    const { storeId } = await getDecryptedCookie("authToken");
    console.log("storeId", storeId);
    if (!storeId) {
        return Response.json({ message: "Store not found" }, { status: 404 });
    }

    try {
        const query = await db.query(createBrandSql, [
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
