"use client";
import { useState } from "react";

import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";

import PopupModal from "@/components/PopupModal";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Add from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Page() {
    const [categoryFormPopup, setCategoryFormPopup] = useState<{
        open: boolean;
        mode: "edit" | "create" | "view";
    }>({ open: false, mode: "create" });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpen = (mode: "edit" | "create") => {
        setCategoryFormPopup({ open: true, mode });
    };

    const handleClose = () => {
        setCategoryFormPopup({ open: false, mode: "create" });
    };
    return (
        <>
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
                        <CategoryIcon sx={{ fontSize: { xs: 28, sm: 36 } }} />
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{
                                fontSize: { xs: "1.5rem", sm: "2rem" },
                            }}
                        >
                            Categories
                        </Typography>
                    </Stack>

                    {!isMobile && (
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => handleOpen("create")}
                            sx={{ borderRadius: 2 }}
                        >
                            Add New Category
                        </Button>
                    )}
                </Stack>

                <CategoryTable />
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
