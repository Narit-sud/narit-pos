import axiosInstance from "@/lib/axiosInstance";
import { isAxiosError } from "axios";
import {
    NewProductInterface,
    ProductInterface,
} from "@/model/product.interface";

export async function getProductService(): Promise<ProductInterface[]> {
    try {
        const response = await axiosInstance.get("/product/active/display");
        if (response.status === 200) {
            return response.data.data as ProductInterface[];
        }
        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(
                "getProductService Error:",
                error.response?.data || error.response
            );
        }
        return [];
    }
}

export async function createProductService(
    newProduct: NewProductInterface
): Promise<void> {
    try {
        await axiosInstance.post("/product", newProduct);
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("createProductService Error:", error);
            if (error.response) {
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
