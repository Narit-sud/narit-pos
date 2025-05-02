"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import AppProviders from "./AppProviders";

type List = { name: string; url: string }[];
const firstList: List = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Store", url: "/store" },
    { name: "Brand", url: "/brand" },
    { name: "Category", url: "/category" },
    { name: "Product", url: "/product" },
];
const secondList: List = [{ name: "Order", url: "/order" }];
const thirdList: List = [{ name: "Logout", url: "/logout" }];

type Props = {
    children: ReactNode;
};

export default function AppLayout({ children }: Props) {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                                        <ListItemText sx={{ color: "gray" }}>
                                            {item.name}
                                        </ListItemText>
                                    </ListItemButton>
                                </Link>
                            );
                        })}
                    </List>

                    <Divider />
                    <List>
                        {thirdList.map((item) => {
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
                                        <ListItemText sx={{ color: "gray" }}>
                                            {item.name}
                                        </ListItemText>
                                    </ListItemButton>
                                </Link>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>

            <AppProviders>
                <Box sx={{ p: 8 }}>{children}</Box>
            </AppProviders>
        </Box>
    );
}
