"use client";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import AppProviders from "@/app/app/AppProviders";
import POSNavbar from "@/app/pos/components/POSNavbar";
import POSSidebar from "@/app/pos/components/POSSidebar";

import { useState } from "react";

export default function PosLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <AppProviders>
            <Box>
                <POSNavbar handleMenuButtonClick={() => setSidebarOpen(true)} />
                <POSSidebar
                    isOpen={sidebarOpen}
                    handleClose={() => setSidebarOpen(false)}
                />
                <Box sx={{ p: { xs: 1, sm: 8 }, mt: { xs: 7, sm: 5 } }}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            userSelect: "none",
                            fontWeight: "bold",
                        }}
                    >
                        {children}
                    </Paper>
                </Box>
            </Box>
        </AppProviders>
    );
}
