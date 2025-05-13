"use client";

import { useAuth } from "@/app/app/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import ReplayIcon from "@mui/icons-material/Replay";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { logoutService } from "@/app/auth/service";

export default function AuthMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const { auth } = useAuth();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            await logoutService();
        }
        handleClose();
    };

    if (!auth) return null;

    // Extract first letter of username for the avatar
    const userInitial = auth.username.charAt(0).toUpperCase();

    return (
        <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <Avatar
                        sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                    >
                        {userInitial}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Typography
                variant="body2"
                color="white"
                sx={{
                    ml: 1,
                    display: { xs: "none", sm: "block" },
                    fontWeight: "medium",
                }}
            >
                {auth.name} {auth.surname}
            </Typography>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                        mt: 1.5,
                        minWidth: 200,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> {auth.username}
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        router.push("/auth/store-select");
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <ReplayIcon fontSize="small" />
                    </ListItemIcon>
                    Change Store
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <Typography color="error">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}
