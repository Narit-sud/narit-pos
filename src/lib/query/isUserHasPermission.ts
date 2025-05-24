import { db } from "@/lib/db";

type Permission = "Owner" | "Admin" | "User" | "Pending" | "Suspended";

export default async function isUserHasPermission(
    userId: string,
    storeId: string,
    permissionRequired: Permission
): Promise<boolean> {
    const sql = `
	SELECT sp.name as "permission"
	FROM store_user su
	JOIN store_permission sp ON sp.store_id = su.id
	WHERE su.user_id = $1
	AND su.store_id = $2
	`;
    try {
        const query = await db.query(sql, [userId, storeId]);
        if (query.rows[0].permission === permissionRequired) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}
