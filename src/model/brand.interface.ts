import { v4 as uuidv4 } from "uuid";

export interface BrandInterface {
    id: string;
    name: string;
    category: string;
    categoryId: string;
    detail: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export function createBrandInterface(
    brand: Partial<BrandInterface>
): BrandInterface {
    return {
        id: brand.id || uuidv4(),
        name: brand.name || "",
        category: brand.category || "",
        categoryId: brand.categoryId || "",
        detail: brand.detail || "",
        createdAt: brand.createdAt || "",
        updatedAt: brand.updatedAt || "",
        createdBy: brand.createdBy || "",
        updatedBy: brand.updatedBy || "",
    };
}

export interface NewBrandInterface {
    id: string;
    name: string;
    categoryId: string;
    detail: string;
}

export function createNewBrandInterface(
    brand: Partial<NewBrandInterface>
): NewBrandInterface {
    return {
        id: brand.id || uuidv4(),
        name: brand.name || "",
        categoryId: brand.categoryId || "",
        detail: brand.detail || "",
    };
}
