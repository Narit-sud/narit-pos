"use client";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
    createNewSupplierInterface,
    validateNewSupplierInterface,
    type SupplierInterface,
    type NewSupplierInterface,
} from "@/model/supplier.interface";
import { setProductFormPopup } from "@/lib/firstLetterUppercase";
import { useState, useEffect } from "react";
import { useSupplier } from "../useSupplier";

type Props = {
    mode: "create" | "edit" | "view";
    supplier?: SupplierInterface;
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
export default function SupplierForm({
    mode = "create",
    supplier,
    handleCancelButton,
}: Props) {
    const { createSupplier, updateSupplier } = useSupplier(); // get categories from context to display
    const [editSupplier, setEditSupplier] = useState<SupplierInterface | null>(
        null
    );
    const [newSupplier, setNewSupplier] = useState<NewSupplierInterface | null>(
        null
    );
    const [snackAlert, setSnackAlert] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "info" | "warning";
    }>({ open: false, message: "", severity: "success" });
    const [loading, setLoading] = useState<boolean>(false);

    function initialize() {
        // if mode is "create" and supplier is passed, set mode to "edit" instead
        if (mode === "create" && supplier) {
            mode = "edit";
        }
        // if mode is "edit" and supplier is passed, set editCategory to category
        else if (mode === "edit" && supplier) {
            setEditSupplier(supplier);
        }
        // if mode is "create" and category is not passed, set newCategory to NewCategoryInterface object
        else if (mode === "create") {
            setNewSupplier(createNewSupplierInterface({}));
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        if (mode === "create") {
            return setNewSupplier(
                (prev) => ({ ...prev, [name]: value } as NewSupplierInterface)
            );
        }

        // ===============================================================

        if (mode === "edit") {
            return setEditSupplier(
                (prev) => ({ ...prev, [name]: value } as SupplierInterface)
            );
        }
    }

    async function handleSubmit() {
        setLoading(true);
        if (mode === "create" && newSupplier) {
            try {
                const isSupplierValid =
                    validateNewSupplierInterface(newSupplier);
                if (!isSupplierValid.valid) {
                    setLoading(false);
                    setSnackAlert({
                        open: true,
                        message: isSupplierValid.message,
                        severity: "error",
                    });
                    return;
                }
                await createSupplier(newSupplier);
                setSnackAlert({
                    open: true,
                    message: "Supplier created successfully",
                    severity: "success",
                });
                setTimeout(() => {
                    handleCancelButton();
                }, 1000);
            } catch (error) {
                console.error("Error creating supplier:", error);
                setSnackAlert({
                    open: true,
                    message: "Failed to create supplier. Please try again.",
                    severity: "error",
                });
                return setLoading(false);
            }
        }

        // ===============================================================

        if (mode === "edit" && editSupplier) {
            try {
                const isSupplierValid =
                    validateNewSupplierInterface(editSupplier);
                if (!isSupplierValid.valid) {
                    setLoading(false);
                    setSnackAlert({
                        open: true,
                        message: isSupplierValid.message,
                        severity: "error",
                    });
                    return;
                }
                await updateSupplier(editSupplier);
                setSnackAlert({
                    open: true,
                    message: "Supplier updated successfully",
                    severity: "success",
                });
                setTimeout(() => {
                    handleCancelButton();
                }, 1000);
            } catch (error) {
                console.error("Error updating supplier:", error);
                setSnackAlert({
                    open: true,
                    message: "Failed to update supplier. Please try again.",
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
                {setProductFormPopup(mode)} Supplier
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
                        placeholder="Enter supplier name"
                        value={editSupplier?.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <TextField
                        type="text"
                        name="surname"
                        label="Surname"
                        placeholder="Enter supplier surname"
                        value={editSupplier?.surname}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        type="text"
                        name="phoneNumber"
                        label="Phone Number"
                        placeholder="Enter supplier phone number"
                        value={editSupplier?.phoneNumber}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        type="text"
                        name="address"
                        label="Address"
                        placeholder="Enter supplier address"
                        value={editSupplier?.address}
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
                        Created at: {editSupplier?.createdAt} by:{" "}
                        {editSupplier?.createdBy}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Last update: {editSupplier?.updatedAt} by:{" "}
                        {editSupplier?.updatedBy}
                    </Typography>
                </Stack>
            )}
        </>
    );
}
