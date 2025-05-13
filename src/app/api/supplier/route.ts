import { db } from "@/lib/db";
import { createSupplierSql, getSupplierSql } from "./sql";
import { getDecryptedCookie } from "@/lib/cookie";
import { NewSupplierInterface } from "@/model/supplier.interface";
import { handleApiError } from "@/lib/handleApiError";

export async function GET() {
    const { storeId } = await getDecryptedCookie("authToken");

    try {
        const query = await db.query(getSupplierSql, [storeId]);

        if (!query.rowCount) {
            return Response.json(
                { message: "Fetch supplier data success but dataset is empty" },
                { status: 200 }
            );
        }

        return Response.json(
            { message: "Fetch supplier data success", data: query.rows },
            { status: 200 }
        );
    } catch (error) {
        console.error("api/supplier/route.ts/GET", error);
        return Response.json(
            { message: "Error fetching supplier data", error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const { userId, storeId } = await getDecryptedCookie("authToken");
    const body: NewSupplierInterface = await request.json();
    const { id, name, surname, email, phoneNumber, address } = body;
    try {
        const query = await db.query(createSupplierSql, [
            id,
            name,
            surname,
            email,
            phoneNumber,
            address,
            storeId,
            userId,
        ]);
        if (!query.rowCount) {
            throw new Error("Failed to create supplier data");
        }
        return Response.json(
            { message: "Create supplier data success", data: query.rows },
            { status: 201 }
        );
    } catch (error) {
        console.error("api/supplier/route.ts/POST", error);
        return handleApiError(error);
    }
}
