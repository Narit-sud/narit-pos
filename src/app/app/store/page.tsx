"use client";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StoreTable from "@/app/app/store/components/StoreTable";
import { getUserStore } from "./service";
import { useEffect, useState } from "react";
import type { StoreUserInterface } from "@/app/app/store/interface";

export default function Page() {
    const [store, setStore] = useState<StoreUserInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [snackAlert, setSnackAlert] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "info" | "warning";
    }>({
        open: false,
        message: "",
        severity: "success",
    });

    async function initialize() {
        try {
            const store = await getUserStore();
            if (!store) {
                setSnackAlert({
                    open: true,
                    message: "Store not found",
                    severity: "error",
                });
            }
            setLoading(false);
            if (store) setStore(store);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <>
            <Paper elevation={3} sx={{ p: 2, mt: 5, textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    Select your store
                </Typography>
                <StoreTable store={store} />
            </Paper>

            <Snackbar
                open={snackAlert.open}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={4000}
                onClose={() =>
                    setSnackAlert((prev) => ({ ...prev, open: false }))
                }
            >
                <Alert severity={snackAlert.severity}>
                    {snackAlert.message}
                </Alert>
            </Snackbar>

            <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-end"
                marginY={1}
            >
                <Button variant="outlined">Ask to join</Button>
            </Stack>
        </>
    );
}
