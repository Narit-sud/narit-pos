import { JWTPayload } from "jose";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "./token";

/**
 * @param name name of the cookie
 * @returns cookie string value
 * @description get a cookie with the given name. The cookie will be encrypted if it is not string.
 */
export async function getCookie(name: string): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
}

/**
 * @param name name of the cookie
 * @param payload content of the cookie
 * @param expiredInDays days until the cookie expires. default is 7 days
 * @returns void
 * @description set a cookie with the given name and payload. The cookie will "NOT" encrypted and will expire in the given number of days.
 * The cookie will be set as httpOnly, secure, and sameSite.
 */
export async function setCookie(
    name: string,
    payload: object,
    expiredInDays: number = 7,
): Promise<void> {
    const expiresAt = new Date(
        Date.now() + expiredInDays * 24 * 60 * 60 * 1000,
    );
    const cookieStore = await cookies();
    cookieStore.set(name, JSON.stringify(payload), {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: true,
        path: "/",
    });
}

/**
 * @param name name of the cookie
 * @returns decrypted cookie value
 * @throws Error if cookie is not found or decryption fails
 * @description get a cookie with the given name and payload. The cookie will be decrypted.
 */
export async function getDecryptedCookie(name: string): Promise<JWTPayload> {
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
                `Failed to decrypt cookie "${name}": ${error.message}`,
            );
            throw new Error(
                `Failed to decrypt cookie "${name}": ${error.message}`,
            );
        } else {
            console.error(`Failed to decrypt cookie "${name}"`, error);
            throw new Error(`Failed to decrypt cookie "${name}"`);
        }
    }
}

/**
 * @param name name of the cookie
 * @param payload content of the cookie
 * @param expiredInDays days until the cookie expires. default is 7 days
 * @returns void
 * @description set a cookie with the given name and payload. The cookie will be encrypted and will expire in the given number of days.
 * The cookie will be set as httpOnly, secure, and sameSite.
 */
export async function setEncryptedCookie(
    name: string,
    payload: object,
    expiredInDays: number = 7,
): Promise<void> {
    const expiresAt = new Date(
        Date.now() + expiredInDays * 24 * 60 * 60 * 1000,
    );
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
