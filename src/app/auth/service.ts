import axiosInstance from "@/lib/axiosInstance";
import { LoginInterface } from "@/model/login.interface";
import { isAxiosError } from "axios";
import { SignupInterface } from "@/model/signup.interface";

export async function signupService(
    signupData: SignupInterface
): Promise<void> {
    try {
        await axiosInstance.post("/auth/signup", signupData);
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(
                "getBrandService Error:",
                error.response?.data || error.response
            );
        }
    }
}

export async function loginService(loginData: LoginInterface): Promise<void> {
    try {
        await axiosInstance.post("/auth/login", loginData);
    } catch (error) {
        throw error;
    }
}

export async function logoutService(): Promise<void> {
    try {
        await axiosInstance.delete("/auth/logout");
        window.location.href = "/";
    } catch (error) {
        console.log("cannot logout", error);
    }
}
