import { db } from "@/lib/db";
import { getCookie, getDecryptedCookie } from "@/lib/cookie";
import type {
    NewStoreInterface,
    StoreInterface,
} from "@/app/app/store/interface";
import { addOwnerPermissionSql, createNewStoreSql } from "@/lib/sql";

/**
 * /api/store/GET
 * return every store that the user is authorized to access.
 * @User must be logged in to access this endpoint.
 * @return: { message: string, data: StoreInterface[],status: number }
 * @throws: { message: string, error: any }
 * */
export async function GET(request: Request) {
<<<<<<< HEAD
    const session = await getCookie("authToken");
    const userId = session?.userId;
=======
    console.log("getting store data");
    const { userId } = await getCookie("authToken");
    console.log(userId);
>>>>>>> 2418357bcb458291bcba1319560b07daf812c64a
    if (!userId) {
        return Response.json(
            {
                message:
                    "User authentication failed during fetching store data",
            },
            { status: 401 }
        );
    }
    const sql = `
        select
            s.id as "id",
            s.name as "name",
            sp.name as "permission",
            s.created_at as "createdAt",
            s.updated_at as "updatedAt",
            creator.username as "createdBy",
            updater.username as "updatedBy"
        from
            store s
        join store_user su on
            s.id = su.store_id
        join store_permission sp on
            su.permission_id = sp.id
        join "user" creator on
            creator.id = s.created_by_user_id
        left join "user" updater on
            updater.id = s.updated_by_user_id
        where
            su.user_id = $1`;
    const client = await db.connect();
    try {
        await client.query("BEGIN");
        const query1 = await client.query(sql, [userId]);
        if (!query1.rowCount) {
            return Response.json(
                { message: "Store not found" },
                { status: 404 }
            );
        }
        await client.query("ROLLBACK");

        const query2 = await client.query(addOwnerPermissionSql, [userId]);
        if (!query2.rowCount) {
            return Response.json(
                { message: "Store not found" },
                { status: 404 }
            );
        }
        await client.query("ROLLBACK");

        return Response.json(
            {
                message: "Get store data success",
                data: query1.rows,
            },
            { status: 200 }
        );
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(
            "Error fetching store data",
            error instanceof Error ? error.message : error
        );
        return Response.json(
            { message: "Error fetching store data", error },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}

/**
 * /api/store/POST
 * create a new store and assign the user to the store with owner permission.
 */
export async function POST(request: Request): Promise<Response> {
    const newStore: NewStoreInterface = await request.json();

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

        const query = await db.query(createNewStoreSql, [
            newStore.id,
            newStore.name,
            userId,
        ]);

        if (!query.rowCount) {
            return Response.json(
                { message: "Store not created" },
                { status: 404 }
            );
        }

        return Response.json(
            { message: "Store created successfully" },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            {
                message: "User authentication failed during creating store.",
                error,
            },
            { status: 401 }
        );
    }
}
