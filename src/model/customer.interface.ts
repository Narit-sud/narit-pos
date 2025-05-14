import { v4 as uuidv4 } from "uuid";
import { convertToThailandTime } from "@/lib/convertTime";

export interface CustomerInterface {
    id: string; // Unique identifier for the customer
    name: string; // Name of the customer
    surname: string; // Surname of the customer
    email: string; // Email address of the customer
    phoneNumber: string; // Phone number of the customer
    address: string; // Address of the customer
    createdAt: string; // Date when the customer was created
    createdBy: string; // User who created the customer record
    updatedAt: string; // Date when the customer was last updated
    updatedBy: string; // User who last updated the customer record
}

export interface NewCustomerInterface {
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: string;
}

export function createNewCustomerInterface(
    customer: Partial<NewCustomerInterface>
): NewCustomerInterface {
    return {
        id: customer.id || uuidv4(),
        name: customer.name?.trim() || "",
        surname: customer.surname?.trim() || "",
        email: customer.email?.trim() || "",
        phoneNumber: customer.phoneNumber?.trim() || "",
        address: customer.address?.trim() || "",
    };
}

export function createCustomerInterface(
    customer: Partial<CustomerInterface>
): CustomerInterface {
    return {
        id: customer.id || "",
        name: customer.name || "",
        surname: customer.surname || "",
        email: customer.email || "",
        phoneNumber: customer.phoneNumber || "",
        address: customer.address || "",
        createdAt: convertToThailandTime(customer.createdAt || "") || "unknown",
        createdBy: customer.createdBy || "unknown",
        updatedAt: convertToThailandTime(customer.updatedAt || "") || "unknown",
        updatedBy: customer.updatedBy || "unknown",
    };
}

export function validateNewCustomerInterface(
    customer: Partial<NewCustomerInterface>
): { valid: boolean; message: string } {
    // Validate name and surname
    if (!customer.name) {
        // Name are required
        return { valid: false, message: "Name are required" };
    } else if (customer.name.length < 3) {
        // Name must be at least 3 characters long
        return { valid: false, message: "Name must be at least 3 characters" };
    } else if (customer.name.split(" ").length < 1) {
        // Name must not contain spaces
        return { valid: false, message: "Name must not contain spaces" };
    } else if (customer.surname && customer.surname.split(" ").length < 1) {
        // Surnameame must not contain spaces
        return { valid: false, message: "Surname must not contain spaces" };
    }

    // Validate email
    if (customer.email && !/\S+@\S+\.\S+/.test(customer.email)) {
        // Basic email validation
        return { valid: false, message: "Invalid email format" };
    }

    // Validate phone number
    if (!customer.phoneNumber) {
        return { valid: false, message: "Phone number is required" };
    } else if (customer.phoneNumber && !/^\d{10}$/.test(customer.phoneNumber)) {
        // 10 digits and no other characters
        return { valid: false, message: "Phone number must be 10 digits" };
    }

    // address is optional, but if provided, it should not be empty
    return { valid: true, message: "Data is valid" };
}
