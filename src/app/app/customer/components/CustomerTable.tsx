"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
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
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

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
                                    {" "}
                                    Name
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Contact Information
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Created
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
                                        {customer.name} {customer.surname || ""}
                                        {customer.address && (
                                            <Typography
                                                variant="caption"
                                                display="block"
                                                color="text.secondary"
                                            >
                                                {customer.address}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Stack
                                            direction="column"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            {customer.email && (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <EmailIcon
                                                        fontSize="small"
                                                        color="primary"
                                                    />
                                                    <Typography variant="body2">
                                                        {customer.email}
                                                    </Typography>
                                                </Box>
                                            )}
                                            {customer.phoneNumber && (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <PhoneIcon
                                                        fontSize="small"
                                                        color="secondary"
                                                    />
                                                    <Typography variant="body2">
                                                        {customer.phoneNumber}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Created{" "}
                                            {formatDate(customer.createdAt)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
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
                            {" "}
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { boxShadow: 6 },
                                    transition: "box-shadow 0.3s ease-in-out",
                                    borderRadius: 2,
                                }}
                                onClick={() => handleEditCustomer(customer)}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                            >
                                                {customer.name}{" "}
                                                {customer.surname || ""}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 1,
                                                    mt: 1,
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                {customer.email && (
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        <EmailIcon
                                                            fontSize="small"
                                                            color="primary"
                                                        />
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            {customer.email}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
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

                                    <Divider sx={{ my: 2 }} />

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            {customer.phoneNumber && (
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <PhoneIcon
                                                        fontSize="small"
                                                        color="secondary"
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {customer.phoneNumber}
                                                    </Typography>
                                                </Box>
                                            )}
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    mt: 0.5,
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Created{" "}
                                                    {formatDate(
                                                        customer.createdAt
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <IconButton
                                            size="medium"
                                            color="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditCustomer(customer);
                                            }}
                                            sx={{ ml: 1 }}
                                        >
                                            <EditIcon />
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
