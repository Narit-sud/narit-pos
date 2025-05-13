import { db } from "@/lib/db";
import { getDecryptedCookie } from "@/lib/cookie";
import { SupplierInterface } from "@/model/supplier.interface";
import { updateSupplierSql } from "../sql";

export async function PUT(request: Request): Promise<Response> {
    const { userId, storeId } = await getDecryptedCookie("authToken");
    const body: SupplierInterface = await request.json();
    try {
        const { id, name, surname, email, phoneNumber, address } = body;
        const query = await db.query(updateSupplierSql, [
            name,
            surname,
            email,
            address,
            phoneNumber,
            userId,
            id,
            storeId,
        ]);
        if (!query.rowCount) {
            throw new Error("Failed to update supplier data");
        }
        return Response.json(
            { message: "Update supplier data success", data: query.rows },
            { status: 200 }
        );
    } catch (error) {
        console.error("api/supplier/[supplierId]/route.ts/PUT", error);
        return Response.json(
            { message: "Error fetching store data", error },
            { status: 500 }
        );
    }
}
