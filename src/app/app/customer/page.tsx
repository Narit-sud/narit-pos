"use client";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomerForm from "./components/CustomerForm";
import CustomerTable from "./components/CustomerTable";
import PopupModal from "@/components/PopupModal";
import { Add } from "@mui/icons-material";
import { useState } from "react";

export default function Page() {
    const [customerFormPopup, setCustomerFormPopup] = useState<{
        open: boolean;
        mode: "edit" | "create" | "view";
    }>({ open: false, mode: "create" });

    const handleOpen = (mode: "edit" | "create") => {
        setCustomerFormPopup({ open: true, mode });
    };

    const handleClose = () => {
        setCustomerFormPopup({ open: false, mode: "create" });
    };

    return (
        <Paper
            elevation={3}
            sx={{ padding: 4, userSelect: "none", fontWeight: "bold" }}
        >
            {customerFormPopup.open && (
                <PopupModal
                    open={customerFormPopup.open}
                    handleClose={handleClose}
                >
                    <CustomerForm
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
                <Typography variant="h4" fontWeight="bold">
                    Customers
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpen("create")}
                >
                    New
                </Button>
            </Stack>
            <CustomerTable />
        </Paper>
    );
}
