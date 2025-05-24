"use client";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import OrderTable from "@/app/app/order/components/OrderTable";
import PopupModal from "@/components/PopupModal";

import PeopleIcon from "@mui/icons-material/People";
import Add from "@mui/icons-material/Add";

import { useState } from "react";

export default function Page() {
    const [customerFormPopup, setCustomerFormPopup] = useState<{
        open: boolean;
        mode: "edit" | "create" | "view";
    }>({ open: false, mode: "create" });
    return (
        <Paper
            elevation={2}
            sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                mb: 3,
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                sx={{ marginBottom: 2 }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    color="primary.main"
                >
                    <PeopleIcon sx={{ fontSize: { xs: 28, sm: 36 } }} />
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem" },
                        }}
                    >
                        Orders
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpen("create")}
                >
                    New
                </Button>
            </Stack>
            <OrderTable />
        </Paper>
    );
}
