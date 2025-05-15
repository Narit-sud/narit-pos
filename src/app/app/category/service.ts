import axiosInstance from "@/lib/axiosInstance";
import { convertToThailandTime } from "@/lib/convertTime";
import {
    CategoryInterface,
    NewCategoryInterface,
} from "@/model/category.interface";
import { isAxiosError } from "axios";

export async function getCategoryService(): Promise<CategoryInterface[]> {
    try {
        const response = await axiosInstance.get("/category");
        if (response.data.data) {
            return response.data.data.map((brand: CategoryInterface) => ({
                ...brand,
                createdAt: convertToThailandTime(brand.createdAt),
                updatedAt: convertToThailandTime(brand.updatedAt),
            }));
        }
        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(
                "getCategoryService Error:",
                error.response?.data || error.response
            );
        }
        return [];
    }
}

export async function createCategoryService(
    newCategory: NewCategoryInterface
): Promise<void> {
    try {
        axiosInstance.post("/category", newCategory);
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(
                "createCategoryService Error:",
                error.response?.data || error.response
            );
        }
        throw error;
    }
}

export async function updateCategoryService(
    updatedCategory: CategoryInterface
): Promise<void> {
    try {
        await axiosInstance.put(
            `/category/${updatedCategory.id}`,
            updatedCategory
        );
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error || "Update failed");
        }
    }
}
