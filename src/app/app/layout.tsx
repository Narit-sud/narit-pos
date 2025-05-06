"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { logoutService } from "@/app/auth/service";
import Link from "next/link";
import { ReactNode, useState } from "react";
import AppProviders from "./AppProviders";
import { usePathname } from "next/navigation";

type List = { name: string; url: string }[];
const firstList: List = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Store", url: "/store" },
    { name: "Category", url: "/category" },
    { name: "Brand", url: "/brand" },
    { name: "Product", url: "/product" },
];
const secondList: List = [{ name: "Order", url: "/order" }];
const thirdList: List = [{ name: "Change store", url: "/auth/store-select" }];

type Props = {
    children: ReactNode;
};

export default function AppLayout({ children }: Props) {
    const pathname = usePathname();
    const renderProviders = !pathname.startsWith("/app/store");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    async function logout() {
        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            await logoutService();
        }
    }

    return (
        <Box>
            <AppBar>
                <Grid container>
                    <Grid size={1}>
                        <Button
                            sx={{
                                m: 1,
                                border: "1px solid white",
                                color: "white",
                            }}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <MenuIcon />
                        </Button>
                    </Grid>
                    <Grid size={11}></Grid>
                </Grid>
            </AppBar>

            <Drawer
                open={sidebarOpen}
                onClose={() => {
                    setSidebarOpen(!sidebarOpen);
                }}
            >
                <Box sx={{ bgcolor: "white", minWidth: "350px", p: 3 }}>
                    {/* first list */}
                    <List>
                        {firstList.map((item) => {
                            return (
                                <Link
                                    key={item.name}
                                    href={"/app" + item.url}
                                    onClick={() => {
                                        setSidebarOpen(false);
                                    }}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>icon</ListItemIcon>
                                        <ListItemText>{item.name}</ListItemText>
                                    </ListItemButton>
                                </Link>
                            );
                        })}
                    </List>
                    {/* second list */}
                    <Divider />
                    <List>
                        {secondList.map((item) => {
                            return (
                                <Link
                                    key={item.name}
                                    href={"/app" + item.url}
                                    onClick={() => {
                                        setSidebarOpen(false);
                                    }}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>icon</ListItemIcon>
                                        <ListItemText>{item.name}</ListItemText>
                                    </ListItemButton>
                                </Link>
                            );
                        })}
                    </List>
                    {/* third list */}
                    <Divider />
                    <List>
                        {thirdList.map((item) => {
                            return (
                                <Link
                                    key={item.name}
                                    href={item.url}
                                    onClick={() => {
                                        setSidebarOpen(false);
                                    }}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>icon</ListItemIcon>
                                        <ListItemText>{item.name}</ListItemText>
                                    </ListItemButton>
                                </Link>
                            );
                        })}
                    </List>
                    {/* logout */}
                    <Button
                        onClick={() => {
                            logout();
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>icon</ListItemIcon>
                            <ListItemText sx={{ color: "gray" }}>
                                Logout
                            </ListItemText>
                        </ListItemButton>
                    </Button>
                </Box>
            </Drawer>
            {renderProviders && (
                <AppProviders>
                    <Box sx={{ p: 8, mt: 1 }}>{children}</Box>
                </AppProviders>
            )}
            {!renderProviders && <Box sx={{ p: 8, mt: 1 }}>{children}</Box>}
        </Box>
    );
}
