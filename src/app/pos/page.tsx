"use client";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import ProductSelectionPanel from "./components/ProductSelectionPanel";
import ChargePanel from "./components/ChargePanel";
import { Box, Grid, Typography } from "@mui/material";
import { PosProvider } from "./usePosContext";

export default function Page() {
    return (
        <PosProvider>
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Point of Sale
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <ProductGrid />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Cart />
                    </Grid>
                </Grid>
                <ProductSelectionPanel />
                <ChargePanel />
            </Box>
        </PosProvider>
    );
}
