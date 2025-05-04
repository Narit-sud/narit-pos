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

export async function decrypt(token: string | undefined = "") {
    try {
        const { payload } = await jose.jwtVerify(token, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log("Failed to verify token", error);
    }
}

export async function createShortLiveSession(userId: string) {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    const authToken = await encrypt({ userId, expiresAt });
    const cookieStore = await cookies();
    cookieStore.set("authToken", authToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: true,
        path: "/",
    });
}

export async function createAuthToken(
    userId: string,
    storeId: string,
    permission: string,
) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    const authToken = await encrypt({ userId, storeId, permission, expiresAt });
    const cookieStore = await cookies();
    cookieStore.set("authToken", authToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: true,
    });
    return authToken;
}
