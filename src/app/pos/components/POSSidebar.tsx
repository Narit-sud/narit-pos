"use client";

import NextLink from "next/link";

import { logoutService } from "@/app/auth/service";
import { list1, list2, list3, list4 } from "@/config/appMenuItems";

import TableViewIcon from "@mui/icons-material/TableView";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

type Props = {
    isOpen: boolean;
    handleClose: () => void;
};

export default function POSSidebar({ isOpen, handleClose }: Props) {
    async function handleLogout() {
        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            await logoutService();
        }
    }
    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={handleClose}
            sx={{
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: { xs: "85%", sm: 320 },
                    overflowY: "auto",
                },
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                    >
                        Narit POS
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>

                <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
                    {" "}
                    <Button
                        fullWidth
                        LinkComponent={NextLink}
                        href="/app"
                        startIcon={<TableViewIcon />}
                        size="large"
                        variant="contained"
                    >
                        App
                    </Button>
                    <Divider />
                    <List>
                        {list1.map((item) => {
                            return (
                                <NextLink
                                    key={item.name}
                                    href={"/app" + item.url}
                                    onClick={handleClose}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText>{item.name}</ListItemText>
                                    </ListItemButton>
                                </NextLink>
                            );
                        })}
                    </List>
                    <Divider />
                    <List>
                        {list2.map((item) => {
                            return (
                                <NextLink
                                    key={item.name}
                                    href={"/app" + item.url}
                                    onClick={handleClose}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText>{item.name}</ListItemText>
                                    </ListItemButton>
                                </NextLink>
                            );
                        })}
                    </List>
                    <Divider />
                    <List>
                        {list3.map((item) => {
                            return (
                                <NextLink
                                    key={item.name}
                                    href={"/app" + item.url}
                                    onClick={handleClose}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText>{item.name}</ListItemText>
                                    </ListItemButton>
                                </NextLink>
                            );
                        })}
                    </List>
                    {/* third list */}
                    <Divider />{" "}
                    <List>
                        {list4.map((item) => {
                            return (
                                <NextLink
                                    key={item.name}
                                    href={"/app" + item.url}
                                    onClick={() => {
                                        item.name === "Logout" &&
                                            handleLogout();
                                        handleClose();
                                    }}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText>{item.name}</ListItemText>
                                    </ListItemButton>
                                </NextLink>
                            );
                        })}
                    </List>
                </Box>

                <Box sx={{ p: 2, borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        component={NextLink}
                        href="/"
                        startIcon={<HomeIcon />}
                        sx={{ mb: 2 }}
                    >
                        Home Page
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
}
