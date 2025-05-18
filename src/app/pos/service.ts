import { SaleInterface } from "@/model/sale.interface";
import axiosInstance from "@/lib/axiosInstance";

export async function createSaleService(newSale: SaleInterface): Promise<void> {
    try {
        const response = await axiosInstance.post("/sale", newSale);
        console.log(response.data);
    } catch (error) {
        console.log(error);
        throw new Error("Error creating sale");
    }
}
