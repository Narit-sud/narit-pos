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
import { createBrandService } from "../service";
import { useBrand } from "../useBrand";

type Props = {
    mode: "create" | "edit";
    brand?: BrandInterface;
    handleCancelButton: () => void;
};

export default function BrandForm({ mode, brand, handleCancelButton }: Props) {
    const { createBrand } = useBrand(); // get categories from context to display
    const [currentBrand, setCurrentBrand] = useState<
        NewBrandInterface | BrandInterface | undefined
    >(undefined);
    const [nameError, setNameError] = useState<{
        error: boolean;
        message: string;
    }>({ error: false, message: "" });

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
        if (nameError.error) setNameError({ error: false, message: "" });
        if (name === "name" && value.length < 3) {
            setNameError({
                error: true,
                message: "Brand name must be at least 3 characters long",
            });
        }

        if (mode === "create") {
            return setCurrentBrand(
                (prev) => ({ ...prev, [name]: value } as NewBrandInterface)
            );
        }
        if (mode === "edit") {
            return setCurrentBrand(
                (prev) => ({ ...prev, [name]: value } as BrandInterface)
            );
        }
    }

    function getCategoryId(categoryId: string): void {
        if (mode === "create") {
            return setCurrentBrand(
                (prev) => ({ ...prev, categoryId } as NewBrandInterface)
            );
        }
        if (mode === "edit") {
            return setCurrentBrand(
                (prev) => ({ ...prev, category: categoryId } as BrandInterface)
            );
        }
    }

    async function handleSubmit() {
        if (mode === "create") {
            const newBrand = currentBrand as NewBrandInterface;
            try {
                await createBrand(newBrand);
                handleCancelButton();
            } catch (error) {
                console.error("Error creating brand:", error);
            }
        }
        if (mode === "edit") {
            const updatedBrand = currentBrand as BrandInterface;
            console.log("updatedBrand", updatedBrand);
            // TODO: implement update brand function
        }
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Box>
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
                        error={nameError.error}
                        helperText={nameError.message}
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
                    <Button variant="contained" onClick={handleSubmit}>
                        {mode === "create" ? "Create" : "Update"}
                    </Button>
                    <Button variant="outlined" onClick={handleCancelButton}>
                        Cencel
                    </Button>
                </Stack>
            </FormControl>
            {mode === "edit" && (
                <Stack direction="row" spacing={2} mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        Created at: {currentBrand?.createdAt}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Updated at: {currentBrand?.updatedAt}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Created by: {currentBrand?.createdBy}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Updated by: {currentBrand?.updatedBy}
                    </Typography>
                </Stack>
            )}
        </Box>
    );
}
