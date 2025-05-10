import axiosInstance from "@/lib/axiosInstance";
import { AuthInterface } from "@/model/auth.interface";
import { createAuthInterface } from "@/model/auth.interface";

export async function getAuthService(): Promise<AuthInterface | null> {
    try {
        const response = await axiosInstance.get("/auth");
        if (!response.data) {
            throw new Error("No data found");
        }
        return createAuthInterface(response.data.data);
    } catch (error) {
        console.log("Error fetching auth data:", error);
        return null;
    }
}
