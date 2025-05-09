import { v4 as uuidv4 } from "uuid";

export interface ProductInterface {
    id: string;
    name: string;
    cost: number;
    price: number;
    stock: number;
    brand: string;
    brandId: string;
    category: string;
    categoryId: string;
    detail: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export interface NewProductInterface {
    id: string;
    name: string;
    brandId: string;
    price: number;
    cost: number;
    initialQuantity: number;
    detail: string;
}

export function createProductInterface(
    product: Partial<ProductInterface>
): ProductInterface {
    return {
        id: product.id || uuidv4(),
        name: product.name || "",
        detail: product.detail || "",
        cost: product.cost || 0,
        price: product.price || 0,
        stock: product.stock || 0,
        brand: product.brand || "",
        brandId: product.brandId || "",
        category: product.category || "",
        categoryId: product.categoryId || "",
        createdAt: product.createdAt || "",
        updatedAt: product.updatedAt || "",
        createdBy: product.createdBy || "",
        updatedBy: product.updatedBy || "",
    };
}

export function createNewProductInterface(
    product: Partial<NewProductInterface>
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
