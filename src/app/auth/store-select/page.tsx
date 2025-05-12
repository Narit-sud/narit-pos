"use client";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import StoreSelect from "../login/components/StoreSelect";

export default function Page() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: { xs: "auto", md: "100vh" },
                py: { xs: 4, md: 0 },
                px: { xs: 2, sm: 0 },
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 2, sm: 4 },
                    width: "100%",
                    maxWidth: { xs: "100%", sm: "600px" },
                    mx: "auto",
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    color="primary"
                    sx={{
                        textAlign: "center",
                        mb: 1,
                        fontSize: { xs: "1.8rem", sm: "2.125rem" },
                        display: { xs: "block", sm: "none" },
                    }}
                >
                    Select Store
                </Typography>
                <StoreSelect />
            </Paper>
        </Box>
    );
}
