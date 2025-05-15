"use client";
import { useBrand } from "@/app/app/brand/useBrand";
import { useCategory } from "@/app/app/category/useCategory";
import {
    CategoryInterface,
    createNewCategoryInterface,
    NewCategoryInterface,
} from "@/model/category.interface";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

type Props = {
    mode: "create" | "edit" | "view";
    category?: CategoryInterface;
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
export default function CategoryForm({
    mode = "create",
    category,
    handleCancelButton,
}: Props) {
    const { createCategory, updateCategory } = useCategory();
    const { loadBrands } = useBrand();
    const [editCategory, setEditCategory] = useState<
        CategoryInterface | undefined
    >(undefined);
    const [newCategory, setNewCategory] = useState<
        NewCategoryInterface | undefined
    >(undefined);
    const [snackAlert, setSnackAlert] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "info" | "warning";
    }>({ open: false, message: "", severity: "success" });
    const [loading, setLoading] = useState<boolean>(false);

    function initialize() {
        // if mode is "create" and category is passed, set mode to "edit" instead
        if (mode === "create" && category) {
            mode = "edit";
        }
        // if mode is "edit" and category is passed, set editCategory to category
        else if (mode === "edit" && category) {
            setEditCategory(category);
        }
        // if mode is "create" and category is not passed, set newCategory to NewCategoryInterface object
        else if (mode === "create") {
            setNewCategory(createNewCategoryInterface({}));
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        if (mode === "edit" && editCategory) {
            setEditCategory(
                (prev) => ({ ...prev, [name]: value } as CategoryInterface)
            );
        } else if (mode === "create" && newCategory) {
            setNewCategory(
                (prev) => ({ ...prev, [name]: value } as NewCategoryInterface)
            );
        }
    }

    async function handleSubmitButton() {
        setLoading(true);
        //  handle edit category
        if (mode === "edit" && editCategory) {
            if (!editCategory.name || editCategory.name === "") {
                setSnackAlert({
                    open: true,
                    message: "Category name is required",
                    severity: "error",
                });
                return;
            }
            try {
                await updateCategory(editCategory);
                await loadBrands();
                setSnackAlert({
                    open: true,
                    message: "Category updated successfully",
                    severity: "success",
                });
                setTimeout(() => {
                    handleCancelButton();
                }, 1000);
            } catch (error) {
                console.error("Error updating category:", error);
                if (error instanceof Error) {
                    setSnackAlert({
                        open: true,
                        message: error.message,
                        severity: "error",
                    });
                    return setLoading(false);
                }
            }
        }

        // ===============================================================
        // handle create category
        if (mode === "create" && createCategory) {
            if (!createCategory.name || createCategory.name === "") {
                setSnackAlert({
                    open: true,
                    message: "Category name is required",
                    severity: "error",
                });
                return setLoading(false);
            }
            try {
                if (newCategory) await createCategory(newCategory);
                setSnackAlert({
                    open: true,
                    message: "Category created successfully",
                    severity: "success",
                });
                setTimeout(() => {
                    handleCancelButton();
                }, 1000);
            } catch (error) {
                console.error("Error creating category:", error);
                setSnackAlert({
                    open: true,
                    message: "Failed to create category. Please try again.",
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
                {mode === "edit" ? "Edit Category" : "Create New Category"}
            </Typography>

            <FormControl>
                <Stack
                    padding={2}
                    display="flex"
                    direction="column"
                    spacing={1}
                >
                    <TextField
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Enter category name"
                        value={
                            mode === "edit"
                                ? editCategory?.name
                                : newCategory?.name
                        }
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        name="detail"
                        label="Detail"
                        placeholder="Enter detail or comment"
                        value={
                            mode === "edit"
                                ? editCategory?.detail
                                : newCategory?.detail
                        }
                        onChange={handleChange}
                    />
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            color={mode === "edit" ? "warning" : "primary"}
                            onClick={handleSubmitButton}
                        >
                            {mode === "create" ? "Create" : "Update"}
                        </Button>{" "}
                        <Button
                            type="button"
                            variant="outlined"
                            disabled={loading}
                            color={mode === "edit" ? "warning" : "primary"}
                            onClick={handleCancelButton}
                        >
                            Cancel
                        </Button>
                    </Stack>
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
                        Created at: {editCategory?.createdAt} by:{" "}
                        {editCategory?.createdBy}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Last update: {editCategory?.updatedAt} by:{" "}
                        {editCategory?.updatedBy}
                    </Typography>
                </Stack>
            )}
        </>
    );
}
