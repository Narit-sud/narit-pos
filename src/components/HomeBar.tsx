"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import LogoDevIcon from "@mui/icons-material/LogoDev";

export default function HomeBar() {
    return (
        <AppBar
            sx={{
                height: 55,
                alignItems: "center",
                marginBottom: 10,
            }}
            suppressHydrationWarning
        >
            <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                width="100%"
                height="100%"
            >
                {/* LOGO */}
                <Link href="/" color="white" underline="none">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <LogoDevIcon fontSize="large" sx={{ color: "white" }} />
                        <Typography
                            color="white"
                            fontSize="xx-large"
                            fontWeight="bold"
                        >
                            Narit
                        </Typography>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            sx={{ opacity: 0.6 }}
                        />
                        <Typography color="white" fontWeight="bold">
                            POS
                        </Typography>
                    </Box>
                </Link>
                {/* Menu */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Link href="/" color="white" underline="hover">
                        Home
                    </Link>
                    <Link href="/manual" color="white" underline="hover">
                        Manual
                    </Link>
                    <Link href="/about" color="white" underline="hover">
                        About
                    </Link>
                </Box>
                {/* Get started button */}
                <Box>
                    <Button
                        variant="contained"
                        LinkComponent={Link}
                        href="/auth/signup"
                        sx={{
                            backgroundColor: "white",
                            color: "black",
                            "&:hover": {
                                backgroundColor: "#f5f5f5",
                                color: "black",
                            },
                        }}
                    >
                        Get Started
                    </Button>
                </Box>
            </Stack>
        </AppBar>
    );
}
