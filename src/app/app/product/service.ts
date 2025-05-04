import axiosInstance from "@/lib/axiosInstance";
import { ProductInterface } from "@/model/product.interface";

export async function getProductService(): Promise<ProductInterface[]> {
    try {
        const response = await axiosInstance.get("/product/active/display");
        if (response.status === 200) {
            return response.data.data as ProductInterface[];
        }
        throw new Error("Failed to fetch product data");
    } catch (error) {
        throw error;
    }
}
