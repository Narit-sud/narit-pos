"use client";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
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

import PopupModal from "@/components/PopupModal";
import SupplierForm from "./SupplierForm";

import { useEffect, useState } from "react";
import { useSupplier } from "../useSupplier";

import { SupplierInterface } from "@/model/supplier.interface";
import { formatDistanceToNow } from "date-fns";

export default function SupplierTable() {
    const { suppliers } = useSupplier(); // get suppliers from context to display
    const [open, setOpen] = useState(false); // state to control the modal open/close
    const [loading, setLoading] = useState<boolean>(true); // state to control the loading state
    const [selectedSupplier, setSelectedSupplier] = useState<
        SupplierInterface | undefined
    >(undefined); // state to store selected supplier
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpen = () => {
        setOpen(true); // open the modal
    };
    const handleClose = () => {
        setOpen(false); // close the modal
    };

    const handleEditSupplier = (supplier: SupplierInterface) => {
        handleOpen(); // open the modal
        setSelectedSupplier(supplier); // set selected supplier to the clicked supplier
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
        if (suppliers.length > 0) {
            setLoading(false);
        }
    }, [suppliers]);
    return (
        <>
            <PopupModal open={open} handleClose={handleClose}>
                <SupplierForm
                    mode="edit"
                    handleCancelButton={handleClose}
                    supplier={selectedSupplier}
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
            {!loading && suppliers && !isMobile && (
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
                            {suppliers?.map((supplier) => (
                                <TableRow
                                    hover
                                    key={supplier.id}
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
                                        {supplier.name}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {supplier.surname || "-"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {supplier.email || "-"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {supplier.phoneNumber || "-"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {supplier.address || "-"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {
                                            <Tooltip title="Edit Supplier">
                                                <IconButton
                                                    color="primary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditSupplier(
                                                            supplier
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
            {!loading && suppliers && isMobile && (
                <Grid container spacing={2}>
                    {suppliers.map((supplier) => (
                        <Grid size={{ xs: 12 }} key={supplier.id}>
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { boxShadow: 6 },
                                    transition: "box-shadow 0.3s ease-in-out",
                                }}
                                onClick={() => handleEditSupplier(supplier)}
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
                                            {supplier.name}
                                        </Typography>
                                    </Box>

                                    {supplier.address && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 1 }}
                                        >
                                            {supplier.address}
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
                                            {formatDate(supplier.createdAt)}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditSupplier(supplier);
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
