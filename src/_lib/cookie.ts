import { JWTPayload } from "jose";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "./session";

export async function getCookie(name: string): Promise<JWTPayload | undefined> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(name);
    if (!cookie) return undefined;
    return decrypt(cookie.value);
}

export async function setCookie(name: string, payload: any): Promise<void> {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ ...payload, expiresAt });
    const cookieStore = await cookies();
    cookieStore.set(name, session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: true,
        path: "/",
    });
}
