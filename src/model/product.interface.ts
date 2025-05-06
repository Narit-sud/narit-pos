import { v4 as uuidv4 } from "uuid";

export interface ProductInterface {
    id: string;
    name: string;
    detail: string;
    price: number;
    quantity: number;
    brand: string;
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
    initialQuantity: number;
    cost: number;
    brandId: string;
}

export function createProductInterface(
    product: Partial<ProductInterface>,
): ProductInterface {
    return {
        id: product.id || uuidv4(),
        name: product.name || "",
        detail: product.detail || "",
        price: product.price || 0,
        quantity: product.quantity || 0,
        brand: product.brand || "",
        createdAt: product.createdAt || "",
        updatedAt: product.updatedAt || "",
        createdBy: product.createdBy || "",
        updatedBy: product.updatedBy || "",
    };
}

export function createNewProductInterface(
    product: Partial<NewProductInterface>,
): NewProductInterface {
    return {
        id: product.id || uuidv4(),
        name: product.name || "",
        detail: product.detail || "",
        price: product.price || 0,
        cost: product.cost || 0,
        initialQuantity: product.initialQuantity || 0,
        brandId: product.brandId || "",
    };
}
