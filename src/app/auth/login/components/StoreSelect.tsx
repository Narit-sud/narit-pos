"use client";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PopupModal from "@/components/PopupModal";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import StoreForm from "@/app/app/store/components/StoreForm";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { StoreUserInterface } from "@/app/app/store/interface";
import { setUserStore } from "@/app/auth/login/service";
import { useEffect, useState } from "react";
import { getUserStore } from "@/app/app/store/service";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { useRouter } from "next/navigation";

export default function StoreSelect() {
    const router = useRouter();
    const [store, setStore] = useState<StoreUserInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [createMode, setCreateMode] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
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
        try {
            const storeData = await getUserStore();
            if (storeData) {
                setStore(storeData);
            }
            setIsLoading(false);
        } catch (error) {
            console.log("Error fetching store data:", error);
            setIsLoading(false);
        }
    };

    const handleSubmit = async (storeId: string) => {
        setIsSelected(true);
        try {
            await setUserStore(storeId);
            setTimeout(() => {
                router.push("/app");
            }, 3000);
        } catch (error) {
            console.error("Error setting user store:", error);
        }
    };
    useEffect(() => {
        initialize();
    }, []);
    return (
        <Stack
            spacing={2}
            sx={{
                maxHeight: "70vh",
                margin: "auto",
                padding: 2,
            }}
            // sx={{ padding: 2, border: "1px solid #dddddd", borderRadius: 2 }}
        >
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
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Select Store
            </Typography>
            {isLoading && <Typography>Loading...</Typography>}
            {store.length === 0 && !isLoading && (
                <Typography>No store found</Typography>
            )}
            {store?.map((storeData) => (
                <Card variant="outlined" key={storeData.id}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {storeData.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {storeData.permission}
                        </Typography>
                        <Typography variant="body2">
                            Created at: {storeData.createdAt}
                        </Typography>
                        <Typography variant="body2">
                            Updated at: {storeData.updatedAt}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ flexGrow: 1 }}
                            justifyContent="flex-end"
                        >
                            <Button
                                variant="contained"
                                onClick={() => handleSubmit(storeData.id)}
                                disabled={
                                    storeData.permission === "Pending" ||
                                    isSelected
                                }
                            >
                                Select
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
            ))}
            <Button
                variant="outlined"
                onClick={() => {
                    setCreateMode(true);
                }}
            >
                Create store
            </Button>
            <Button
                variant="outlined"
                disableRipple
                disableFocusRipple
                disableElevation
                endIcon={
                    <Tooltip title="Under construction">
                        <InfoOutlineIcon />
                    </Tooltip>
                }
            >
                Join store
            </Button>
        </Stack>
    );
}
