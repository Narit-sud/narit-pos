import { SignupInterface } from "@/model/signup.interface";

export function validateSignupData(data: SignupInterface): {
    valid: boolean;
    message?: string;
} {
    const { id, name, surname, email, username, password, phoneNumber } = data;
    // Validate username length (8-16 characters)
    if (username.length < 8 || username.length > 16) {
        return {
            valid: false,
            message: "Username must be 8-16 characters long",
        };
    }

    // Validate name length (3-50 characters)
    if (name.length < 3 || name.length > 50) {
        return { valid: false, message: "Name must be 3-50 characters long" };
    }

    // Validate surname length (3-50 characters)
    if (surname.length < 3 || surname.length > 50) {
        return {
            valid: false,
            message: "Surname must be 3-50 characters long",
        };
    }

    // Validate password length (8-24 characters)
    if (password.length < 8 || password.length > 24) {
        return {
            valid: false,
            message: "Password must be 8-24 characters long",
        };
    }

    // Validate phone number (10 digits, integers only)
    if (!/^\d{10}$/.test(phoneNumber)) {
        return {
            valid: false,
            message: "Phone number must be exactly 10 digits",
        };
    }
    return { valid: true };
}
