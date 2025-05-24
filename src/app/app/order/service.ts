import axiosInstance from "@/lib/axiosInstance";
import { SaleInterface } from "@/model/sale.interface";
import { isAxiosError } from "axios";

export async function getSales(): Promise<SaleInterface[]> {
    try {
        const response = await axiosInstance.get("/sale");
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error(error.response);
        }
        return [];
    }
}
