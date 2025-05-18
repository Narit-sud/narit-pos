import { getStorePermissionSql } from "@/app/api/employee/sql";
import { getDecryptedCookie } from "@/lib/cookie";
import { db } from "@/lib/db";
import { EmployeeInterface } from "@/model/employee.interface";
import { convertToThailandTime } from "@/lib/convertTime";

export async function GET() {
    try {
        const { storeId } = await getDecryptedCookie("authToken");
        const query = await db.query<EmployeeInterface>(getStorePermissionSql, [
            storeId,
        ]);
        const data = query.rows.map((row) => {
            return {
                ...row,
                joinedAt: convertToThailandTime(row.joinedAt),
                permissionSince: convertToThailandTime(row.permissionSince),
            };
        });
        return Response.json(
            {
                message: "Get employee permission list successfully",
                data,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                error: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}
