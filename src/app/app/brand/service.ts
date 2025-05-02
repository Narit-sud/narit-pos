import axiosInstance from "@/lib/axiosInstance";
import { isAxiosError } from "axios";
import type {
    NewBrandInterface,
    BrandInterface,
} from "@/model/brand.interface";

export async function getBrandService(): Promise<BrandInterface[] | null> {
    try {
        const response = await axiosInstance.get("/brand");
        if (!response.data || !response.data.data) {
            return null;
        }
        return response.data.data as BrandInterface[];
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
                    error.response.data.message || "Failed to fetch brand data",
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

export async function createBrandService(newBrand: NewBrandInterface) {
    try {
        await axiosInstance.post("/brand", newBrand);
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("createBrandService Error:", error);
            if (error.response) {
                if (error.response.status === 401) {
                    window.location.href = "/auth/login";
                    return;
                }
                throw new Error(
                    error.response.data.message || "Failed to fetch store data",
                );
            } else if (error.request) {
                // network errors
                throw new Error("Network error. Please check your connection.");
            } else {
                // other Axios errors
                throw new Error(error.message);
            }
        } else {
            // non-Axios errors
            throw new Error("An unexpected error occurred.");
        }
    }
}
