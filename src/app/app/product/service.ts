import axiosInstance from "@/lib/axiosInstance";
import { isAxiosError } from "axios";
import { ProductInterface } from "@/model/product.interface";

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
