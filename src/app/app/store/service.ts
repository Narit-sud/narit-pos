import axiosInstance from "@/lib/axiosInstance";
import { isAxiosError } from "axios";
import { NewStoreInterface, StoreUserInterface } from "./interface";
import { convertToThailandTime } from "@/lib/convertTime";

export async function getUserStore(): Promise<StoreUserInterface[]> {
    try {
        const response = await axiosInstance.get("/store");
        if (!response.data || !response.data.data) {
            // Return empty array instead of null for better type safety
            return [];
        }
        return response.data.data.map((store: StoreUserInterface) => ({
            id: store.id,
            name: store.name,
            permission: store.permission,
            createdAt: convertToThailandTime(store.createdAt),
            updatedAt: convertToThailandTime(store.updatedAt),
            createdBy: store.createdBy,
            updatedBy: store.updatedBy,
        })) as StoreUserInterface[];
    } catch (error) {
        if (isAxiosError(error)) {
            console.error(
                "Error fetching user stores:",
                error.response || error.message
            );

            // Handle HTTP errors (4xx, 5xx)
            if (error.response) {
                if (error.response.status === 404) {
                    // No stores found, return empty array instead of null
                    return [];
                } else if (error.response.status === 401) {
                    // Instead of redirecting directly, throw an error that can be handled by the component
                    throw new Error(
                        "Your session has expired. Please log in again."
                    );
                } else if (error.response.data && error.response.data.message) {
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error("Failed to fetch store data");
                }
            } else if (error.request) {
                // Handle network errors (e.g., connection refused)
                throw new Error("Network error. Please check your connection.");
            } else {
                // Handle other Axios errors
                throw new Error(error.message);
            }
        } else {
            // Handle non-Axios errors
            throw new Error(
                "An unexpected error occurred while fetching store data."
            );
        }
    }
}

export async function setUserStore(storeId: string): Promise<void> {
    try {
        const response = await axiosInstance.post(`/store/${storeId}`);
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

export async function createStoreService(
    newStore: NewStoreInterface
): Promise<void> {
    try {
        const response = await axiosInstance.post("/store", newStore, {
            withCredentials: true,
        });
        console.log(response.data);
        return;
    } catch (error) {
        console.error(error);
        return;
    }
}
