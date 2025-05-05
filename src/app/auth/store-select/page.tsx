"use client";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import StoreSelect from "../login/components/StoreSelect";

export default function Page() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: "50vw" }}>
                <StoreSelect />
            </Paper>
        </Box>
    );
}
