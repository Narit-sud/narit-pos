"use client";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import { createSignupData, SignupInterface } from "./interface";
import { cleanSignupData } from "./_utils/cleanSignupData";
import { validateSignupData } from "./_utils/validateSignupData";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupService } from "./service";

export default function Page() {
    const router = useRouter();
    const [signupData, setSignupData] = useState<SignupInterface>(
        createSignupData({} as SignupInterface)
    );
    const [snackbarAlert, setSnackbarAlert] = useState({
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const signupDataValid = validateSignupData(signupData);
        if (!signupDataValid.valid) {
            setSnackbarAlert({
                open: true,
                severity: "error",
                message: signupDataValid.message || "Something went wrong",
            });
            return;
        }
        try {
            const cleanedSignupData = cleanSignupData(signupData);
            await signupService(cleanedSignupData);
            setSnackbarAlert({
                open: true,
                severity: "success",
                message: "Signup success",
            });
            setTimeout(() => {
                router.push("/auth/login");
            }, 4000);
        } catch (error) {
            setSnackbarAlert({
                open: true,
                severity: "error",
                message: "Signup failed",
            });
            return;
        }
    };

    return (
        <Container>
            <Paper
                elevation={3}
                sx={{ p: 2, pt: 4, marginTop: 4, textAlign: "center" }}
            >
                <Typography variant="h4" component="h1">
                    Signup
                </Typography>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            p: 5,
                        }}
                    >
                        <TextField
                            type="text"
                            value={signupData.name}
                            name="name"
                            label="Name"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            type="text"
                            value={signupData.surname}
                            name="surname"
                            label="Surname"
                            placeholder="Enter your surname"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            type="email"
                            value={signupData.email}
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            type="text"
                            value={signupData.phoneNumber}
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="Enter your Phone number"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            type="text"
                            value={signupData.username}
                            name="username"
                            label="Username"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            type="password"
                            value={signupData.password}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            required
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                gap: 2,
                            }}
                        >
                            <Button variant="contained" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    router.push("/");
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </FormControl>
            </Paper>
            <Snackbar
                open={snackbarAlert.open}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={4000}
                message={snackbarAlert.message}
                onClose={() => {
                    setSnackbarAlert({ ...snackbarAlert, open: false });
                }}
            >
                <Alert
                    onClose={() => {
                        setSnackbarAlert({ ...snackbarAlert, open: false });
                    }}
                    severity={snackbarAlert.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbarAlert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
