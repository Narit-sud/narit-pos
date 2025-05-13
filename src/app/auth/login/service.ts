import { isAxiosError } from "axios";
import { LoginInterface } from "@/model/login.interface";
import axiosInstance from "@/lib/axiosInstance";
import { StoreUserInterface } from "@/app/app/store/interface";

export async function loginService(
    loginData: LoginInterface
): Promise<StoreUserInterface[]> {
    try {
        const response = await axiosInstance.post("/auth/login", loginData);
        if (response.data.store) {
            return response.data.store as StoreUserInterface[];
        }
        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            console.error(
                "Login service error:",
                error.response?.data || error.message
            );

            if (error.response) {
                // The server responded with a status code outside the 2xx range
                if (error.response.status === 401) {
                    throw new Error("Invalid username or password");
                } else if (error.response.status === 404) {
                    throw new Error("User not found");
                } else if (error.response.data && error.response.data.message) {
                    throw new Error(error.response.data.message);
                }
            }
        }
        // Re-throw the error for the component to handle
        throw error;
    }
}

export async function setUserStore(storeId: string): Promise<void> {
    try {
        await axiosInstance.post("/auth/store-select/", { storeId });
    } catch (error) {
        console.error("setUserStore Error: ", error);
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
