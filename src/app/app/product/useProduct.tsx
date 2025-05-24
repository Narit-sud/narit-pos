"use client";
import {
    createProductService,
    getProductService,
    updateProductService,
} from "./service";
import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
} from "react";
import type {
    ProductInterface,
    NewProductInterface,
} from "@/model/product.interface";
import { NewProduct } from "@/class/Product.class";

type ProductContextType = {
    products: ProductInterface[];
    loadProducts: () => Promise<void>;
    createProduct: (newProduct: NewProduct) => Promise<void>;
    updateProduct: (updatedProduct: ProductInterface) => Promise<void>;
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

    async function createProduct(newProduct: NewProduct): Promise<void> {
        try {
            await createProductService(newProduct);
            await loadProducts(); // Refresh product after creation
        } catch (error) {
            throw error;
        }
    }

    async function updateProduct(
        updatedProduct: ProductInterface
    ): Promise<void> {
        try {
            await updateProductService(updatedProduct);
            await loadProducts(); // Refresh product after update
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <ProductContext.Provider
            value={{ products, loadProducts, createProduct, updateProduct }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
}
