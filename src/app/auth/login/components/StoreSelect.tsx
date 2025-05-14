"use client";
import StoreForm from "@/app/app/store/components/StoreForm";
import type { StoreUserInterface } from "@/app/app/store/interface";
import { getUserStore } from "@/app/app/store/service";
import { setUserStore } from "@/app/auth/login/service";
import PopupModal from "@/components/PopupModal";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { Box, CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StoreSelect() {
    const router = useRouter();
    const [store, setStore] = useState<StoreUserInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [createMode, setCreateMode] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [snackAlert, setSnackAlert] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "info" | "warning";
    }>({
        open: false,
        message: "",
        severity: "success",
    });
    const initialize = async () => {
        setIsLoading(true);
        setSnackAlert({
            open: true,
            message: "Loading store data...",
            severity: "info",
        });
        try {
            const storeData = await getUserStore();
            if (storeData && storeData.length > 0) {
                setStore(storeData);
                setSnackAlert({
                    open: true,
                    message: "Loaded store data successfully",
                    severity: "success",
                });
            } else {
                // Handle empty store data
                setStore([]);
                setSnackAlert({
                    open: true,
                    message:
                        "No stores found for your account. Create a new one to get started.",
                    severity: "info",
                });
            }
        } catch (error) {
            console.error("Error loading store data:", error);
            let errorMessage = "Failed to load store data. Please try again.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            setSnackAlert({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };
    const handleSubmit = async (storeId: string) => {
        setIsDisable(true);
        setSnackAlert({
            open: true,
            message: "Selecting store...",
            severity: "info",
        });
        try {
            await setUserStore(storeId);

            // Success message
            setSnackAlert({
                open: true,
                message: "Store selected successfully!",
                severity: "success",
            });

            // Show redirecting message after a delay
            setTimeout(() => {
                setSnackAlert({
                    open: true,
                    message: "Redirecting to dashboard...",
                    severity: "info",
                });
            }, 1500);

            // Redirect after another delay
            setTimeout(() => {
                router.push("/app");
            }, 2500);
        } catch (error) {
            console.error("Error setting user store:", error);

            // Handle different types of errors
            let errorMessage = "Failed to select store. Please try again.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            // Display error message to user
            setSnackAlert({
                open: true,
                message: errorMessage,
                severity: "error",
            });

            // Re-enable the button so user can try again
            setIsDisable(false);
        }
    };

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Stack
            spacing={2}
            sx={{
                maxHeight: { xs: "70vh", sm: "60vh" },
                overflowY: "auto",
                px: { xs: 0.5, sm: 2 },
                py: 1,
            }}
        >
            {" "}
            <Snackbar
                open={snackAlert.open}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={snackAlert.severity === "error" ? 6000 : 4000}
                onClose={() =>
                    setSnackAlert((prev) => ({ ...prev, open: false }))
                }
            >
                <Alert
                    severity={snackAlert.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                    onClose={() =>
                        setSnackAlert((prev) => ({ ...prev, open: false }))
                    }
                >
                    {snackAlert.message}
                </Alert>
            </Snackbar>
            {createMode && (
                <PopupModal
                    open={createMode}
                    handleClose={() => {
                        setCreateMode(false);
                    }}
                >
                    <StoreForm
                        handleCancelButton={() => setCreateMode(false)}
                        afterCreateFunction={() => {
                            initialize();
                        }}
                    />
                </PopupModal>
            )}
            <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                    mb: 1,
                    display: { xs: "none", sm: "block" },
                    textAlign: "center",
                }}
            >
                Select Store
            </Typography>
            {isLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                    <CircularProgress />
                </Box>
            )}
            {store.length === 0 && !isLoading && (
                <Box sx={{ textAlign: "center", py: 3 }}>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                    >
                        No stores found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Create a new store to get started
                    </Typography>
                </Box>
            )}
            <Stack spacing={2} sx={{ width: "100%" }}>
                {store?.map((storeData) => (
                    <Card
                        variant="outlined"
                        key={storeData.id}
                        sx={{
                            mb: 2,
                            borderRadius: 2,
                            transition: "transform 0.2s, box-shadow 0.2s",
                            "&:hover": {
                                boxShadow: 3,
                            },
                        }}
                    >
                        <CardContent sx={{ pb: 1 }}>
                            <Typography
                                variant="h6"
                                component="div"
                                fontWeight="bold"
                            >
                                {storeData.name}
                            </Typography>
                            <Chip
                                label={storeData.permission}
                                size="small"
                                color={
                                    storeData.permission === "Pending"
                                        ? "warning"
                                        : storeData.permission === "Owner"
                                        ? "primary"
                                        : "success"
                                }
                                variant="outlined"
                                sx={{ mb: 2, mt: 0.5 }}
                            />
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                                Created: {storeData.createdAt}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1}
                                sx={{
                                    flexGrow: 1,
                                    width: "100%",
                                    px: 1,
                                    pb: 1,
                                }}
                                justifyContent="flex-end"
                            >
                                <Button
                                    variant="outlined"
                                    disabled={isDisable}
                                    disableRipple
                                    disableFocusRipple
                                    disableElevation
                                    size="small"
                                    endIcon={
                                        <Tooltip title="Under construction">
                                            <InfoOutlineIcon fontSize="small" />
                                        </Tooltip>
                                    }
                                    fullWidth
                                    sx={{
                                        display: { xs: "none", sm: "flex" },
                                    }}
                                >
                                    Manage
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handleSubmit(storeData.id)}
                                    disabled={
                                        storeData.permission === "Pending" ||
                                        isDisable
                                    }
                                    fullWidth
                                    size="medium"
                                    sx={{ py: 1 }}
                                >
                                    Select Store
                                </Button>
                            </Stack>
                        </CardActions>
                    </Card>
                ))}
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 2 }}
            >
                <Button
                    variant="outlined"
                    disabled={isDisable}
                    onClick={() => {
                        setCreateMode(true);
                    }}
                    fullWidth
                    startIcon={<AddBusinessIcon />}
                    sx={{ py: 1.2 }}
                >
                    Create New Store
                </Button>
                <Button
                    variant="outlined"
                    disabled={isDisable}
                    disableRipple
                    disableFocusRipple
                    disableElevation
                    fullWidth
                    startIcon={<GroupAddIcon />}
                    endIcon={
                        <Tooltip title="Under construction">
                            <InfoOutlineIcon />
                        </Tooltip>
                    }
                    sx={{ py: 1.2 }}
                >
                    Join Existing Store
                </Button>
            </Stack>
            <Typography
                align="center"
                variant="body2"
                sx={{ mt: 2, color: "text.secondary" }}
            >
                <Link
                    href="/"
                    underline="hover"
                    color="inherit"
                    onClick={(e) => {
                        e.preventDefault();
                        router.push("/");
                    }}
                >
                    Return to home
                </Link>
            </Typography>
        </Stack>
    );
}
