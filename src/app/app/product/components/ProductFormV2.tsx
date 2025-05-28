import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { firstLetterUppercase } from "@/lib/firstLetterUppercase";

import BrandSelect from "@/app/app/brand/components/BrandSelect";

import {
    buildNewProduct,
    buildUpdateProduct,
    isUpdateProduct,
    NewProductInterface,
    UpdateProductInterface,
    validateProduct,
} from "@/model/product.interface";
import { useBrand } from "@/app/app/brand/useBrand";

type Props = {
    mode: "create" | "edit";
    product?: UpdateProductInterface;
    handleCancelButton: () => void;
};

export default function ProductFormV2(props: Props) {
    let { mode } = props;
    const { handleCancelButton, product } = props;
    const { brands } = useBrand();

    const [loading, setLoading] = useState<boolean>(false);
    const [snackAlert, setSnackAlert] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "warning" | "info";
        autoHide: number;
    }>({
        open: false,
        message: "",
        severity: "success",
        autoHide: 3000,
    });
    const [thisProduct, setThisProduct] = useState<
        NewProductInterface | UpdateProductInterface
    >(buildNewProduct({ brandId: brands[0].id }));

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setThisProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (Number(value) < 0) {
            setSnackAlert({
                open: true,
                message: `${firstLetterUppercase(name)} cannot be negative`,
                severity: "error",
                autoHide: 3000,
            });
            return;
        } else if (value === "" || isNaN(parseFloat(value))) {
            setThisProduct((prev) => ({ ...prev, [name]: "" }));
        } else {
            setThisProduct((prev) => ({ ...prev, [name]: parseFloat(value) }));
        }
    };

    const getBrandId = (brandId: string) => {
        setThisProduct((prev) => ({
            ...prev,
            brandId,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            validateProduct(thisProduct);
            setSnackAlert({
                open: true,
                message: "Creating product",
                severity: "info",
                autoHide: 3000,
            });
        } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                setSnackAlert({
                    open: true,
                    message: error.message.split(", ")[0],
                    severity: "error",
                    autoHide: 3000,
                });
            }
        }
    };

    useEffect(() => {
        if (mode === "create") {
            return;
        } else if (mode === "edit" && !product) {
            mode = "create";
            return;
        } else if (mode === "edit" && product) {
            setThisProduct(buildUpdateProduct(product));
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
                autoHideDuration={snackAlert.autoHide}
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
                {firstLetterUppercase(mode)} Product
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
                        value={thisProduct?.name}
                        onChange={handleTextChange}
                        required
                    />
                    <BrandSelect
                        getValue={getBrandId}
                        createMode={true}
                        initialValue={thisProduct?.brandId}
                    />
                    <TextField
                        type="number"
                        name="price"
                        label="Price"
                        placeholder="Enter product detail or comments"
                        value={thisProduct?.price}
                        onChange={handleNumberChange}
                        required
                    />
                    <TextField
                        type="number"
                        name="cost"
                        label="Cost"
                        placeholder="Enter product cost"
                        value={thisProduct?.cost}
                        onChange={handleNumberChange}
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
                        value={thisProduct?.stock}
                        onChange={handleNumberChange}
                        required
                    />
                    <TextField
                        type="text"
                        name="detail"
                        label="Detail"
                        placeholder="Enter prodruct detail or comments"
                        value={thisProduct?.detail}
                        onChange={handleTextChange}
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
            {mode === "edit" && isUpdateProduct(thisProduct) && (
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
