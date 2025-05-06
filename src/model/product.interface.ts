import { v4 as uuidv4 } from "uuid";

export interface ProductInterface {
    id: string;
    name: string;
    detail: string;
    price: number;
    quantity: number;
    brand: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export interface NewProductInterface {
    id: string;
    name: string;
    detail: string;
    price: number;
    quantity: number;
    brandId: string;
    categoryId: string;
}

export function createProductInterface(
    product: Partial<ProductInterface>
): ProductInterface {
    return {
        id: product.id || uuidv4(),
        name: product.name || "",
        detail: product.detail || "",
        price: product.price || 0,
        quantity: product.quantity || 0,
        brand: product.brand || "",
        category: product.category || "",
        createdAt: product.createdAt || "",
        updatedAt: product.updatedAt || "",
        createdBy: product.createdBy || "",
        updatedBy: product.updatedBy || "",
    };
}

export function createNewProductInterface(
    product: Partial<NewProductInface>
): NewProductInface {
    return {
        id: product.id || uuidv4(),
        name: product.name || "",
        detail: product.detail || "",
        price: product.price || 0,
        quantity: product.quantity || 0,
        brandId: product.brandId || "",
        categoryId: product.categoryId || "",
    };
}
