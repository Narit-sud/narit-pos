import { db } from "@/lib/db";
import { getDecryptedCookie } from "@/lib/cookie";
import { CustomerInterface } from "@/model/customer.interface";
import { updateCustomerSql } from "../sql";

export async function PUT(request: Request): Promise<Response> {
    const { userId, storeId } = await getDecryptedCookie("authToken");
    const body: CustomerInterface = await request.json();
    try {
        const { id, name, surname, email, phoneNumber, address } = body;
        const query = await db.query(updateCustomerSql, [
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
            throw new Error("Failed to update customer data");
        }
        return Response.json(
            { message: "Update customer data success", data: query.rows },
            { status: 200 }
        );
    } catch (error) {
        console.error("api/customer/[customerId]/route.ts/PUT", error);
        return Response.json(
            { message: "Error fetching store data", error },
            { status: 500 }
        );
    }
}
