import { ConstraintErrorInterface } from "@/model/constraintError.interface";

export const constraints: ConstraintErrorInterface[] = [
    {
        message: "Customer already exists in this store.",
        name: "customer_unique_name_surname_store_id",
        code: 409,
    },
    {
        message: "Phone number already exists in this store.",
        name: "customer_unique_phone_number_store_id",
        code: 409,
    },
];
