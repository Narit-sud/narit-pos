"use client";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
    CategoryInterface,
    createCategoryInterface,
    NewCategoryInterface,
} from "@/model/category.interface";
import { useCategory } from "@/app/app/category/useCategory";
import { createCategoryService } from "../service";
import { useEffect, useState } from "react";

type Props = {
    mode: "create" | "edit";
    category?: CategoryInterface;
    handleCancelButton: () => void;
};

export default function CategoryForm({
    mode,
    category,
    handleCancelButton,
}: Props) {
    const { loadCategories } = useCategory();
    const [editCategory, setEditCategory] = useState<
        CategoryInterface | undefined
    >(undefined);
    const [createCategory, setCreateCategory] = useState<
        NewCategoryInterface | undefined
    >(undefined);
    const [snackAlert, setSnackAlert] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "info" | "warning";
    }>({ open: false, message: "", severity: "success" });

    function initialize() {
        if (mode === "edit" && category) {
            setEditCategory(category);
        } else if (mode === "create") {
            setCreateCategory(createCategoryInterface({}));
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        if (mode === "edit" && editCategory) {
            setEditCategory(
                (prev) => ({ ...prev, [name]: value }) as CategoryInterface,
            );
        } else if (mode === "create" && createCategory) {
            setCreateCategory(
                (prev) => ({ ...prev, [name]: value }) as NewCategoryInterface,
            );
        }
    }

    async function handleCreateButton() {
        // handle edit category
        if (mode === "edit" && editCategory) {
            if (!editCategory.name || editCategory.name === "") {
                setSnackAlert({
                    open: true,
                    message: "Category name is required",
                    severity: "error",
                });
                return;
            }
            console.log("editCategory", editCategory);
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
                return;
            }
            console.log("createCategory", createCategory);
            try {
                await createCategoryService(createCategory);
                setSnackAlert({
                    open: true,
                    message: "Category created successfully",
                    severity: "success",
                });
                await loadCategories();
                handleCancelButton();
            } catch (error) {
                console.error("Error creating category:", error);
                setSnackAlert({
                    open: true,
                    message: "Failed to create category",
                    severity: "error",
                });
                return;
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
            <Typography variant="h6" component="h2" fontWeight="bold">
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
                                : createCategory?.name
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
                                : createCategory?.detail
                        }
                        onChange={handleChange}
                    />
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                    >
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={handleCancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleCreateButton}
                        >
                            Create
                        </Button>
                    </Stack>
                </Stack>
            </FormControl>
        </>
    );
}
