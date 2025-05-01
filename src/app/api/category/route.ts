import { db } from "@/lib/db";

export async function POST(request: Request): Promise<Response> {
    const newCategory = await request.json();
    const sql = `
`;
    try {
        const query = await db.query(sql, []);
        if (!query.rowCount) {
            return Response.json({ message: "Failed to create new category" });
        }
        return Response.json(
            { message: "Create new category success." },
            { status: 201 },
        );
    } catch (error) {
        console.error("api/category/route.ts", error);
        return Response.json(
            { message: "Error fetching store data", error },
            { status: 500 },
        );
    }
}
