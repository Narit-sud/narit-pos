"use client";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import PopupModal from "@/components/PopupModal";
import { Add } from "@mui/icons-material";
import { useState } from "react";

export default function Page() {
    const [productFormPopup, setProductFormPopup] = useState<{
        open: boolean;
        mode: "edit" | "create";
    }>({ open: false, mode: "create" });

    const handleOpen = (mode: "edit" | "create") => {
        setProductFormPopup({ open: true, mode });
    };

    const handleClose = () => {
        setProductFormPopup({ open: false, mode: "create" });
    };

    return (
        <Paper
            elevation={3}
            sx={{ padding: 4, userSelect: "none", fontWeight: "bold" }}
        >
            {productFormPopup.open && (
                <PopupModal
                    open={productFormPopup.open}
                    handleClose={handleClose}
                >
                    <ProductForm
                        mode="create"
                        handleCancelButton={handleClose}
                    />
                </PopupModal>
            )}
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                sx={{ marginBottom: 2 }}
            >
                <Typography variant="h5">Products</Typography>
                <Button
                    variant="contained"
                    onClick={() => handleOpen("create")}
                >
                    <Add />
                    New
                </Button>
            </Stack>
            <ProductTable />
        </Paper>
    );
}
