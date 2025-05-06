import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";

export async function PUT(
    request: Request,
    { params }: { params: { categoryId: string } }
) {
    const categoryId = params.categoryId;
    const { name, detail } = await request.json();
    const { userId } = await getDecryptedCookie("authToken");

    const sql = `
		UPDATE
			product_category
		SET
			"name" = $1,
			detail = $2,
			updated_at = now(),
			updated_by = $3
		WHERE
			id = $4;`;
    try {
        const query = await db.query(sql, [name, detail, userId, categoryId]);
        if (!query.rowCount) {
            return Response.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }
        return Response.json(
            { message: "Category updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            { error: "Error updating category" },
            { status: 500 }
        );
    }
}
