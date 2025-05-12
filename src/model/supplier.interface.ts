import { convertToThailandTime } from "@/lib/convertTime";

export interface SupplierInterface {
    id: string; // Unique identifier for the supplier
    name: string; // Name of the supplier
    surname: string; // Surname of the supplier
    email: string; // Email address of the supplier
    phoneNumber: string; // Phone number of the supplier
    address: string; // Address of the supplier
    createdAt: string; // Date when the supplier was created
    createdBy: string; // User who created the supplier record
    updatedAt: string; // Date when the supplier was last updated
    updatedBy: string; // User who last updated the supplier record
}

export interface NewSupplierInterface {
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: string;
}

export function createNewSupplierInterface(
    supplier: Partial<NewSupplierInterface>
): NewSupplierInterface {
    return {
        id: supplier.id || "",
        name: supplier.name?.trim() || "",
        surname: supplier.surname?.trim() || "",
        email: supplier.email?.trim() || "",
        phoneNumber: supplier.phoneNumber?.trim() || "",
        address: supplier.address?.trim() || "",
    };
}

export function createSupplierInterface(
    supplier: Partial<SupplierInterface>
): SupplierInterface {
    return {
        id: supplier.id || "",
        name: supplier.name || "",
        surname: supplier.surname || "",
        email: supplier.email || "",
        phoneNumber: supplier.phoneNumber || "",
        address: supplier.address || "",
        createdAt: convertToThailandTime(supplier.createdAt || "") || "unknown",
        createdBy: supplier.createdBy || "unknown",
        updatedAt: convertToThailandTime(supplier.updatedAt || "") || "unknown",
        updatedBy: supplier.updatedBy || "unknown",
    };
}

export function validateNewSupplierInterface(
    supplier: Partial<NewSupplierInterface>
): { valid: boolean; message: string } {
    // Validate name and surname
    if (!supplier.name) {
        // Name are required
        return { valid: false, message: "Name are required" };
    } else if (supplier.name.length < 3) {
        // Name must be at least 3 characters long
        return { valid: false, message: "Name must be at least 3 characters" };
    } else if (supplier.name.split(" ").length < 1) {
        // Name must not contain spaces
        return { valid: false, message: "Name must not contain spaces" };
    } else if (supplier.surname && supplier.surname.split(" ").length < 1) {
        // Surnameame must not contain spaces
        return { valid: false, message: "Surname must not contain spaces" };
    }

    // Validate email
    if (supplier.email && !/\S+@\S+\.\S+/.test(supplier.email)) {
        // Basic email validation
        return { valid: false, message: "Invalid email format" };
    }

    // Validate phone number
    if (!supplier.phoneNumber) {
        return { valid: false, message: "Phone number is required" };
    } else if (supplier.phoneNumber && !/^\d{10}$/.test(supplier.phoneNumber)) {
        // 10 digits and no other characters
        return { valid: false, message: "Phone number must be 10 digits" };
    }

    // address is optional, but if provided, it should not be empty
    return { valid: true, message: "Data is valid" };
}
