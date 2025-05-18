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
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";

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
                                        {supplier.name} {supplier.surname || ""}
                                        {supplier.address && (
                                            <Typography
                                                variant="caption"
                                                display="block"
                                                color="text.secondary"
                                            >
                                                {supplier.address}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Stack
                                            direction="column"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            {supplier.email && (
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
                                                        {supplier.email}
                                                    </Typography>
                                                </Box>
                                            )}
                                            {supplier.phoneNumber && (
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
                                                        {supplier.phoneNumber}
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
                                            {formatDate(supplier.createdAt)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
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
                            {" "}
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { boxShadow: 6 },
                                    transition: "box-shadow 0.3s ease-in-out",
                                    borderRadius: 2,
                                }}
                                onClick={() => handleEditSupplier(supplier)}
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
                                                {supplier.name}{" "}
                                                {supplier.surname || ""}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 1,
                                                    mt: 1,
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                {supplier.email && (
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
                                                            {supplier.email}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>

                                    {supplier.address && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 1 }}
                                        >
                                            <BusinessIcon
                                                fontSize="small"
                                                sx={{
                                                    verticalAlign: "middle",
                                                    mr: 0.5,
                                                }}
                                            />
                                            {supplier.address}
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
                                            {supplier.phoneNumber && (
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
                                                        {supplier.phoneNumber}
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
                                                        supplier.createdAt
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <IconButton
                                            size="medium"
                                            color="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditSupplier(supplier);
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
