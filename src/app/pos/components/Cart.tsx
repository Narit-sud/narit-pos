"use client";
import { usePosContext } from "../usePosContext";
import {
    Paper,
    Typography,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    Divider,
    Badge,
    Tooltip,
    TextField,
} from "@mui/material";
import {
    Delete as DeleteIcon,
    ShoppingCart as CartIcon,
    Edit as EditIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
} from "@mui/icons-material";
import { useState } from "react";

export default function Cart() {
    const {
        cartItems,
        removeFromCart,
        updateCartItem,
        openChargePanel,
        getCartTotal,
        orderComment,
        setOrderComment,
    } = usePosContext();

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Adjust quantity directly from cart
    const incrementQuantity = (index: number) => {
        const item = cartItems[index];
        const updatedItem = {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: (item.quantity + 1) * item.unitPrice,
        };
        updateCartItem(index, updatedItem);
    };

    const decrementQuantity = (index: number) => {
        const item = cartItems[index];
        if (item.quantity > 1) {
            const updatedItem = {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: (item.quantity - 1) * item.unitPrice,
            };
            updateCartItem(index, updatedItem);
        }
    };

    return (
        <>
            <Paper
                sx={{
                    p: 2,
                    boxShadow: 2,
                    height: { md: "calc(100vh - 180px)", xs: "auto" },
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        Shopping Cart
                    </Typography>
                    <Badge badgeContent={cartItems.length} color="primary">
                        <CartIcon />
                    </Badge>
                </Box>

                <Box sx={{ flexGrow: 1, overflow: "auto" }}>
                    {cartItems.length === 0 ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                opacity: 0.6,
                            }}
                        >
                            <CartIcon
                                sx={{ fontSize: 60, color: "grey.500", mb: 2 }}
                            />
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                            >
                                Your cart is empty
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Add products from the grid on the left
                            </Typography>
                        </Box>
                    ) : (
                        <List sx={{ width: "100%" }}>
                            {cartItems.map((item, index) => (
                                <Box key={`${item.product.id}-${index}`}>
                                    <ListItem sx={{ py: 1 }}>
                                        <Box sx={{ width: "100%" }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle2"
                                                    noWrap
                                                    sx={{ maxWidth: "70%" }}
                                                >
                                                    {item.product.name}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    fontWeight="bold"
                                                >
                                                    {formatCurrency(
                                                        item.totalPrice
                                                    )}
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    mt: 1,
                                                }}
                                            >
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        decrementQuantity(index)
                                                    }
                                                    disabled={
                                                        item.quantity <= 1
                                                    }
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        mx: 1,
                                                        minWidth: "30px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item.quantity}
                                                </Typography>

                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        incrementQuantity(index)
                                                    }
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ ml: 1 }}
                                                >
                                                    x{" "}
                                                    {formatCurrency(
                                                        item.unitPrice
                                                    )}
                                                </Typography>

                                                <Box sx={{ flexGrow: 1 }} />

                                                <Tooltip title="Remove item">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                index
                                                            )
                                                        }
                                                        color="error"
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>

                                            {item.comment && (
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{
                                                        display: "block",
                                                        fontStyle: "italic",
                                                        mt: 0.5,
                                                        bgcolor: "grey.50",
                                                        p: 0.5,
                                                        borderRadius: 1,
                                                    }}
                                                >
                                                    Note: {item.comment}
                                                </Typography>
                                            )}
                                        </Box>
                                    </ListItem>
                                    <Divider />
                                </Box>
                            ))}
                        </List>
                    )}
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Divider sx={{ mb: 2 }} />
                    <TextField
                        variant="outlined"
                        label="Order Comment"
                        placeholder="Add special instructions or notes here"
                        size="small"
                        fullWidth
                        multiline
                        rows={2}
                        value={orderComment}
                        onChange={(e) => setOrderComment(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                        }}
                    >
                        <Typography variant="subtitle1">Subtotal:</Typography>
                        <Typography variant="subtitle1">
                            {formatCurrency(getCartTotal())}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold">
                            Total:
                        </Typography>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="primary"
                        >
                            {formatCurrency(getCartTotal())}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        disabled={cartItems.length === 0}
                        onClick={openChargePanel}
                    >
                        Checkout ({formatCurrency(getCartTotal())})
                    </Button>
                </Box>
            </Paper>
        </>
    );
}
