"use client";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";
import PopupModal from "@/components/PopupModal";
import { Add } from "@mui/icons-material";
import { useState } from "react";

export default function Page() {
    const [categoryFormPopup, setCategoryFormPopup] = useState<{
        open: boolean;
        mode: "edit" | "create" | "view";
    }>({ open: false, mode: "create" });

    const handleOpen = (mode: "edit" | "create") => {
        setCategoryFormPopup({ open: true, mode });
    };

    const handleClose = () => {
        setCategoryFormPopup({ open: false, mode: "create" });
    };

    return (
        <Paper
            elevation={3}
            sx={{ padding: 4, userSelect: "none", fontWeight: "bold" }}
        >
            {categoryFormPopup.open && (
                <PopupModal
                    open={categoryFormPopup.open}
                    handleClose={handleClose}
                >
                    <CategoryForm
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
                    Categories
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => handleOpen("create")}
                >
                    <Add />
                    New
                </Button>
            </Stack>
            <CategoryTable />
        </Paper>
    );
}
