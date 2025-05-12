"use client";
import { createLoginData, LoginInterface } from "@/model/login.interface";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginService } from "./service";

export default function Page() {
    const router = useRouter();
    const [loginData, setLoginData] = useState<LoginInterface>(
        createLoginData({} as LoginInterface)
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
                minHeight: { xs: "auto", sm: "80vh", md: "100vh" },
                py: { xs: 5, md: 0 },
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, sm: 4 },
                    width: "100%",
                    maxWidth: { xs: "95%", sm: 400 },
                    mx: "auto",
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    color="primary"
                    sx={{
                        textAlign: "center",
                        mb: 3,
                        fontSize: { xs: "1.8rem", sm: "2.125rem" },
                    }}
                >
                    Login
                </Typography>
                <FormControl fullWidth sx={{ gap: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2.5,
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
                            size="medium"
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
                            size="medium"
                        />
                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleSubmit}
                            size="large"
                            sx={{ mt: 1, py: 1.2, fontWeight: "bold" }}
                            fullWidth
                        >
                            Login
                        </Button>
                        <Typography align="center" sx={{ mt: 2 }}>
                            Don't have an account?{" "}
                            <Link
                                href="/auth/signup"
                                sx={{ fontWeight: "bold" }}
                            >
                                Sign up here
                            </Link>
                        </Typography>
                        <Typography
                            align="center"
                            variant="body2"
                            sx={{ mt: 1 }}
                        >
                            <Link href="/" sx={{ color: "text.secondary" }}>
                                Return to home
                            </Link>
                        </Typography>
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
