import { db } from "@/lib/db";
import { getDecryptedCookie } from "@/lib/cookie";
import type {
    NewStoreInterface,
    StoreInterface,
} from "@/app/app/store/interface";
import {
    addOwnerPermissionSql,
    createNewStoreSql,
    getStoreDataSql,
} from "@/lib/sql";

/**
 * /api/store/GET
 * return every store that the user is authorized to access.
 * @User must be logged in to access this endpoint.
 * @return: { message: string, data: StoreInterface[]},{status: number}
 * @throws: { message: string, error: any }
 * */
export async function GET(request: Request) {
    const authToken = await getDecryptedCookie("authToken"); // get authToken this will be surely exist because of middleware
    try {
        const query = await db.query(getStoreDataSql, [authToken.userId]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Fetch store data success but dataset is empty" },
                { status: 200 }
            );
        }

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
    console.log("newStore", newStore);
    // user login validation is success at middleware
    // TODO: validate newStore data
    // TODO: validate user permission
    // TODO: insert into store table
    // TODO: insert into store_permission table

    const client = await db.connect();
    try {
        const authToken = await getDecryptedCookie("authToken");
        if (!authToken) {
            return Response.json(
                {
                    message:
                        "User authentication failed during creating store.",
                },
                { status: 401 }
            );
        }
        const { userId } = authToken;

        // create new store
        await client.query("BEGIN");
        const query = await client.query(createNewStoreSql, [
            newStore.id,
            newStore.name,
            userId,
        ]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Store creation failed" },
                { status: 404 }
            );
        }

        // add permission
        const query2 = await client.query(addOwnerPermissionSql, [
            userId,
            newStore.id,
        ]);
        if (!query2.rowCount) {
            return Response.json(
                { message: "Add permission failed" },
                { status: 404 }
            );
        }
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
        console.error(error);
        // if store name duplicate
        if (
            typeof error === "object" &&
            error &&
            "detail" in error &&
            typeof error.detail === "string"
        ) {
            if (error.detail.includes("already exists")) {
                return Response.json(
                    { message: "This store name already exists" },
                    { status: 409 }
                );
            }
        }
        return Response.json(
            {
                message: "Unexpected error during creating store",
                error,
            },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
