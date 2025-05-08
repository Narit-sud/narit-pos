import axiosInstance from "@/lib/axiosInstance";
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
                "getProductService Error:",
                error.response?.data || error.response
            );
        }
    }
}
