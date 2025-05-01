"use client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createBrandInterface, type BrandInterface } from "../interface";
import { useState } from "react";

type Props = {
    brand?: BrandInterface;
};

export default function BrandForm({ brand }: Props) {
    const [currentBrand, setCurrentBrand] = useState<BrandInterface>(
        brand || createBrandInterface({})
    );

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setCurrentBrand((prevBrand) => ({
            ...prevBrand,
            [name]: value,
        }));
    }
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
                        type="text"
                        name="name"
                        label="Brand Name"
                        placeholder="Enter brand name"
                        value={currentBrand.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        name="detail"
                        label="Detail"
                        placeholder="Enter brand detail or comments"
                        value={currentBrand.detail}
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
