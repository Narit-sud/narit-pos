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
        >
            <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                width="100%"
                height="100%"
            >
                {/* LOGO */}
                <Link href="/">
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
                    <Link href="/" underline="hover" color="white">
                        Home
                    </Link>
                    <Link href="/manual" underline="hover">
                        <Button variant="text" sx={{ color: "white" }}>
                            Manual
                        </Button>
                    </Link>
                    <Link href="/about" underline="hover">
                        <Button variant="text" sx={{ color: "white" }}>
                            About
                        </Button>
                    </Link>
                </Box>
                {/* Get started button */}
                <Box>
                    <Link href="/auth/signup" underline="hover">
                        <Button variant="contained" sx={{ color: "white" }}>
                            Get Started
                        </Button>
                    </Link>
                </Box>
            </Stack>
        </AppBar>
    );
}
