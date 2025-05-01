"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

type List = { name: string; url: string }[];
const firstList: List = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Store", url: "/store" },
    { name: "Brand", url: "/brand" },
    { name: "Category", url: "/category" },
    { name: "Product", url: "/product" },
];
const secondList: List = [];
const thirdList: List = [];

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
                <Box sx={{ bgcolor: "white", minWidth: "350px" }}>
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
                </Box>
            </Drawer>
            {children}
        </Box>
    );
}
