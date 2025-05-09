"use client";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "./service";
import { createLoginData, LoginInterface } from "@/model/login.interface";
import { isAxiosError } from "axios";

export default function Page() {
    const router = useRouter();
    const [loginData, setLoginData] = useState<LoginInterface>(
        createLoginData({} as LoginInterface),
    );
    const [snackbarAlert, setSnackbarAlert] = useState({
        open: false,
        severity: "",
        message: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value.trim() }));
    };
    const handleSubmit = async () => {
        try {
            await loginService(loginData);
            setSnackbarAlert({
                open: true,
                severity: "success",
                message: "Login success. Redirecting to store selection...",
            });
            setTimeout(() => {
                router.push("/auth/store-select");
            }, 3000);
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error);
                setSnackbarAlert({
                    open: true,
                    severity: "error",
                    message: error.message,
                });
            } else {
                setSnackbarAlert({
                    open: true,
                    severity: "error",
                    message: "Unexpected Error",
                });
            }
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: { sm: "80vh", md: "100vh" },
            }}
        >
            <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    color="primary"
                    sx={{ textAlign: "center", mb: 2 }}
                >
                    Login
                </Typography>
                <FormControl fullWidth sx={{ gap: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            fullWidth
                            type="text"
                            name="username"
                            value={loginData.username}
                            label="Username"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            type="password"
                            name="password"
                            value={loginData.password}
                            label="Password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            required
                        />
                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                    </Box>
                </FormControl>
            </Paper>
            <Snackbar
                open={snackbarAlert.open}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={4000}
                onClose={() =>
                    setSnackbarAlert((prev) => ({ ...prev, open: false }))
                }
            >
                <Alert
                    severity={
                        snackbarAlert.severity === "success"
                            ? "success"
                            : "error"
                    }
                >
                    {snackbarAlert.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
