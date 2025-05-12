import {
    CustomerInterface,
    NewCustomerInterface,
    createCustomerInterface,
} from "@/model/customer.interface";
import axiosInstance from "@/lib/axiosInstance";

export async function getCustomerService(): Promise<CustomerInterface[]> {
    try {
        const response = await axiosInstance.get("/customer");
        if (!response.data.data) return [];
        return response.data.data.map((cus: any) =>
            createCustomerInterface(cus)
        );
    } catch (error) {
        console.error("Error fetching customer data:", error);
        return [];
    }
}

export async function createCustomerService(
    newCustomer: NewCustomerInterface
): Promise<void> {
    try {
        await axiosInstance.post("/customer", newCustomer);
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error;
    }
}

// TODO: Implement deleteCustomerService function
export async function updateCustomerService(
    updatedCustomer: CustomerInterface
) {
    try {
        await axiosInstance.put(
            `/customer/${updatedCustomer.id}`,
            updatedCustomer
        );
    } catch (error) {
        console.error("Error updating customer:", error);
        throw error;
    }
}
