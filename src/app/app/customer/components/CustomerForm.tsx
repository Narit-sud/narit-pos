"use client";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
    createNewCustomerInterface,
    validateNewCustomerInterface,
    type CustomerInterface,
    type NewCustomerInterface,
} from "@/model/customer.interface";
import { setProductFormPopup } from "@/lib/firstLetterUppercase";
import { useState, useEffect } from "react";
import { useCustomer } from "../useCustomer";

type Props = {
    mode: "create" | "edit" | "view";
    customer?: CustomerInterface;
    handleCancelButton: () => void;
};

/**
 * CategoryForm component
 * This component is used to create or edit a category.
 * It takes in the following props:
 * @param mode: "create" | "edit" | "view" - the mode of the form. Default is "create"
 * @param category: CategoryInterface - the category object to be edited (optional)
 * @param handleCancelButton: () => void - function to handle cancel button click
 */
export default function CustomerForm({
    mode = "create",
    customer,
    handleCancelButton,
}: Props) {
    const { createCustomer, updateCustomer } = useCustomer(); // get categories from context to display
    const [editCustomer, setEditCustomer] = useState<CustomerInterface | null>(
        null
    );
    const [newCustomer, setNewCustomer] = useState<NewCustomerInterface | null>(
        null
    );
    const [snackAlert, setSnackAlert] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "info" | "warning";
    }>({ open: false, message: "", severity: "success" });
    const [loading, setLoading] = useState<boolean>(false);

    function initialize() {
        // if mode is "create" and customer is passed, set mode to "edit" instead
        if (mode === "create" && customer) {
            mode = "edit";
        }
        // if mode is "edit" and customer is passed, set editCategory to category
        else if (mode === "edit" && customer) {
            setEditCustomer(customer);
        }
        // if mode is "create" and category is not passed, set newCategory to NewCategoryInterface object
        else if (mode === "create") {
            setNewCustomer(createNewCustomerInterface({}));
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        if (mode === "create") {
            return setNewCustomer(
                (prev) => ({ ...prev, [name]: value } as NewCustomerInterface)
            );
        }

        // ===============================================================

        if (mode === "edit") {
            return setEditCustomer(
                (prev) => ({ ...prev, [name]: value } as CustomerInterface)
            );
        }
    }

    async function handleSubmit() {
        setLoading(true);
        if (mode === "create" && newCustomer) {
            try {
                const isCustomerValid =
                    validateNewCustomerInterface(newCustomer);
                if (!isCustomerValid.valid) {
                    setLoading(false);
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
                }, 1000);
            } catch (error) {
                console.error("Error creating customer:", error);
                setSnackAlert({
                    open: true,
                    message: "Failed to create customer. Please try again.",
                    severity: "error",
                });
                return setLoading(false);
            }
        }

        // ===============================================================

        if (mode === "edit" && editCustomer) {
            try {
                const isCustomerValid =
                    validateNewCustomerInterface(editCustomer);
                if (!isCustomerValid.valid) {
                    setLoading(false);
                    setSnackAlert({
                        open: true,
                        message: isCustomerValid.message,
                        severity: "error",
                    });
                    return;
                }
                await updateCustomer(editCustomer);
                setSnackAlert({
                    open: true,
                    message: "Customer updated successfully",
                    severity: "success",
                });
                setTimeout(() => {
                    handleCancelButton();
                }, 1000);
            } catch (error) {
                console.error("Error updating customer:", error);
                setSnackAlert({
                    open: true,
                    message: "Failed to update customer. Please try again.",
                    severity: "error",
                });
                return setLoading(false);
            }
        }
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <>
            <Snackbar
                open={snackAlert.open}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setSnackAlert({ ...snackAlert, open: false })}
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
            <Typography
                sx={{ mb: 1, userSelect: "none" }}
                variant="h5"
                textAlign="center"
                fontWeight="bold"
            >
                {setProductFormPopup(mode)} Customer
            </Typography>
            <FormControl fullWidth>
                <Stack
                    direction="column"
                    spacing={2}
                    sx={{
                        padding: 2,
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        w: "fit-content",
                    }}
                >
                    <TextField
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Enter customer name"
                        value={editCustomer?.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <TextField
                        type="text"
                        name="surname"
                        label="Surname"
                        placeholder="Enter customer surname"
                        value={editCustomer?.surname}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        type="text"
                        name="email"
                        label="Email"
                        placeholder="Enter customer email"
                        value={editCustomer?.email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        type="text"
                        name="phoneNumber"
                        label="Phone Number"
                        placeholder="Enter customer phone number"
                        value={editCustomer?.phoneNumber}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        type="text"
                        name="address"
                        label="Address"
                        placeholder="Enter customer address"
                        value={editCustomer?.address}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </Stack>
                <Stack
                    direction="row"
                    spacing={2}
                    mt={2}
                    width={"100%"}
                    justifyContent="center"
                >
                    <Button
                        variant="contained"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {mode === "create" ? "Create" : "Update"}
                    </Button>
                    <Button
                        variant="outlined"
                        disabled={loading}
                        onClick={handleCancelButton}
                    >
                        Cencel
                    </Button>
                </Stack>
            </FormControl>
            {mode === "edit" && (
                <Stack
                    direction="column"
                    spacing={0}
                    mt={2}
                    sx={{ textAlign: "right", userSelect: "none" }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Created at: {editCustomer?.createdAt} by:{" "}
                        {editCustomer?.createdBy}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Last update: {editCustomer?.updatedAt} by:{" "}
                        {editCustomer?.updatedBy}
                    </Typography>
                </Stack>
            )}
        </>
    );
}
