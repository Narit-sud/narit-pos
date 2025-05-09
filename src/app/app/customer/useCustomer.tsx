"use client";
import {
    getCustomerService,
    createCustomerService,
    updateCustomerService,
} from "./service";
import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
} from "react";
import {
    createCustomerInterface,
    type CustomerInterface,
    type NewCustomerInterface,
} from "@/model/customer.interface";

type CustomerContextType = {
    customers: CustomerInterface[];
    loadCustomers: () => Promise<void>;
    createCustomer: (newCategory: NewCustomerInterface) => Promise<void>;
    updateCustomer: (updatedCategory: CustomerInterface) => Promise<void>;
    deleteCustomer: (customerId: string) => Promise<void>;
};

type Props = {
    children: ReactNode;
};

const CustomerContext = createContext<CustomerContextType | undefined>(
    undefined
);

export function CustomerContextProvider({ children }: Props) {
    const [customers, setCustomers] = useState<CustomerInterface[]>([]);

    async function loadCustomers(): Promise<void> {
        try {
            const loadedCustomers = await getCustomerService();
            if (loadedCustomers) {
                setCustomers(loadedCustomers);
            }
        } catch (error) {
            console.error("Error loading customers:", error);
        }
    }

    async function createCustomer(newCustomer: NewCustomerInterface) {
        try {
            await createCustomerService(newCustomer);
            await loadCustomers(); // Refresh customers after creation
        } catch (error) {
            throw error;
        }
    }

    async function updateCustomer(updatedCategory: CustomerInterface) {
        try {
            await updateCustomerService(updatedCategory);
            await loadCustomers(); // Refresh customers after update
        } catch (error) {
            throw error;
        }
    }

    // TODO: Implement deleteCustomer function
    async function deleteCustomer(customerId: string) {}

    useEffect(() => {
        loadCustomers();
    }, []);

    return (
        <CustomerContext.Provider
            value={{
                customers,
                createCustomer,
                updateCustomer,
                loadCustomers,
                deleteCustomer,
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
}

export function useCustomer() {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error("useCustomer must be used within a CategoryProvider");
    }
    return context;
}
