"use client";
import type {
    BrandInterface,
    NewBrandInterface,
} from "@/model/brand.interface";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    createBrandService,
    getBrandService,
    updateBrandService,
} from "./service";

type BrandContextType = {
    brands: BrandInterface[];
    loadBrands: () => Promise<void>;
    createBrand: (brand: NewBrandInterface) => Promise<void>;
    updateBrand: (brand: BrandInterface) => Promise<void>;
};

type Props = {
    children: ReactNode;
};

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandContextProvider({ children }: Props) {
    const [brands, setBrands] = useState<BrandInterface[]>([]);

    async function loadBrands(): Promise<void> {
        try {
            const loadedBrands = await getBrandService();
            if (loadedBrands) {
                setBrands(loadedBrands);
            }
        } catch (error) {
            console.error("Error loading brands:", error);
        }
    }

    async function createBrand(brand: NewBrandInterface): Promise<void> {
        try {
            await createBrandService(brand);
            await loadBrands();
        } catch (error) {
            console.error("Error creating brand:", error);
        }
    }

    async function updateBrand(updatedBrand: BrandInterface): Promise<void> {
        try {
            await updateBrandService(updatedBrand);
            await loadBrands();
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        loadBrands();
    }, []);

    return (
        <BrandContext.Provider
            value={{ brands, createBrand, loadBrands, updateBrand }}
        >
            {children}
        </BrandContext.Provider>
    );
}

export function useBrand() {
    const context = useContext(BrandContext);
    if (!context) {
        throw new Error("useBrand must be used within a BrandProvider");
    }
    return context;
}
