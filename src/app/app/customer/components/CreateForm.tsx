"use client";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
    NewCustomerInterface,
    createNewCustomerInterface,
    validateNewCustomerInterface,
} from "@/model/customer.interface";
import { useRef, useState } from "react";
import { useCustomer } from "../useCustomer";
import { validate } from "uuid";

type Props = {
    handleCancelButton: () => void;
};

/**
 * CreateForm component
 * This component is used to create a new customer.
 * It takes in the following props:
 * @param handleCancelButton: () => void - function to handle cancel button click
 * @default handleCancelButton is logging a message to the console
 */
export default function CreateForm({
    handleCancelButton = () => {
        console.log("Please add function to this button.");
    },
}: Props) {
    const [snackAlert, setSnackAlert] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({ open: false, message: "", severity: "success" });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const surnameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const { createCustomer } = useCustomer();

    async function handleSubmit() {
        setButtonDisabled(true);
        const newCustomer = createNewCustomerInterface({
            name: nameRef.current?.value || "",
            surname: surnameRef.current?.value || "",
            email: emailRef.current?.value || "",
            phoneNumber: phoneRef.current?.value || "",
            address: addressRef.current?.value || "",
        });
        try {
            const isCustomerValid = validateNewCustomerInterface(newCustomer);
            if (!isCustomerValid.valid) {
                setButtonDisabled(false);
                setSnackAlert({
                    open: true,
                    message: isCustomerValid.message,
                    severity: "error",
                });
                return;
            }
            await createCustomer(newCustomer);
            setSnackAlert({
                open: true,
                message: "Customer created successfully",
                severity: "success",
            });
            setTimeout(() => {
                handleCancelButton();
            }, 2000);
        } catch (error) {
            setButtonDisabled(false);
            setSnackAlert({
                open: true,
                message: "Failed to create customer",
                severity: "error",
            });
        }
    }

    return (
        <Stack spacing={3} direction="column">
            <Typography variant="h5">Create Customer</Typography>
            <FormControl variant="filled" fullWidth>
                <Stack direction="column" spacing={1}>
                    <TextField
                        inputRef={nameRef}
                        label="Name"
                        placeholder="Enter customer name"
                        required
                    />
                    <TextField
                        inputRef={surnameRef}
                        label="Surname"
                        placeholder="Enter customer surname"
                    />
                    <TextField
                        inputRef={emailRef}
                        label="Email"
                        placeholder="Enter customer email"
                    />
                    <TextField
                        inputRef={phoneRef}
                        label="Phone Number"
                        placeholder="Enter customer phone number"
                    />
                    <TextField
                        inputRef={addressRef}
                        label="Address"
                        placeholder="Enter customer address"
                    />
                </Stack>
            </FormControl>
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={buttonDisabled}
                >
                    Submit
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleCancelButton}
                    disabled={buttonDisabled}
                >
                    Cancel
                </Button>
            </Stack>
            <Button
                variant="contained"
                onClick={() =>
                    setSnackAlert({
                        open: true,
                        message: "Test",
                        severity: "success",
                    })
                }
                disabled={buttonDisabled}
            >
                Test
            </Button>
            <Snackbar
                open={snackAlert.open}
                autoHideDuration={3000}
                onClose={() => setSnackAlert({ ...snackAlert, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() =>
                        setSnackAlert({ ...snackAlert, open: false })
                    }
                    severity={snackAlert.severity}
                    sx={{ width: "100%" }}
                >
                    {snackAlert.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
