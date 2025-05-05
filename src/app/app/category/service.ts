import axiosInstance from "@/lib/axiosInstance";
import {
    CategoryInterface,
    NewCategoryInterface,
} from "@/model/category.interface";
import { isAxiosError } from "axios";

export async function getCategoryService(): Promise<CategoryInterface[]> {
    try {
        const response = await axiosInstance.get("/category");
        return response.data.data as CategoryInterface[];
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response);
            // Handle HTTP errors (4xx, 5xx)
            throw error;
        } else {
            // Handle non-Axios errors
            throw new Error("An unexpected error occurred.");
        }
    }
}

export async function createCategoryService(
    newCategory: NewCategoryInterface,
): Promise<void> {
    try {
        axiosInstance.post("/category", newCategory);
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("createCategoryService Error:", error);
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
