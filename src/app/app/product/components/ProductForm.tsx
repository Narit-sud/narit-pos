"use client";
import { setProductFormPopup } from "@/lib/firstLetterUppercase";
import {
    NewProductInterface,
    ProductInterface,
    createNewProductInterface,
} from "@/model/product.interface";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import BrandSelect from "../../brand/components/BrandSelect";
import { useProduct } from "../useProduct";
import { useBrand } from "@/app/app/brand/useBrand";

type Props = {
    mode: "create" | "edit" | "view";
    product?: ProductInterface;
    handleCancelButton: () => void;
};

/**
 * ProductForm component
 * This component is used to create or edit a product.
 * It takes in the following props:
 * @param mode: "create" | "edit" | "view" - the mode of the form. Default is "create"
 * @param product: ProductInterface- the product object to be edited (optional)
 * @param handleCancelButton: () => void - function to handle cancel button click
 */
export default function ProductForm({
    mode = "create",
    product,
    handleCancelButton,
}: Props) {
    const { brands } = useBrand(); // get brands from context to display
    const { createProduct, updateProduct } = useProduct(); // create product function from context
    const [editProduct, setEditProduct] = useState<
        ProductInterface | undefined
    >(product || undefined);
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
        // if mode is "edit" and product is passed, dont do anything let state initialize itself
        else if (mode === "edit" && product) {
            return;
        }
        // if mode is "create", set newProduct to NewProductInterface object
        else if (mode === "create") {
            setNewProduct(createNewProductInterface({}));
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let { name, value }: { name: string; value: number | string } =
            event.target;
        if (name === "initialQuantity" || name === "price" || name === "cost") {
            // if field is number, parse it to number
            value = parseFloat(value);
            if (isNaN(value)) {
                // if value is not a number, set it to 0
                value = 0;
            }
            if (value < 0) {
                // if value is negative, set it to positive
                value * -1;
            }
        }

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

    function getBrandId(brandId: string): void {
        if (mode === "create") {
            return setNewProduct(
                (prev) => ({ ...prev, brandId } as NewProductInterface)
            );
        }

        // ===============================================================

        if (mode === "edit") {
            return setEditProduct(
                (prev) => ({ ...prev, brandId } as ProductInterface)
            );
        }
    }

    async function handleSubmit() {
        setLoading(true);
        if (mode === "create" && newProduct) {
            // validate brand
            if (!newProduct.brandId || newProduct.brandId === "") {
                setSnackAlert({
                    open: true,
                    message: "Brand is required",
                    severity: "error",
                });
                return setLoading(false);
            }
            // validate product name
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
                setSnackAlert({
                    open: true,
                    message: "Product created successfully",
                    severity: "success",
                });
                setTimeout(() => {
                    return handleCancelButton();
                }, 1000);
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
            setLoading(true);
            const updatedProduct = editProduct as ProductInterface;
            try {
                await updateProduct(updatedProduct);
                setSnackAlert({
                    open: true,
                    message: "Product updated successfully",
                    severity: "success",
                });
                setTimeout(() => {
                    return handleCancelButton();
                }, 1000);
            } catch (error) {
                setLoading(false);
                console.error("Error updating product:", error);
                setSnackAlert({
                    open: true,
                    message: "Failed to update product. Please try again.",
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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                height: "100%",
            }}
        >
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
                fontWeight="bold"
                textAlign="center"
            >
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
                        label="Product Name"
                        placeholder="Enter product name"
                        value={
                            mode === "create"
                                ? newProduct?.name
                                : editProduct?.name
                        }
                        onChange={handleChange}
                        required
                    />
                    <BrandSelect
                        getValue={getBrandId}
                        createMode={true}
                        initialValue={
                            mode === "edit"
                                ? editProduct?.brandId
                                : brands[0]?.id
                        }
                    />
                    <TextField
                        type="number"
                        name="price"
                        label="Price"
                        placeholder="Enter product detail or comments"
                        value={
                            mode === "create"
                                ? newProduct?.price
                                : editProduct?.price
                        }
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="number"
                        name="cost"
                        label="Cost"
                        placeholder="Enter product cost"
                        value={
                            mode === "create"
                                ? newProduct?.cost
                                : editProduct?.cost
                        }
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="number"
                        name={mode === "create" ? "initialQuantity" : "stock"}
                        label={mode === "create" ? "Initial Quantity" : "Stock"}
                        placeholder={
                            mode === "create"
                                ? "Enter initial quantity"
                                : "Enter stock"
                        }
                        value={
                            mode === "create"
                                ? newProduct?.initialQuantity
                                : editProduct?.stock
                        }
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        name="detail"
                        label="Detail"
                        placeholder="Enter prodruct detail or comments"
                        value={newProduct?.detail}
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
        </Box>
    );
}
