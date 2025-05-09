import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
    CustomerInterface,
    createNewCustomerInterface,
    NewCustomerInterface,
} from "@/model/customer.interface";
import { useCustomer } from "@/app/app/customer/useCustomer";
import { useEffect, useState } from "react";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";

type Props = {
    mode: "create" | "edit" | "view";
    customer?: CustomerInterface;
    handleCancelButton: () => void;
};

/**
 * CustomerForm component
 * This component is used to create or edit a customer.
 * It takes in the following props:
 * @param mode: "create" | "edit" | "view" - the mode of the form. Default is "create"
 * @param customer: CustomerInterface - the customer object to be edited (optional)
 * @param handleCancelButton: () => void - function to handle cancel button click
 * @default mode is "create"
 * customer is undefined
 * handleCancelButton is undefined
 */
export default function CustomerForm({
    mode = "create",
    customer,
    handleCancelButton,
}: Props) {
    return (
        <>
            {mode === "create" && (
                <CreateForm handleCancelButton={handleCancelButton} />
            )}
            {mode === "edit" && customer && (
                <EditForm
                    customer={customer}
                    handleCancelButton={handleCancelButton}
                />
            )}
        </>
    );
}
