import axiosInstance from "@/_lib/axiosInstance";
import { isAxiosError } from "axios";
import { StoreUserInterface } from "./interface";

export async function getUserStore(): Promise<StoreUserInterface[] | null> {
    try {
        const response = await axiosInstance.get("/store");
        if (!response.data || !response.data.data) {
            return null;
        }
        return response.data.data;
    } catch (error) {
        if (isAxiosError(error)) {
            // Handle HTTP errors (4xx, 5xx)
            if (error.response) {
                if (error.response.status === 404) {
                    return null;
                }
                throw new Error(
                    error.response.data.message || "Failed to fetch store data"
                );
            } else if (error.request) {
                // Handle network errors (e.g., connection refused)
                throw new Error("Network error. Please check your connection.");
            } else {
                // Handle other Axios errors
                throw new Error(error.message);
            }
        } else {
            // Handle non-Axios errors
            throw new Error("An unexpected error occurred.");
        }
    }
}
