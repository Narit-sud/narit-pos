"use client";
import { usePosContext } from "../usePosContext";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    Grid,
    Divider,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useState, useEffect, ChangeEvent } from "react";

export default function ProductSelectionPanel() {
    const {
        selectedProduct,
        isProductPanelOpen,
        closeProductPanel,
        addToCart,
    } = usePosContext();

    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // Initialize values when the panel opens and a product is selected
    useEffect(() => {
        if (selectedProduct) {
            setQuantity(1);
            setUnitPrice(selectedProduct.price);
            setTotalPrice(selectedProduct.price);
        }
    }, [selectedProduct, isProductPanelOpen]);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Handle changes to quantity
    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value) || 1;
        if (newQuantity < 1) return;

        setQuantity(newQuantity);
        setTotalPrice(newQuantity * unitPrice);
    };

    const incrementQuantity = () => {
        setQuantity((prev) => {
            const newQuantity = prev + 1;
            setTotalPrice(newQuantity * unitPrice);
            return newQuantity;
        });
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => {
                const newQuantity = prev - 1;
                setTotalPrice(newQuantity * unitPrice);
                return newQuantity;
            });
        }
    };

    // Handle changes to unit price
    const handleUnitPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newUnitPrice = parseFloat(e.target.value) || 0;
        setUnitPrice(newUnitPrice);
        setTotalPrice(quantity * newUnitPrice);
    };

    // Handle changes to total price
    const handleTotalPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTotalPrice = parseFloat(e.target.value) || 0;
        setTotalPrice(newTotalPrice);

        // Recalculate unit price based on total price and quantity
        if (quantity > 0) {
            setUnitPrice(newTotalPrice / quantity);
        }
    };

    // Add the selected product to the cart
    const handleAddToCart = () => {
        if (!selectedProduct) return;

        addToCart({
            product: selectedProduct,
            quantity,
            unitPrice,
            totalPrice,
        });
    };

    if (!selectedProduct) return null;

    return (
        <Dialog
            open={isProductPanelOpen}
            onClose={closeProductPanel}
            fullWidth
            maxWidth="sm"
            sx={{ userSelect: "none" }}
        >
            <DialogTitle sx={{ fontWeight: "bold" }}>
                Add Product to Cart
            </DialogTitle>

            <DialogContent>
                <Box sx={{ mb: 3, mt: 1 }}>
                    <Typography variant="h6" fontWeight="medium" gutterBottom>
                        {selectedProduct.name}
                    </Typography>

                    <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 6 }}>
                            <Typography variant="body2" color="text.secondary">
                                Category: {selectedProduct.category}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <Typography variant="body2" color="text.secondary">
                                Brand: {selectedProduct.brand}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="body2" color="text.secondary">
                                Stock: {selectedProduct.stock} available
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Quantity Selector */}
                <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Grid size={{ xs: 4, sm: 4, md: 4 }}>
                        <Typography variant="subtitle2">Quantity:</Typography>
                    </Grid>
                    <Grid size={{ xs: 8, sm: 8, md: 8 }}>
                        <TextField
                            value={quantity}
                            onChange={handleQuantityChange}
                            type="number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            onClick={decrementQuantity}
                                            size="small"
                                            disabled={quantity <= 1}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={incrementQuantity}
                                            size="small"
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Unit Price */}
                <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Grid size={{ xs: 4, sm: 4, md: 4 }}>
                        <Typography variant="subtitle2">Unit Price:</Typography>
                    </Grid>
                    <Grid size={{ xs: 8, sm: 8, md: 8 }}>
                        <TextField
                            value={unitPrice}
                            onChange={handleUnitPriceChange}
                            type="number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        ฿
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Total Price */}
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 4, sm: 4, md: 4 }}>
                        <Typography variant="subtitle2">
                            Total Price:
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 8, sm: 8, md: 8 }}>
                        <TextField
                            value={totalPrice}
                            onChange={handleTotalPriceChange}
                            type="number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        ฿
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={closeProductPanel} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    color="primary"
                    disabled={quantity < 1 || unitPrice <= 0}
                >
                    Add to Cart
                </Button>
            </DialogActions>
        </Dialog>
    );
}
