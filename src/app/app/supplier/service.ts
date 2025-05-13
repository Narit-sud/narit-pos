import {
    SupplierInterface,
    NewSupplierInterface,
    createSupplierInterface,
} from "@/model/supplier.interface";
import axiosInstance from "@/lib/axiosInstance";

export async function getSupplierService(): Promise<SupplierInterface[]> {
    try {
        const response = await axiosInstance.get("/supplier");
        if (!response.data.data) return [];
        return response.data.data.map((cus: any) =>
            createSupplierInterface(cus)
        );
    } catch (error) {
        console.error("Error fetching supplier data:", error);
        return [];
    }
}

export async function createSupplierService(
    newSupplier: NewSupplierInterface
): Promise<void> {
    try {
        await axiosInstance.post("/supplier", newSupplier);
    } catch (error) {
        console.error("Error creating supplier:", error);
        throw error;
    }
}

// TODO: Implement deleteSupplierService function
export async function updateSupplierService(
    updatedSupplier: SupplierInterface
) {
    try {
        await axiosInstance.put(
            `/supplier/${updatedSupplier.id}`,
            updatedSupplier
        );
    } catch (error) {
        console.error("Error updating supplier:", error);
        throw error;
    }
}
