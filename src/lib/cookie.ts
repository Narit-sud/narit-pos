import { JWTPayload } from "jose";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "./token";

export async function getCookie(name: string): Promise<JWTPayload> {
    try {
        const cookieStore = await cookies();
        const cookie = cookieStore.get(name);
        if (!cookie) {
            throw new Error(`Cookie "${name}" not found`);
        }
        const decryptedValue = await decrypt(cookie.value); // Await here if decrypt is async
        return decryptedValue as JWTPayload; // Explicitly type the return
    } catch (error) {
        if (error instanceof Error) {
            console.error(
                `Failed to decrypt cookie "${name}": ${error.message}`
            );
            throw new Error(
                `Failed to decrypt cookie "${name}": ${error.message}`
            );
        } else {
            console.error(`Failed to decrypt cookie "${name}"`, error);
            throw new Error(`Failed to decrypt cookie "${name}"`);
        }
    }
}

export async function setCookie(name: string, payload: object): Promise<void> {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const newCookie = await encrypt({ ...payload, expiresAt });
    const cookieStore = await cookies();
    cookieStore.set(name, newCookie, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: true,
        path: "/",
    });
}
