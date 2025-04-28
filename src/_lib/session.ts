import * as jose from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: jose.JWTPayload) {
    return new jose.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jose.jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log("Failed to verify session", error);
    }
}

export async function createSession(payload: any) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ ...payload, expiresAt });
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: true,
        path: "/",
    });
}
