"use client";
import { getProductService } from "./service";
import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
} from "react";
import type { ProductInterface } from "@/model/product.interface";

type ProductContextType = {
    products: ProductInterface[];
    loadProducts: () => Promise<void>;
};

type Props = {
    children: ReactNode;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductContextProvider({ children }: Props) {
    const [products, setProducts] = useState<ProductInterface[]>([]);

    async function loadProducts(): Promise<void> {
        try {
            const loadedProducts = await getProductService();
            if (loadedProducts) {
                setProducts(loadedProducts);
            }
        } catch (error) {
            console.error("Error loading products:", error);
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loadProducts }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useCategory() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
}
