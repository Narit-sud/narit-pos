import { hashPassword, comparePassword } from "@/_lib/encrypt";
export async function GET() {
    const password = "thisIsTest";
    const hashedPassword = hashPassword(password);
    const isPasswordMatched = comparePassword(password, hashedPassword);
    return Response.json(
        { password, hashedPassword, isPasswordMatched },
        { status: 200 },
    );
}
