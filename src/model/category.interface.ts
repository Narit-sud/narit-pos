import { v4 as uuidv4 } from "uuid";

export interface CategoryInterface {
    id: string;
    name: string;
    detail: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export function createCategoryInterface(
    category: Partial<CategoryInterface>
): CategoryInterface {
    return {
        id: category.id || uuidv4(),
        name: category.name || "",
        detail: category.detail || "",
        createdAt: category.createdAt || "",
        updatedAt: category.updatedAt || "",
        createdBy: category.createdBy || "",
        updatedBy: category.updatedBy || "",
    };
}

export interface NewCategoryInterface {
    id: string;
    name: string;
    detail: string;
}

export function createNewCategoryInterface(
    category: Partial<NewCategoryInterface>
): NewCategoryInterface {
    return {
        id: category.id || uuidv4(),
        name: category.name || "",
        detail: category.detail || "",
    };
}
