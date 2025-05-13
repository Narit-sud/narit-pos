"use client";
import { createSignupData, SignupInterface } from "@/model/signup.interface";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signupService } from "./service";
import { cleanSignupData } from "./utils/cleanSignupData";
import { validateSignupData } from "./utils/validateSignupData";

export default function Page() {
    const router = useRouter();
    const [signupData, setSignupData] = useState<SignupInterface>(
        createSignupData({} as SignupInterface)
    );
    const [isMobile, setIsMobile] = useState(false);
    const [snackbarAlert, setSnackbarAlert] = useState<{
        open: boolean;
        severity: "success" | "error" | "info" | "warning";
        message: string;
    }>({
        open: false,
        severity: "error",
        message: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "phoneNumber") {
            if (!/^\d+$/.test(value)) return;
            if (value.length > 10) return;
        }
        setSignupData((prev) => ({ ...prev, [name]: value.trim() }));
    };

    // Check if window is available (client-side only)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        // Initial check
        checkScreenSize();

        // Add event listener for window resize
        window.addEventListener("resize", checkScreenSize);

        // Clean up
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);
    const handleSubmit = async () => {
        const signupDataValid = validateSignupData(signupData);
        if (!signupDataValid.valid) {
            setSnackbarAlert({
                open: true,
                severity: "error",
                message:
                    signupDataValid.message ||
                    "Please check your input and try again",
            });
            return;
        }

        // Show loading message
        setSnackbarAlert({
            open: true,
            severity: "info",
            message: "Creating your account...",
        });

        try {
            const cleanedSignupData = cleanSignupData(signupData);
            await signupService(cleanedSignupData);

            setSnackbarAlert({
                open: true,
                severity: "success",
                message:
                    "Account created successfully! Redirecting to login...",
            });

            setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
        } catch (error) {
            console.error("Signup error:", error);

            let errorMessage = "Failed to create account. Please try again.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            // Check for specific errors from the API
            if (error && typeof error === "object" && "response" in error) {
                const axiosError = error as any;
                if (axiosError.response?.data?.message) {
                    errorMessage = axiosError.response.data.message;
                } else if (axiosError.response?.status === 409) {
                    errorMessage =
                        "Username or email already exists. Please use different credentials.";
                }
            }

            setSnackbarAlert({
                open: true,
                severity: "error",
                message: errorMessage,
            });
        }
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: { xs: "auto", md: "100vh" },
                py: { xs: 4, md: 0 },
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, sm: 3 },
                        pt: { xs: 3, sm: 4 },
                        pb: { xs: 3, sm: 4 },
                        textAlign: "center",
                        width: "100%",
                        mx: "auto",
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        color="primary"
                        sx={{
                            mb: 3,
                            fontSize: { xs: "1.8rem", sm: "2.125rem" },
                        }}
                    >
                        Create Account
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2.5,
                                px: { xs: 2, sm: 4 },
                            }}
                        >
                            <TextField
                                fullWidth
                                type="text"
                                value={signupData.name}
                                name="name"
                                label="Name"
                                placeholder="Enter your name"
                                onChange={handleChange}
                                required
                                size="medium"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                type="text"
                                value={signupData.surname}
                                name="surname"
                                label="Surname"
                                placeholder="Enter your surname"
                                onChange={handleChange}
                                required
                                size="medium"
                            />
                            <TextField
                                fullWidth
                                type="email"
                                value={signupData.email}
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                                size="medium"
                            />
                            <TextField
                                fullWidth
                                type="text"
                                value={signupData.phoneNumber}
                                name="phoneNumber"
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                onChange={handleChange}
                                required
                                size="medium"
                                InputProps={{
                                    inputProps: {
                                        maxLength: 10,
                                        pattern: "[0-9]*",
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                value={signupData.username}
                                name="username"
                                label="Username"
                                placeholder="Enter your username"
                                onChange={handleChange}
                                required
                                size="medium"
                            />
                            <TextField
                                fullWidth
                                type="password"
                                value={signupData.password}
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                required
                                size="medium"
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    justifyContent: "center",
                                    gap: 2,
                                    mt: 1,
                                    width: "100%",
                                }}
                            >
                                {" "}
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    fullWidth={isMobile}
                                    size="large"
                                    sx={{ py: 1.2, fontWeight: "bold" }}
                                >
                                    Create Account
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        router.push("/");
                                    }}
                                    fullWidth={isMobile}
                                    size="large"
                                    sx={{ py: 1.2 }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                            <Typography sx={{ mt: 2 }}>
                                Already have an account?{" "}
                                <Link
                                    href="/auth/login"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Login here
                                </Link>
                            </Typography>
                        </Box>
                    </FormControl>{" "}
                </Paper>{" "}
                <Snackbar
                    open={snackbarAlert.open}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={
                        snackbarAlert.severity === "error" ? 6000 : 4000
                    }
                    onClose={() => {
                        setSnackbarAlert({ ...snackbarAlert, open: false });
                    }}
                >
                    <Alert
                        onClose={() => {
                            setSnackbarAlert({ ...snackbarAlert, open: false });
                        }}
                        severity={snackbarAlert.severity}
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        {snackbarAlert.message}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
}
