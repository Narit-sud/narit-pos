import axiosInstance from "@/_lib/axiosInstance";
import { isAxiosError } from "axios";
export async function getUserStore() {
    try {
        const response = await axiosInstance.get("/store");
        return response.data;
    } catch (error) {
        throw error;
    }
}
