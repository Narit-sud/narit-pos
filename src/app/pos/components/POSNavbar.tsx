"use client";

import { AuthContextProvider } from "@/app/app/useAuth";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type Props = {
    handleMenuButtonClick: () => void;
};
export default function POSNavbar({ handleMenuButtonClick }: Props) {
    return (
        <AppBar sx={{ px: { md: 2 } }}>
            <Grid container alignItems="center">
                <Grid size={{ xs: 1 }}>
                    <Button
                        variant="outlined"
                        sx={{
                            m: 1,
                            border: "1px solid white",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                borderColor: "white",
                            },
                        }}
                        onClick={handleMenuButtonClick}
                    >
                        <MenuIcon />
                    </Button>
                </Grid>
                <Grid
                    size={{ xs: 7, md: 9 }}
                    display="flex"
                    alignItems="center"
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontWeight: "bold",
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        Narit POS
                    </Typography>
                </Grid>
                <Grid
                    size={{ xs: 4, md: 2 }}
                    display="flex"
                    justifyContent="flex-end"
                >
                    TEST
                </Grid>
            </Grid>
        </AppBar>
    );
}
