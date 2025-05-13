"use client";
import AppNavbar from "@/components/AppNavbar";
import AppSidebar from "@/components/AppSidebar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import AppProviders from "./AppProviders";

type Props = {
    children: ReactNode;
};

export default function AppLayout({ children }: Props) {
    const pathname = usePathname();
    const renderProviders = !pathname.startsWith("/app/store");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Box>
            <AppNavbar handleMenuButtonClick={() => setSidebarOpen(true)} />
            <AppSidebar
                isOpen={sidebarOpen}
                handleClose={() => setSidebarOpen(false)}
            />
            <Box sx={{ p: { xs: 1, sm: 8 }, mt: { xs: 7, sm: 5 } }}>
                {renderProviders ? (
                    <AppProviders>{children}</AppProviders>
                ) : (
                    children
                )}
            </Box>
        </Box>
    );
}
