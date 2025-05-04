import axiosInstance from "@/lib/axiosInstance";
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
            console.log(error.response);
            // Handle HTTP errors (4xx, 5xx)
            if (error.response) {
                if (error.response.status === 404) {
                    return null;
                } else if (error.response.status === 401) {
                    window.location.href = "/auth/login";
                    return null;
                }
                throw new Error(
                    error.response.data.message || "Failed to fetch store data",
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

export async function setUserStore(storeId: string): Promise<void> {
    try {
        const response = await axiosInstance.post(`/store/select/${storeId}`);
        console.log(response.data); // {isAutorized: true}
        if (!response.data) {
            throw new Error("Failed to set store data");
        }
    } catch (error) {
        console.error("frontendError:", error);
        if (isAxiosError(error)) {
            console.log(error.response);
            // Handle HTTP errors (4xx, 5xx)
            if (error.response) {
                if (error.response.status === 404) {
                    throw new Error("Store not found");
                } else if (error.response.status === 401) {
                    throw new Error("Unauthorized access");
                }
                throw new Error(
                    error.response.data.message || "Failed to fetch store data",
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
