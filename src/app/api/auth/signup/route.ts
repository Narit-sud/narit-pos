import { db } from "@/lib/db";
import { hashPassword } from "@/lib/encrypt";
import { signupSql } from "./sql";
import { constraints } from "@/app/api/auth/signup/constraints";
import { handleConstraintError } from "@/lib/query/handleConstraintError";

export async function POST(request: Request): Promise<Response> {
    const signupData = await request.json();
    const { id, name, surname, username, password, email, phoneNumber } =
        signupData;
    const hashedPassword = hashPassword(password);

    try {
        const query = await db.query(signupSql, [
            id,
            name.trim(),
            surname.trim(),
            username.trim(),
            hashedPassword,
            email.trim(),
            phoneNumber.trim(),
        ]);
        if (!query.rowCount) {
            return Response.json(
                { message: "Signup new user failed" },
                { status: 400 }
            );
        }
        return Response.json(
            { message: "Signup new user success" },
            { status: 201 }
        );
    } catch (error) {
        return handleConstraintError(error, constraints, "api/auth/signup");
    }
}
