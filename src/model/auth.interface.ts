import { convertToThailandTime } from "@/lib/convertTime";

export interface AuthInterface {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    name: string;
    surname: string;
    createdAt: string;
    updatedAt: string;
}

export function createAuthInterface(
    authData: Partial<AuthInterface>
): AuthInterface {
    return {
        id: authData.id || "",
        username: authData.username || "",
        email: authData.email || "",
        phoneNumber: authData.phoneNumber || "",
        name: authData.name || "",
        surname: authData.surname || "",
        createdAt: convertToThailandTime(authData.createdAt || "") || "unknown",
        updatedAt: convertToThailandTime(authData.updatedAt || "") || "unknown",
    };
}
