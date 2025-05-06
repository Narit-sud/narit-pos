"use client";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CategorySelect from "../../category/components/CategorySelect";
import {
    ProductInterface,
    NewProductInterface,
    createNewProductInterface,
} from "@/model/product.interface";
import { setProductFormPopup } from "@/lib/firstLetterUppercase";
import { useState, useEffect } from "react";
import { useProduct } from "../useProduct";

type Props = {
    mode: "create" | "edit" | "view";
    product?: ProductInterface;
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
export default function ProductForm({
    mode = "create",
    product,
    handleCancelButton,
}: Props) {
    const { createProduct } = useProduct(); // get categories from context to display
    const [editProduct, setEditProduct] = useState<
        ProductInterface | undefined
    >(undefined);
    const [newProduct, setNewProduct] = useState<
        NewProductInterface | undefined
    >(undefined);
    const [snackAlert, setSnackAlert] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "info" | "warning";
    }>({ open: false, message: "", severity: "success" });
    const [loading, setLoading] = useState<boolean>(false);

    function initialize() {
        // if mode is "create" and product is passed, set mode to "edit" instead
        if (mode === "create" && product) {
            mode = "edit";
        }
        // if mode is "edit" and product is passed, set editCategory to category
        else if (mode === "edit" && product) {
            setEditProduct(product);
        }
        // if mode is "create" and category is not passed, set newCategory to NewCategoryInterface object
        else if (mode === "create") {
            setNewProduct(createNewProductInterface({}));
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        if (mode === "create") {
            return setNewProduct(
                (prev) => ({ ...prev, [name]: value } as NewProductInterface)
            );
        }

        // ===============================================================

        if (mode === "edit") {
            return setEditProduct(
                (prev) => ({ ...prev, [name]: value } as ProductInterface)
            );
        }
    }

    function getCategoryId(categoryId: string): void {
        if (mode === "create") {
            return setNewProduct(
                (prev) => ({ ...prev, categoryId } as NewProductInterface)
            );
        }

        // ===============================================================

        if (mode === "edit") {
            return setEditProduct(
                (prev) =>
                    ({ ...prev, category: categoryId } as ProductInterface)
            );
        }
    }

    async function handleSubmit() {
        setLoading(true);
        if (mode === "create" && newProduct) {
            // validate category
            if (!newProduct.categoryId || newProduct.categoryId === "") {
                setSnackAlert({
                    open: true,
                    message: "Category is required",
                    severity: "error",
                });
                return setLoading(false);
            }
            // validate brand name
            else if (
                !newProduct.name ||
                newProduct.name === "" ||
                newProduct.name.length < 3
            ) {
                setSnackAlert({
                    open: true,
                    message: "Product name is required",
                    severity: "error",
                });
                return setLoading(false);
            }
            try {
                await createProduct(newProduct);
                handleCancelButton();
            } catch (error) {
                console.error("Error creating product:", error);
                setSnackAlert({
                    open: true,
                    message: "Failed to create product. Please try again.",
                    severity: "error",
                });
                return setLoading(false);
            }
        }

        // ===============================================================

        if (mode === "edit") {
            const updatedProrduct = editProduct as ProductInterface;
            console.log("updatedProrduct", updatedProrduct);
            // TODO: implement update product function
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
            <Typography sx={{ mb: 1, userSelect: "none" }} variant="h5">
                {setProductFormPopup(mode)} Product
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
                        label="Prodruct Name"
                        placeholder="Enter product name"
                        value={editProduct?.name}
                        onChange={handleChange}
                        required
                    />
                    <CategorySelect getValue={getCategoryId} />
                    <TextField
                        type="text"
                        name="detail"
                        label="Detail"
                        placeholder="Enter prodruct detail or comments"
                        value={editProduct?.detail}
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
                        Created at: {editProduct?.createdAt} by:{" "}
                        {editProduct?.createdBy}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Last update: {editProduct?.updatedAt} by:{" "}
                        {editProduct?.updatedBy}
                    </Typography>
                </Stack>
            )}
        </>
    );
}
