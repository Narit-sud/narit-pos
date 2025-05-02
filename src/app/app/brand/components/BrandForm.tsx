"use client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CategorySelect from "../../category/components/CategorySelect";
import {
    createBrandInterface,
    createNewBrandInterface,
    type BrandInterface,
    type NewBrandInterface,
} from "@/model/brand.interface";
import { useState, useEffect } from "react";

type Props = {
    mode: "create" | "edit";
    brand?: BrandInterface;
};

export default function BrandForm({ mode, brand }: Props) {
    const [currentBrand, setCurrentBrand] = useState<
        NewBrandInterface | BrandInterface | undefined
    >(undefined);

    function initialize() {
        if (mode === "create") {
            return setCurrentBrand(createNewBrandInterface({}));
        }
        if (mode === "edit" && brand) {
            return setCurrentBrand(brand);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        if (mode === "create") {
            return setCurrentBrand(
                (prev) => ({ ...prev, [name]: value }) as NewBrandInterface,
            );
        }
        if (mode === "edit") {
            return setCurrentBrand(
                (prev) => ({ ...prev, [name]: value }) as BrandInterface,
            );
        }
    }

    function getCategoryId(categoryId: string): void {
        if (mode === "create") {
            return setCurrentBrand(
                (prev) => ({ ...prev, categoryId }) as NewBrandInterface,
            );
        }
        if (mode === "edit") {
            return setCurrentBrand(
                (prev) => ({ ...prev, category: categoryId }) as BrandInterface,
            );
        }
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Box>
            {JSON.stringify(currentBrand)}
            <FormControl>
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
                        value={currentBrand?.name}
                        onChange={handleChange}
                        required
                    />
                    <CategorySelect getValue={getCategoryId} />
                    <TextField
                        type="text"
                        name="detail"
                        label="Detail"
                        placeholder="Enter brand detail or comments"
                        value={currentBrand?.detail}
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
                    <Button variant="contained">Create</Button>
                    <Button variant="outlined">Cencel</Button>
                </Stack>
            </FormControl>
        </Box>
    );
}
