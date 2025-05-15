import axiosInstance from "@/lib/axiosInstance";
import { convertToThailandTime } from "@/lib/convertTime";
import type {
    BrandInterface,
    NewBrandInterface,
} from "@/model/brand.interface";
import { isAxiosError } from "axios";

export async function getBrandService(): Promise<BrandInterface[]> {
    try {
        const response = await axiosInstance.get("/brand");
        if (response.data.data) {
            return response.data.data.map((brand: BrandInterface) => ({
                ...brand,
                createdAt: convertToThailandTime(brand.createdAt),
                updatedAt: convertToThailandTime(brand.updatedAt),
            }));
        }
        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(
                "getBrandService Error:",
                error.response?.data || error.response
            );
        }
        return [];
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
                    error.response.data.message || "Failed to fetch store data"
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

export async function updateBrandService(
    updatedBrand: BrandInterface
): Promise<void> {
    try {
        await axiosInstance.put(`/brand/${updatedBrand.id}`, updatedBrand);
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error || "Update failed");
        }
    }
}
