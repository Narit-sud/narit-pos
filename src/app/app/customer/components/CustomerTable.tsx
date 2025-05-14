"use client";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid"; // Fixed import path for Grid
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";

import PopupModal from "@/components/PopupModal";
import CustomerForm from "./CustomerForm";

import { useEffect, useState } from "react";
import { useCustomer } from "../useCustomer";

import { CustomerInterface } from "@/model/customer.interface";
import { formatDistanceToNow } from "date-fns";

export default function CustomerTable() {
    const { customers } = useCustomer(); // get customer from context to display
    const [open, setOpen] = useState(false); // state to control the modal open/close
    const [loading, setLoading] = useState<boolean>(true); // state to control the loading state
    const [selectedCustomer, setSelectedCustomer] = useState<
        CustomerInterface | undefined
    >(undefined); // state to store selected customer
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpen = () => {
        setOpen(true); // open the modal
    };
    const handleClose = () => {
        setOpen(false); // close the modal
    };

    const handleEditCustomer = (customer: CustomerInterface) => {
        handleOpen(); // open the modal
        setSelectedCustomer(customer); // set selected category to the clicked category
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return formatDistanceToNow(date, { addSuffix: true });
        } catch {
            return dateString;
        }
    };

    useEffect(() => {
        if (customers.length > 0) {
            setLoading(false);
        }
    }, [customers]);
    return (
        <>
            <PopupModal open={open} handleClose={handleClose}>
                <CustomerForm
                    mode="edit"
                    handleCancelButton={handleClose}
                    customer={selectedCustomer}
                />
            </PopupModal>
            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "200px",
                    }}
                >
                    <CircularProgress size={60} />
                </Box>
            )}
            {!loading && customers && !isMobile && (
                <TableContainer
                    sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                >
                    <Table>
                        <TableHead
                            sx={{ backgroundColor: theme.palette.primary.main }}
                        >
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Surname
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Email
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Phone Number
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Address
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {customers?.map((customer) => (
                                <TableRow
                                    hover
                                    key={customer.id}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor:
                                                theme.palette.action.hover,
                                        },
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            textAlign: "center",
                                            fontWeight: "medium",
                                        }}
                                    >
                                        {customer.name}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {customer.surname || "-"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {customer.email || "-"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {customer.phoneNumber || "-"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {customer.address || "-"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {
                                            <Tooltip title="Edit Customer">
                                                <IconButton
                                                    color="primary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditCustomer(
                                                            customer
                                                        );
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {!loading && customers && isMobile && (
                <Grid container spacing={2}>
                    {customers.map((customer) => (
                        <Grid size={{ xs: 12 }} key={customer.id}>
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { boxShadow: 6 },
                                    transition: "box-shadow 0.3s ease-in-out",
                                }}
                                onClick={() => handleEditCustomer(customer)}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="div"
                                        >
                                            {customer.name}
                                        </Typography>
                                    </Box>

                                    {customer.address && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 1 }}
                                        >
                                            {customer.address}
                                        </Typography>
                                    )}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            mt: 2,
                                            pt: 1,
                                            borderTop: "1px solid #eee",
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Created{" "}
                                            {formatDate(customer.createdAt)}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditCustomer(customer);
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}
