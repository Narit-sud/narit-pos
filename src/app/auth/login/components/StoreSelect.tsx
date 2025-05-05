"use client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import StoreForm from "@/app/app/store/components/StoreForm";
import PopupModal from "@/components/PopupModal";
import type { StoreUserInterface } from "@/app/app/store/interface";
import { setUserStore } from "@/app/auth/login/service";
import { useState } from "react";

type Props = {
    store?: StoreUserInterface[];
    redirect: () => void;
};

export default function StoreSelect({ store, redirect }: Props) {
    const [createMode, setCreateMode] = useState(false);

    const handleSubmit = async (storeId: string) => {
        try {
            await setUserStore(storeId);
            setTimeout(() => {
                redirect();
            }, 3000);
        } catch (error) {
            console.error("Error setting user store:", error);
        }
    };
    return (
        <Stack
            spacing={2}
            sx={{ padding: 2, border: "1px solid #dddddd", borderRadius: 2 }}
        >
            {createMode && (
                <PopupModal
                    open={createMode}
                    handleClose={() => {
                        setCreateMode(false);
                    }}
                >
                    <StoreForm
                        handleCencelButton={() => setCreateMode(false)}
                    />
                </PopupModal>
            )}
            <Typography
                variant="h6"
                component="h1"
                fontWeight="bold"
                gutterBottom
            >
                Select Store
            </Typography>
            {store?.map((storeData) => (
                <Card variant="outlined" key={storeData.id}>
                    <CardContent>
                        <Typography variant="h5" component="div">
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
                                disabled={storeData.permission === "Pending"}
                            >
                                Select
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
            ))}
            <Button variant="outlined">Join store</Button>
            <Button
                variant="outlined"
                onClick={() => {
                    setCreateMode(true);
                }}
            >
                Create store
            </Button>
        </Stack>
    );
}
