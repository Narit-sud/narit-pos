"use client";
import { useProduct } from "../../app/product/useProduct";
import { usePosContext } from "../usePosContext";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Paper,
    TextField,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";

export default function ProductGrid() {
    const { products } = useProduct();
    const { openProductPanel } = usePosContext();
    const [searchTerm, setSearchTerm] = useState("");

    // Filter products based on search term
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleProductClick = (productId: string) => {
        const product = products.find((p) => p.id === productId);
        if (product) {
            openProductPanel(product);
        }
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Paper
            sx={{
                p: 2,
                boxShadow: 2,
                height: { md: "calc(100vh - 180px)", xs: "auto" },
                overflow: "auto",
            }}
        >
            <TextField
                fullWidth
                placeholder="Search products..."
                variant="outlined"
                size="small"
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                sx={{ mb: 2 }}
            />

            {products.length === 0 ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "80%",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {filteredProducts.map((product) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={product.id}>
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: 3,
                                    },
                                    position: "relative",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                                onClick={() => handleProductClick(product.id)}
                            >
                                {product.stock <= 0 && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            zIndex: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            color="white"
                                            fontWeight="bold"
                                            sx={{ transform: "rotate(-15deg)" }}
                                        >
                                            OUT OF STOCK
                                        </Typography>
                                    </Box>
                                )}
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="medium"
                                        noWrap
                                    >
                                        {product.name}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mt: 1,
                                        }}
                                    >
                                        <Chip
                                            label={product.category}
                                            size="small"
                                            sx={{ fontSize: "0.7rem" }}
                                        />
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            fontSize="0.7rem"
                                        >
                                            Stock: {product.stock}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        color="primary"
                                        fontWeight="bold"
                                        mt={1}
                                    >
                                        {formatCurrency(product.price)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Paper>
    );
}
