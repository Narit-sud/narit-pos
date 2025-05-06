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
import Stack from "@mui/material/Stack";
import { logoutService } from "@/app/auth/service";
import Link from "next/link";
import { ReactNode, useState } from "react";
import AppProviders from "./AppProviders";
import { usePathname } from "next/navigation";
import InventoryIcon from "@mui/icons-material/Inventory";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import ReplayIcon from "@mui/icons-material/Replay";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";

type List = { name: string; url: string; icon: ReactNode }[];
const firstList: List = [
    { name: "Dashboard", url: "/dashboard", icon: <SpaceDashboardIcon /> },
    { name: "Store", url: "/store", icon: <StoreIcon /> },
    { name: "Category", url: "/category", icon: <CategoryIcon /> },
    { name: "Brand", url: "/brand", icon: <BrandingWatermarkIcon /> },
    { name: "Product", url: "/product", icon: <InventoryIcon /> },
    { name: "Customer", url: "/customer", icon: <PeopleIcon /> },
];
const secondList: List = [
    { name: "Order", url: "/order", icon: <ReceiptLongIcon /> },
    { name: "Procurement", url: "/procurement", icon: <ReceiptLongIcon /> },
    { name: "Stock Management", url: "/stock", icon: <ReceiptLongIcon /> },
];
const thirdList: List = [
    { name: "Employee", url: "/employee", icon: <PersonIcon /> },
    {
        name: "Change store",
        url: "/auth/store-select",
        icon: <ReplayIcon />,
    },
    {
        name: "Logout",
        url: "#",
        icon: <LogoutIcon />,
    },
];

type Props = {
    children: ReactNode;
};

export default function AppLayout({ children }: Props) {
    const pathname = usePathname();
    const renderProviders = !pathname.startsWith("/app/store");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    async function handleLogout() {
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
                <Stack
                    height={"100vh"}
                    direction="column"
                    justifyItems="space-between"
                    sx={{
                        bgcolor: "white",
                        minWidth: "350px",
                        p: 3,
                        justifyContent: "space-between",
                    }}
                >
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
                                        <ListItemIcon>{item.icon}</ListItemIcon>
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
                                        <ListItemIcon>{item.icon}</ListItemIcon>
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
                                        item.name === "Logout" &&
                                            handleLogout();
                                        setSidebarOpen(false);
                                    }}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText>{item.name}</ListItemText>
                                    </ListItemButton>
                                </Link>
                            );
                        })}
                    </List>
                    {/* logout
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
                    </Button> */}
                </Stack>
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
