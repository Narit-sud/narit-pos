"use client";
import { usePosContext } from "../usePosContext";
import { useCustomer } from "../../customer/useCustomer";
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
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    List,
    ListItem,
    ListItemText,
    Chip,
    SelectChangeEvent,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function ChargePanel() {
    const {
        isChargePanelOpen,
        closeChargePanel,
        cartItems,
        getCartTotal,
        amountPaid,
        setAmountPaid,
        paymentMethod,
        setPaymentMethod,
        selectedCustomer,
        selectCustomer,
        processPayment,
    } = usePosContext();

    const { customers } = useCustomer();
    const [changeAmount, setChangeAmount] = useState(0);

    useEffect(() => {
        // Calculate change amount when amount paid changes
        setChangeAmount(amountPaid - getCartTotal());
    }, [amountPaid, getCartTotal]);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Handle payment method change
    const handlePaymentMethodChange = (event: SelectChangeEvent<string>) => {
        setPaymentMethod(event.target.value as "cash" | "transfer");
    };

    // Handle customer change
    const handleCustomerChange = (event: SelectChangeEvent<string>) => {
        const customerId = event.target.value;
        const customer = customers.find((c) => c.id === customerId);
        if (customer) {
            selectCustomer(customer);
        }
    };

    // Handle amount paid change
    const handleAmountPaidChange = (amount: number) => {
        setAmountPaid(amount);
    };

    // Quick amount buttons
    const quickAmounts = [
        getCartTotal(),
        Math.ceil(getCartTotal() / 100) * 100, // Round up to nearest 100
        1000,
        2000,
    ].filter((amount, index, self) => self.indexOf(amount) === index); // Remove duplicates

    // Handle payment submission
    const handleSubmitPayment = async () => {
        try {
            await processPayment();
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };

    return (
        <Dialog
            open={isChargePanelOpen}
            onClose={closeChargePanel}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ fontWeight: "bold" }}>Checkout</DialogTitle>

            <DialogContent>
                <Grid container spacing={3}>
                    {/* Left side - Cart Summary */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            fontWeight="medium"
                        >
                            Order Summary
                        </Typography>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                mb: 2,
                                maxHeight: 300,
                                overflow: "auto",
                            }}
                        >
                            <List disablePadding>
                                {cartItems.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        disablePadding
                                        sx={{ py: 1 }}
                                    >
                                        <ListItemText
                                            primary={item.product.name}
                                            secondary={`${
                                                item.quantity
                                            } x ${formatCurrency(
                                                item.unitPrice
                                            )}`}
                                        />
                                        <Typography
                                            variant="body2"
                                            fontWeight="medium"
                                        >
                                            {formatCurrency(item.totalPrice)}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                            }}
                        >
                            <Typography variant="subtitle1">
                                Subtotal:
                            </Typography>
                            <Typography variant="subtitle1">
                                {formatCurrency(getCartTotal())}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 1.5 }} />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
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
                    </Grid>

                    {/* Right side - Payment Info */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            fontWeight="medium"
                        >
                            Payment Information
                        </Typography>

                        {/* Customer Selection */}
                        <FormControl
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                        >
                            <InputLabel id="customer-select-label">
                                Customer
                            </InputLabel>
                            <Select
                                labelId="customer-select-label"
                                value={selectedCustomer?.id || ""}
                                onChange={handleCustomerChange}
                                label="Customer"
                            >
                                {customers.map((customer) => (
                                    <MenuItem
                                        key={customer.id}
                                        value={customer.id}
                                    >
                                        {customer.name} {customer.surname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Payment Method */}
                        <FormControl
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                        >
                            <InputLabel id="payment-method-label">
                                Payment Method
                            </InputLabel>
                            <Select
                                labelId="payment-method-label"
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                                label="Payment Method"
                            >
                                <MenuItem value="cash">Cash</MenuItem>
                                <MenuItem value="transfer">
                                    Bank Transfer
                                </MenuItem>
                            </Select>
                        </FormControl>

                        {/* Amount Paid */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Amount Paid:
                            </Typography>

                            <TextField
                                value={amountPaid}
                                onChange={(e) =>
                                    handleAmountPaidChange(
                                        parseFloat(e.target.value) || 0
                                    )
                                }
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
                                sx={{ mb: 2 }}
                            />

                            {/* Quick amount buttons */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                    mb: 3,
                                }}
                            >
                                {quickAmounts.map((amount) => (
                                    <Chip
                                        key={amount}
                                        label={formatCurrency(amount)}
                                        onClick={() =>
                                            handleAmountPaidChange(amount)
                                        }
                                        color={
                                            amountPaid === amount
                                                ? "primary"
                                                : "default"
                                        }
                                        clickable
                                    />
                                ))}
                            </Box>

                            {/* Change Amount */}
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    textAlign: "center",
                                    bgcolor:
                                        changeAmount >= 0
                                            ? "success.light"
                                            : "error.light",
                                    color:
                                        changeAmount >= 0
                                            ? "success.contrastText"
                                            : "error.contrastText",
                                }}
                            >
                                <Typography variant="subtitle2">
                                    Change:
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {formatCurrency(changeAmount)}
                                </Typography>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={closeChargePanel} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmitPayment}
                    variant="contained"
                    color="primary"
                    disabled={
                        (paymentMethod === "cash" &&
                            amountPaid < getCartTotal()) ||
                        cartItems.length === 0
                    }
                >
                    Complete Payment
                </Button>
            </DialogActions>
        </Dialog>
    );
}
