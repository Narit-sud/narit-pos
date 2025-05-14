"use client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import CloseIcon from "@mui/icons-material/Close";

// Navigation items
const navItems = [
    { name: "Home", path: "/" },
    { name: "Manual", path: "/manual" },
    { name: "About", path: "/about" },
    { name: "Privacy", path: "/privacy-policy" },
    { name: "Terms", path: "/terms-of-service" },
];

export default function HomeBar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    // Mobile drawer content
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LogoDevIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div">
                        Narit POS
                    </Typography>
                </Box>
                <IconButton edge="end" onClick={handleDrawerToggle}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: "center" }}
                            component={Link}
                            href={item.path}
                        >
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            textAlign: "center",
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": {
                                bgcolor: "primary.dark",
                            },
                            my: 1,
                            mx: 2,
                            borderRadius: 1,
                        }}
                        component={Link}
                        href="/auth/signup"
                    >
                        <ListItemText primary="Get Started" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="static" sx={{ mb: { xs: 4, sm: 8 } }}>
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        height: { xs: "64px", sm: "70px" },
                        justifyContent: "space-between",
                    }}
                >
                    {/* Logo and title - always visible */}
                    <Link
                        href="/"
                        color="inherit"
                        underline="none"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexGrow: { xs: 1, md: 0 },
                        }}
                    >
                        <LogoDevIcon fontSize="large" sx={{ mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            fontWeight="bold"
                            sx={{
                                mr: 1,
                                display: { xs: "none", sm: "flex" },
                            }}
                        >
                            Narit
                        </Typography>
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                height: "1.5rem",
                                mx: 1,
                                display: { xs: "none", sm: "block" },
                            }}
                        />
                        <Typography
                            fontWeight="bold"
                            sx={{
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            POS
                        </Typography>
                    </Link>

                    {/* Mobile menu button */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            display: { md: "none" },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Desktop navigation */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: 4,
                            ml: 4,
                        }}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                underline="hover"
                                color="inherit"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "1rem",
                                    "&:hover": { opacity: 0.8 },
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </Box>

                    {/* Get Started button - desktop only */}
                    <Button
                        variant="contained"
                        component={Link}
                        href="/auth/signup"
                        sx={{
                            display: { xs: "none", md: "block" },
                            bgcolor: "white",
                            color: "primary.main",
                            fontWeight: "bold",
                            "&:hover": {
                                bgcolor: "grey.100",
                            },
                            ml: 2,
                            px: 3,
                        }}
                    >
                        Get Started
                    </Button>
                </Toolbar>
            </Container>

            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better mobile performance
                }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: 280,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
}
