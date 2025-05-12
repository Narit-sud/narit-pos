"use client";
import { useState } from "react";

import PopupModal from "@/components/PopupModal";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";

import Add from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Page() {
    const [productFormPopup, setProductFormPopup] = useState<{
        open: boolean;
        mode: "edit" | "create";
    }>({ open: false, mode: "create" });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpen = (mode: "edit" | "create") => {
        setProductFormPopup({ open: true, mode });
    };

    const handleClose = () => {
        setProductFormPopup({ open: false, mode: "create" });
    };
    return (
        <>
            {productFormPopup.open && (
                <PopupModal
                    open={productFormPopup.open}
                    handleClose={handleClose}
                    width={600}
                >
                    <ProductForm
                        mode="create"
                        handleCancelButton={handleClose}
                    />
                </PopupModal>
            )}

            <Paper
                elevation={2}
                sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    mb: 3,
                }}
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    sx={{ mb: { xs: 2, sm: 3 } }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        color="primary.main"
                    >
                        <InventoryIcon sx={{ fontSize: { xs: 28, sm: 36 } }} />
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{
                                fontSize: { xs: "1.5rem", sm: "2rem" },
                            }}
                        >
                            Products
                        </Typography>
                    </Stack>

                    {!isMobile && (
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => handleOpen("create")}
                            sx={{ borderRadius: 2 }}
                        >
                            Add New Product
                        </Button>
                    )}
                </Stack>

                <ProductTable />
            </Paper>

            {isMobile && (
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: "fixed",
                        bottom: 16,
                        right: 16,
                        zIndex: 1000,
                    }}
                    onClick={() => handleOpen("create")}
                >
                    <Add />
                </Fab>
            )}
        </>
    );
}
