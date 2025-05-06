"use client";
import { createBrandService, getBrandService } from "./service";
import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
} from "react";
import type {
    BrandInterface,
    NewBrandInterface,
} from "@/model/brand.interface";

type BrandContextType = {
    brands: BrandInterface[];
    createBrand: (brand: NewBrandInterface) => Promise<void>;
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

    useEffect(() => {
        loadBrands();
    }, []);

    return (
        <BrandContext.Provider value={{ brands, createBrand }}>
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
