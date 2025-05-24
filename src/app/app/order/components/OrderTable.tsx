"use client";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

import PopupModal from "@/components/PopupModal";
import { useMediaQuery, useTheme } from "@mui/material";

type Order = {
    customer: string;
    itemCount: number;
    total: number;
    createdAt: string;
    updatedAt: string;
};

const fakeData: Order[] = [
    {
        customer: "Mr. John",
        itemCount: 3,
        total: 100,
        createdAt: "2023-10-01 10:23:32",
        updatedAt: "2023-10-10 10:10:10",
    },
    {
        customer: "Mr. Wick",
        itemCount: 2,
        total: 240,
        createdAt: "2023-10-01 10:23:32",
        updatedAt: "2023-10-10 10:10:10",
    },
    {
        customer: "Mr. Bean",
        itemCount: 9,
        total: 576,
        createdAt: "2023-10-01 10:23:32",
        updatedAt: "2023-10-10 10:10:10",
    },
];

export default function OrderTable() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<Order[]>([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const initialize = () => {
        setTimeout(() => {
            setLoading(false);
            setRows(fakeData);
        }, 2000);
    };

    useEffect(() => {
        initialize();
    }, []);
    return (
        <>
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
            {/* Desktop/tablet view */}
            {!loading && !isMobile && rows && (
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
                                    <Typography>Date</Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    <Typography>Customer</Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    <Typography>Item Count</Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    <Typography>Total</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow hover key={row.createdAt}>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Typography>{row.createdAt}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Typography>{row.customer}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Typography>{row.itemCount}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Typography>{row.total}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {/* Mobile view */}
        </>
    );
}
