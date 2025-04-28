import { LoginInterface } from "./interface";
import axiosInstance from "@/_lib/axiosInstance";

export async function loginService(
    loginData: LoginInterface
): Promise<boolean> {
    try {
        const response = await axiosInstance.post("auth/login", loginData);
        if (response.status === 200) {
            const data = response.data;
            if (data.success) {
                return true;
            }
        }

        throw new Error("Network response was not ok");
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}
