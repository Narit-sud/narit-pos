import {
    getDefaultCustomer,
    insertSaleBody,
    insertSaleHeader,
} from "@/app/api/sale/sql";
import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { SaleInterface } from "@/model/sale.interface";

export async function POST(request: Request): Promise<Response> {
    const body = await request.json();
    const { storeId, userId } = await getDecryptedCookie("authToken");
    let { items, customerId, paymentMethod, detail, total }: SaleInterface =
        body;
    // if customerId is not provided, get the default customer
    if (!customerId) {
        const query = await db.query(getDefaultCustomer, [storeId]);
        customerId = query.rows[0].id;
    }
    const client = await db.connect();
    try {
        await client.query("BEGIN");
        // create sale header
        const newSaleId = (
            await client.query(insertSaleHeader, [
                detail, // $1
                userId, // $2
                customerId, // $3
                storeId, // $4
            ])
        ).rows[0].id;
        // add items into body
        await Promise.all(
            items.map((item) => {
                return client.query(insertSaleBody, [
                    item.product.id,
                    newSaleId,
                    item.quantity,
                    item.totalPrice,
                    storeId,
                ]);
            })
        );
        await client.query("COMMIT");
        return new Response(
            JSON.stringify({ message: "Payment processed successfully" }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error processing payment:", error);
        if (error instanceof Error) {
            return Response.json(
                { message: error.message || "Error processing payment" },
                { status: 500 }
            );
        }
        return Response.json({ message: "Unexpected error" }, { status: 500 });
    } finally {
        client.release();
    }
}
