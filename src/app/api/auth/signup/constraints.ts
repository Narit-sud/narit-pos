import { ConstraintErrorInterface } from "@/model/constraintError.interface";

export const constraints: ConstraintErrorInterface[] = [
    {
        name: "user_unique_username",
        message: "Username already exists.",
        code: 409,
    },
    {
        name: "user_unique_name_surname",
        message: "This person already exists.",
        code: 409,
    },
    {
        name: "user_unique_phone_number",
        message: "Phone number already exists.",
        code: 409,
    },
    {
        name: "user_unique_email",
        message: "Email already exists.",
        code: 409,
    },
];
