"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import BrandSelect from "@/app/app/brand/components/BrandSelect";

import { firstLetterUppercase } from "@/lib/firstLetterUppercase";

import { NewProduct, UpdateProduct } from "@/class/Product.class";

import { useEffect, useState } from "react";
import { useBrand } from "@/app/app/brand/useBrand";
import { useProduct } from "@/app/app/product/useProduct";

type Props = {
    mode: "create" | "edit";
    product?: NewProduct;
    handleCancelButton: () => void;
};

export default function ProductFormV2(props: Props) {
    let { mode, product, handleCancelButton } = props;
    const { brands } = useBrand();
    const { createProduct, updateProduct } = useProduct();

    const [loading, setLoading] = useState(false);
    const [snackAlert, setSnackAlert] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "info";
    }>({
        open: false,
        message: "",
        severity: "info",
    });
    const [thisProduct, setThisProduct] = useState<NewProduct | UpdateProduct>(
        new NewProduct({})
    );
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "stock" || name === "price" || name === "cost") {
            // For empty input or non-numeric values, use empty string instead of 0
            if (value === "" || isNaN(parseFloat(value))) {
                setThisProduct(
                    (prev) => ({ ...prev, [name]: "" } as NewProduct)
                );
            } else {
                setThisProduct(
                    (prev) =>
                        ({ ...prev, [name]: parseFloat(value) } as NewProduct)
                );
            }
        } else {
            setThisProduct(
                (prev) => ({ ...prev, [name]: value } as NewProduct)
            );
        }
    };

    const handleSubmit = async () => {
        // validate new product or update product
        try {
            setLoading(true);
            await createProduct(thisProduct);
        } catch (error) {
            setLoading(false);
            setSnackAlert({
                open: true,
                message: "Error creating product",
                severity: "error",
            });
            console.error("Error creating product:", error);
        }
    };

    const getBrandId = (brandId: string) => {
        setThisProduct((prev) => {
            if (prev) {
                return { ...prev, brandId } as NewProduct;
            }
            return prev;
        });
    };

    useEffect(() => {
        if (mode === "edit" && product) {
            setThisProduct(product);
            return;
        } else if (mode === "edit" && !product) {
            mode = "create";
            setThisProduct(new NewProduct({}));
            return;
        } else if (mode === "create") {
            return;
        }
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
            <Typography
                sx={{ mb: 1, userSelect: "none" }}
                variant="h5"
                fontWeight="bold"
                textAlign="center"
            >
                {firstLetterUppercase(JSON.stringify(mode).replace(/"/g, ``))}{" "}
                Product V2
            </Typography>
            {JSON.stringify(thisProduct)}
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
                        value={thisProduct?.name}
                        onChange={handleChange}
                        required
                    />
                    <BrandSelect
                        getValue={getBrandId}
                        createMode={true}
                        initialValue={thisProduct?.brandId || brands[0]?.id}
                    />
                    <TextField
                        type="number"
                        name="price"
                        label="Price"
                        placeholder="Enter product detail or comments"
                        value={thisProduct?.price}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="number"
                        name="cost"
                        label="Cost"
                        placeholder="Enter product cost"
                        value={thisProduct?.cost}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="number"
                        name="stock"
                        label={mode === "create" ? "Initial Quantity" : "Stock"}
                        placeholder={
                            mode === "create"
                                ? "Enter initial quantity"
                                : "Enter stock"
                        }
                        value={thisProduct?.stock}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        name="detail"
                        label="Detail"
                        placeholder="Enter prodruct detail or comments"
                        value={thisProduct?.detail}
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
            {mode === "edit" && thisProduct instanceof UpdateProduct && (
                <Stack
                    direction="column"
                    spacing={0}
                    mt={2}
                    sx={{ textAlign: "right", userSelect: "none" }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Created at: {thisProduct?.createdAt} by:{" "}
                        {thisProduct?.createdBy}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Last update: {thisProduct?.updatedAt} by:{" "}
                        {thisProduct?.updatedBy}
                    </Typography>
                </Stack>
            )}
        </Box>
    );
}
