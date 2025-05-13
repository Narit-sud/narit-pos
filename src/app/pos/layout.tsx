"use client";
import AppProviders from "../app/AppProviders";
import { Box } from "@mui/material";
import AppNavbar from "@/components/AppNavbar";
import { useState } from "react";

export default function PosLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    const handleMenuButtonClick = () => {
        setOpen(!open);
    };

    return (
        <AppProviders>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                {/* App Navbar - Simplified for POS */}
                <AppNavbar handleMenuButtonClick={handleMenuButtonClick} />

                {/* Main content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        overflow: "auto",
                        backgroundColor: "background.default",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </AppProviders>
    );
}
