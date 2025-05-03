"use client";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import BrandForm from "./components/BrandForm";
import Typography from "@mui/material/Typography";
import BrandTable from "./components/BrandTable";
import PopupModal from "@/components/PopupModal";
import { Add } from "@mui/icons-material";
import { useState } from "react";

export default function Page() {
    const [brandFormPopup, setBrandFormPopup] = useState<{
        open: boolean;
        mode: "edit" | "create";
    }>({ open: false, mode: "create" });

    const handleOpen = (mode: "edit" | "create") => {
        setBrandFormPopup({ open: true, mode });
    };

    const handleClose = () => {
        setBrandFormPopup({ open: false, mode: "create" });
    };

    return (
        <Paper elevation={3} sx={{ padding: 4 }}>
            {brandFormPopup.open && (
                <PopupModal
                    open={brandFormPopup.open}
                    handleClose={handleClose}
                >
                    <BrandForm mode="create" />
                </PopupModal>
            )}
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                sx={{ marginBottom: 2 }}
            >
                <Typography variant="h5">Brands</Typography>
                <Button
                    variant="contained"
                    onClick={() => handleOpen("create")}
                >
                    <Add />
                    New
                </Button>
            </Stack>
            <BrandTable />
        </Paper>
    );
}
