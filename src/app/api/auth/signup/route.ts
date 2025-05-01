import { db } from "@/lib/db";
import { hashPassword } from "@/lib/encrypt";

export async function POST(request: Request) {
    const signupData = await request.json();
    const { id, name, surname, username, password, email, phoneNumber } =
        signupData;
    const hashedPassword = hashPassword(password);
    const query = `
    INSERT INTO 
        "user"
        (id, "name", surname, username, "password", email, phone_number)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7);`;
    const result = await db.query(query, [
        id,
        name.trim(),
        surname.trim(),
        username.trim(),
        hashedPassword,
        email.trim(),
        phoneNumber.trim(),
    ]);
    console.log("password hashed as:", hashedPassword);
    if (!result.rowCount) {
        return Response.json(
            { message: "Signup new user failed" },
            { status: 400 },
        );
    }
    return Response.json(
        { message: "Signup new user success" },
        { status: 201 },
    );
}
