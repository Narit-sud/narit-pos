"use client";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { getUserStore } from "./service";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const [snackAlert, setSnackAlert] = useState({
        open: false,
        message: "",
        severity: "info",
    });
    const router = useRouter();
    async function testButton() {
        try {
            const res = await getUserStore();
            console.log(res);
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.status === 404) {
                    setSnackAlert({
                        open: true,
                        message: "Store not found",
                        severity: "error",
                    });
                    setTimeout(() => {
                        router.push("/store/new");
                    }, 4000);
                }
            }
        }
    }
    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography>Select your store</Typography>
                <Button variant="contained" onClick={testButton}>
                    Test
                </Button>
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
        </Container>
    );
}
