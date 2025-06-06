"use client";
import { firstLetterUppercase } from "@/lib/firstLetterUppercase";
import {
    createNewBrandInterface,
    type BrandInterface,
    type NewBrandInterface,
} from "@/model/brand.interface";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import CategorySelect from "../../category/components/CategorySelect";
import { useBrand } from "../useBrand";

type Props = {
    mode: "create" | "edit" | "view";
    brand?: BrandInterface;
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
export default function BrandForm({
    mode = "create",
    brand,
    handleCancelButton,
}: Props) {
    const { createBrand, updateBrand } = useBrand(); // get categories from context to display
    const [editBrand, setEditBrand] = useState<BrandInterface | undefined>(
        undefined
    );
    const [newBrand, setNewBrand] = useState<NewBrandInterface | undefined>(
        undefined
    );
    const [snackAlert, setSnackAlert] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "info" | "warning";
    }>({ open: false, message: "", severity: "success" });
    const [loading, setLoading] = useState<boolean>(false);

    function initialize() {
        // if mode is "create" and brand is passed, set mode to "edit" instead
        if (mode === "create" && brand) {
            mode = "edit";
        }
        // if mode is "edit" and brand is passed, set editCategory to category
        else if (mode === "edit" && brand) {
            setEditBrand(brand);
        }
        // if mode is "create" and category is not passed, set newCategory to NewCategoryInterface object
        else if (mode === "create") {
            setNewBrand(createNewBrandInterface({}));
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        if (mode === "create") {
            return setNewBrand(
                (prev) => ({ ...prev, [name]: value } as NewBrandInterface)
            );
        }

        // ===============================================================

        if (mode === "edit") {
            return setEditBrand(
                (prev) => ({ ...prev, [name]: value } as BrandInterface)
            );
        }
    }

    function getCategoryId(categoryId: string): void {
        if (mode === "create") {
            return setNewBrand(
                (prev) => ({ ...prev, categoryId } as NewBrandInterface)
            );
        }

        // ===============================================================

        if (mode === "edit") {
            return setEditBrand(
                (prev) => ({ ...prev, categoryId } as BrandInterface)
            );
        }
    }

    async function handleSubmit() {
        setLoading(true);
        if (mode === "create" && newBrand) {
            // validate category
            if (!newBrand.categoryId || newBrand.categoryId === "") {
                setSnackAlert({
                    open: true,
                    message: "Category is required",
                    severity: "error",
                });
                return setLoading(false);
            }
            // validate brand name
            else if (
                !newBrand.name ||
                newBrand.name === "" ||
                newBrand.name.length < 3
            ) {
                setSnackAlert({
                    open: true,
                    message: "Brand name is required",
                    severity: "error",
                });
                return setLoading(false);
            }
            try {
                await createBrand(newBrand);
                handleCancelButton();
            } catch (error) {
                console.error("Error creating brand:", error);
                setSnackAlert({
                    open: true,
                    message: "Failed to create brand. Please try again.",
                    severity: "error",
                });
                return setLoading(false);
            }
        }

        // ===============================================================

        if (mode === "edit") {
            try {
                const updatedBrand = editBrand as BrandInterface;
                await updateBrand(updatedBrand);
                setSnackAlert({
                    open: true,
                    message: "Brand updated successfully",
                    severity: "success",
                });
                setTimeout(() => {
                    handleCancelButton();
                }, 1000);
            } catch (error) {
                if (error instanceof Error) {
                    setLoading(false);
                    setSnackAlert({
                        open: true,
                        message: error.message,
                        severity: "error",
                    });
                }
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
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setSnackAlert({ ...snackAlert, open: false })}
            >
                <Alert
                    onClose={() =>
                        setSnackAlert({ ...snackAlert, open: false })
                    }
                    variant="filled"
                    severity={snackAlert.severity}
                    sx={{ width: "380px" }}
                >
                    {snackAlert.message}
                </Alert>
            </Snackbar>
            <Typography sx={{ mb: 1, userSelect: "none" }} variant="h5">
                {firstLetterUppercase(mode)} Brand
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
                        label="Brand Name"
                        placeholder="Enter brand name"
                        value={editBrand?.name}
                        onChange={handleChange}
                        required
                    />
                    <CategorySelect
                        getValue={getCategoryId}
                        initialValue={brand?.categoryId}
                    />
                    <TextField
                        type="text"
                        name="detail"
                        label="Detail"
                        placeholder="Enter brand detail or comments"
                        value={editBrand?.detail}
                        onChange={handleChange}
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
                        color={mode === "edit" ? "warning" : "primary"}
                    >
                        {mode === "create" ? "Create" : "Update"}
                    </Button>
                    <Button
                        variant="outlined"
                        disabled={loading}
                        onClick={handleCancelButton}
                        color={mode === "edit" ? "warning" : "primary"}
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
                        Created at: {editBrand?.createdAt} by:{" "}
                        {editBrand?.createdBy}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Last update: {editBrand?.updatedAt} by:{" "}
                        {editBrand?.updatedBy}
                    </Typography>
                </Stack>
            )}
        </>
    );
}
