"use client";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import CategorySelect from "@/app/app/category/components/CategorySelect";
import BrandSelect from "@/app/app/brand/components/BrandSelect";
import {
    ProductInterface,
    NewProductInface,
    createProductInterface,
    createNewProductInterface,
} from "@/model/product.interface";
import { useState, useEffect } from "react";

type Props = {
    mode: "create" | "edit";
    product?: ProductInterface;
};

export default function ProductForm({ mode = "create", product }: Props) {
    const [currentProduct, setCurrentProduct] = useState<
        ProductInterface | NewProductInface | undefined
    >(undefined);

    function initialize() {
        if (product) {
            setCurrentProduct(product);
        } else {
            setCurrentProduct(createProductInterface({}));
        }
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Stack direction="column" spacing={2}>
            {JSON.stringify(currentProduct)}
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="product-name">Product Name</InputLabel>
                <TextField
                    id="product-name"
                    label="Product Name"
                    variant="outlined"
                />
            </FormControl>
            <CategorySelect />
            <BrandSelect />
        </Stack>
    );
}
