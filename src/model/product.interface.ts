import { convertToThailandTime } from "@/lib/convertTime";
import { v4 as uuidv4 } from "uuid";

export interface NewProductInterface {
    id: string;
    name: string;
    brandId: string;
    price: number;
    cost: number;
    stock: number;
    detail: string;
}

export interface UpdateProductInterface extends NewProductInterface {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export interface ProductInterface extends UpdateProductInterface {
    /** For display purpose */
    brand: string;
    /** For display purpose */
    category: string;
}

export function buildNewProduct(
    product: Partial<NewProductInterface>
): NewProductInterface {
    return {
        id: product.id || uuidv4(),
        name: product.name || "",
        detail: product.detail || "",
        price: product.price || 0,
        cost: product.cost || 0,
        stock: product.stock || 0,
        brandId: product.brandId || "",
    };
}

export function buildProduct(
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
        createdAt: convertToThailandTime(product.createdAt || "") || "Unkonwn",
        updatedAt: convertToThailandTime(product.updatedAt || "") || "Unkonwn",
        createdBy: product.createdBy || "Unkonwn",
        updatedBy: product.updatedBy || "Unkonwn",
    };
}

export function buildUpdateProduct(
    product: Partial<UpdateProductInterface>
): UpdateProductInterface {
    return {
        id: product.id || "",
        name: product.name || "",
        detail: product.detail || "",
        cost: product.cost || 0,
        price: product.price || 0,
        stock: product.stock || 0,
        brandId: product.brandId || "",
        createdAt: convertToThailandTime(product.createdAt || "") || "Unkonwn",
        updatedAt: convertToThailandTime(product.updatedAt || "") || "Unkonwn",
        createdBy: product.createdBy || "Unkonwn",
        updatedBy: product.updatedBy || "Unkonwn",
    };
}

export function validateProduct(product: NewProductInterface): string[] | void {
    const errors: string[] = [];
    // validate name
    if (!product.name || product.name.trim() === "") {
        errors.push("Product name is required.");
    }
    if (product.name.length < 3) {
        errors.push("Product name must be at least 3 characters long.");
    }
    if (product.name.length > 50) {
        errors.push("Product name must not exceed 50 characters.");
    }
    // validate cost
    if (product.cost < 0) {
        errors.push("Cost must be a non-negative number.");
    }
    if (product.cost > 10000000) {
        errors.push("Cost must not exceed 10,000,000.");
    }
    if (isNaN(Number(product.cost))) {
        errors.push("Cost must be a valid number.");
    }
    // validate price
    if (product.price < 0) {
        errors.push("Price must be a non-negative number.");
    }
    if (product.price > 10000000) {
        errors.push("Price must not exceed 10,000,000.");
    }
    if (isNaN(Number(product.price))) {
        errors.push("Price must be a valid number.");
    }
    // validate stock
    if (product.stock < 0) {
        errors.push("Stock must be a non-negative number.");
    }
    if (isNaN(Number(product.stock))) {
        errors.push("Stock must be a valid number.");
    }
    if (product.stock > 10000000) {
        errors.push("Stock must not exceed 10,000,000.");
    }
    // validate brandId
    if (!product.brandId || product.brandId.trim() === "") {
        errors.push("Brand ID is required.");
    }
    return errors.length > 0 ? errors : undefined;
}
