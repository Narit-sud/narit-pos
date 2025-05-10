import { db } from "@/lib/db";
import { createCustomerSql, getCustomerSql } from "./sql";
import { getDecryptedCookie } from "@/lib/cookie";
import { NewCustomerInterface } from "@/model/customer.interface";

export async function GET() {
    const { storeId } = await getDecryptedCookie("authToken");

    try {
        const query = await db.query(getCustomerSql, [storeId]);

        if (!query.rowCount) {
            return Response.json(
                { message: "Fetch customer data success but dataset is empty" },
                { status: 200 }
            );
        }

        return Response.json(
            { message: "Fetch customer data success", data: query.rows },
            { status: 200 }
        );
    } catch (error) {
        console.error("api/customer/route.ts/GET", error);
        return Response.json(
            { message: "Error fetching customer data", error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const { userId, storeId } = await getDecryptedCookie("authToken");
    const body: NewCustomerInterface = await request.json();
    const { id, name, surname, email, phoneNumber, address } = body;
    try {
        const query = await db.query(createCustomerSql, [
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
            throw new Error("Failed to create customer data");
        }
        return Response.json(
            { message: "Create customer data success", data: query.rows },
            { status: 201 }
        );
    } catch (error) {
        console.error("api/customer/route.ts/POST", error);
        return Response.json(
            { message: "Error creating customer data", error },
            { status: 500 }
        );
    }
}
