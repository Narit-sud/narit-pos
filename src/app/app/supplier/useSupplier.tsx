"use client";
import {
    type NewSupplierInterface,
    type SupplierInterface,
} from "@/model/supplier.interface";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    createSupplierService,
    getSupplierService,
    updateSupplierService,
} from "./service";

type SupplierContextType = {
    suppliers: SupplierInterface[];
    loadSuppliers: () => Promise<void>;
    createSupplier: (newSupplier: NewSupplierInterface) => Promise<void>;
    updateSupplier: (updatedSupplier: SupplierInterface) => Promise<void>;
    deleteSupplier: (supplierId: string) => Promise<void>;
};

type Props = {
    children: ReactNode;
};

const SupplierContext = createContext<SupplierContextType | undefined>(
    undefined
);

export function SupplierContextProvider({ children }: Props) {
    const [suppliers, setSuppliers] = useState<SupplierInterface[]>([]);

    async function loadSuppliers(): Promise<void> {
        try {
            const loadedSuppliers = await getSupplierService();
            if (loadedSuppliers) {
                setSuppliers(loadedSuppliers);
            }
        } catch (error) {
            console.error("Error loading suppliers:", error);
        }
    }

    async function createSupplier(newSupplier: NewSupplierInterface) {
        try {
            await createSupplierService(newSupplier);
            await loadSuppliers(); // Refresh suppliers after creation
        } catch (error) {
            throw error;
        }
    }

    async function updateSupplier(updatedSupplier: SupplierInterface) {
        try {
            await updateSupplierService(updatedSupplier);
            await loadSuppliers(); // Refresh suppliers after update
        } catch (error) {
            throw error;
        }
    }

    // TODO: Implement deleteSupplier function
    async function deleteSupplier(supplierId: string) {}

    useEffect(() => {
        loadSuppliers();
    }, []);

    return (
        <SupplierContext.Provider
            value={{
                suppliers,
                createSupplier,
                updateSupplier,
                loadSuppliers,
                deleteSupplier,
            }}
        >
            {children}
        </SupplierContext.Provider>
    );
}

export function useSupplier() {
    const context = useContext(SupplierContext);
    if (!context) {
        throw new Error("useSupplier must be used within a CategoryProvider");
    }
    return context;
}
