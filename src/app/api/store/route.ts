import { createBrandSql } from "@/app/api/brand/sql";
import { createCategorySql } from "@/app/api/category/sql";
import type { NewStoreInterface } from "@/app/app/store/interface";
import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { createCustomerSql } from "../customer/sql";
import {
    addOwnerPermissionSql,
    addDefaultPaymentMethodSql,
    createNewStoreSql,
    getStoreDataSql,
    createDefaultCustomerSql,
    createDefaultSupplierSql,
    createDefaultBrandSql,
    createDefaultCategorySql,
} from "./sql";
import { handleApiError } from "@/lib/handleApiError";
import { convertToThailandTime } from "@/lib/convertTime";

/**
 * /api/store/GET
 * return every store that the user is authorized to access.
 * @User must be logged in to access this endpoint.
 * @return: { message: string, data: StoreInterface[]},{status: number}
 * @throws: { message: string, error: any }
 * */
export async function GET() {
    const authToken = await getDecryptedCookie("authToken"); // get authToken this will be surely exist because of middleware
    try {
        const query = await db.query(getStoreDataSql, [authToken.userId]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Fetch store data success but dataset is empty" },
                { status: 200 }
            );
        }
        const stores = query.rows.map((store) => ({
            id: store.id,
            name: store.name,
            createdAt: convertToThailandTime(store.created_at),
            updatedAt: convertToThailandTime(store.updated_at),
        }));
        return Response.json(
            {
                message: "Get store data success",
                data: query.rows,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Error fetching store data",
            error instanceof Error ? error.message : error
        );
        return Response.json(
            { message: "Error fetching store data", error },
            { status: 500 }
        );
    }
}

/**
 * /api/store/POST
 * create a new store and assign the user to the store with owner permission.
 */
export async function POST(request: Request): Promise<Response> {
    const newStore: NewStoreInterface = await request.json();
    // user login validation is success at middleware
    // TODO: validate newStore data
    // TODO: validate user permission
    // TODO: insert into store table
    // TODO: insert into store_permission table

    const client = await db.connect();
    try {
        const authToken = await getDecryptedCookie("authToken");
        if (!authToken || !authToken.userId || !newStore.id) {
            return Response.json(
                {
                    message:
                        "User authentication failed during creating store.",
                },
                { status: 401 }
            );
        }
        const { userId } = authToken;
        const storeId = newStore.id;
        const categoryId = uuidv4();
        const brandId = uuidv4();

        await client.query("BEGIN");
        await client.query(createNewStoreSql, [storeId, newStore.name, userId]);
        await client.query(addOwnerPermissionSql, [userId, storeId]);
        await client.query(createDefaultCategorySql, [
            categoryId,
            userId,
            storeId,
        ]);
        await client.query(createDefaultBrandSql, [
            brandId,
            categoryId,
            storeId,
            userId,
        ]);
        await client.query(createDefaultCustomerSql, [storeId, userId]);
        await client.query(createDefaultSupplierSql, [storeId, userId]);
        await client.query(addDefaultPaymentMethodSql, [storeId]);
        await client.query("COMMIT");
        // get and re-send  store data
        const query3 = await client.query(getStoreDataSql, [userId]);
        if (!query3.rowCount) {
            return Response.json(
                { message: "Fetching store data after store creation failed" },
                { status: 404 }
            );
        }
        return Response.json(
            { message: "Store created successfully", data: query3.rows },
            { status: 201 }
        );
    } catch (error) {
        await client.query("ROLLBACK");
        return handleApiError(error);
    } finally {
        client.release();
    }
}
