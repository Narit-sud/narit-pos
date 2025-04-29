import { cookies } from "next/headers";
import { decrypt } from "@/_lib/session";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/_lib/db";
import { getCookie, setCookie } from "@/_lib/cookie";
import type { StoreInterface } from "@/app/store/interface";

export async function GET(request: Request) {
    const session = await getCookie("session");
    const userId = session?.userId;
    if (!userId) {
        return Response.json(
            {
                message:
                    "User authentication failed during fetching store data",
            },
            { status: 404 }
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
    try {
        const query = await db.query(sql, [userId]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Store not found" },
                { status: 404 }
            );
        }
        const store = query.rows[0];
        console.log(store);
        setCookie("store", store);
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

export async function POST(request: Request) {
    // get user credencials
    const session = await getCookie("session");
    let userIdFromSession;
    if (session) {
        userIdFromSession = session.userId;
    }
    if (!userIdFromSession) {
        return Response.json(
            {
                message:
                    "User authentication failed during creating new store.",
            },
            { status: 401 }
        );
    }
    // get body data
    const newStore: StoreInterface = await request.json();
    // validate data
    if (!newStore.id) newStore.id = uuidv4();
    if (!newStore.name || newStore.name.length < 3) {
        return Response.json(
            {
                message: "Name is required to be more than 3 charactors",
            },
            { status: 400 }
        );
    }
    const sql1 = `insert into "store" (id, name, created_by, updated_by) values ($1, $2, $3, $4)`;
    const sql2 = ` insert into "store_user (user_id, store_id, permission) values ($1, $2, 'owner')`;
    const client = await db.connect();
    try {
        await client.query("begin");
        const query1 = await client.query(sql1, [
            newStore.id,
            newStore.name,
            userIdFromSession,
            userIdFromSession,
        ]);
        const query2 = await client.query(sql2, [
            userIdFromSession,
            newStore.id,
        ]);
        await client.query("commit");
        return Response.json(
            { message: "Store created successfully" },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            { message: "Error creating store", error },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
