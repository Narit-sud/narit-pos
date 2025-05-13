"use client";
// MUI components
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
// Icons
import EditIcon from "@mui/icons-material/Edit";
// Custom components
import SupplierForm from "./SupplierForm";
import PopupModal from "@/components/PopupModal";
// Hooks
import { useSupplier } from "../useSupplier";
import { useState } from "react";
// Types
import { SupplierInterface } from "@/model/supplier.interface";

export default function SupplierTable() {
    const { suppliers } = useSupplier(); // get categories from context to display
    const [open, setOpen] = useState(false); // state to control the modal open/close
    const [selectedSupplier, setSelectedSupplier] = useState<
        SupplierInterface | undefined
    >(undefined); // state to store selected supplier

    const handleOpen = () => {
        setOpen(true); // open the modal
    };
    const handleClose = () => {
        setOpen(false); // close the modal
    };

    const handleRowDoubleClick = (supplier: SupplierInterface) => {
        handleOpen(); // open the modal
        setSelectedSupplier(supplier); // set selected supplier to the clicked supplier
    };

    const handleEditButton = (supplier: SupplierInterface) => {
        handleOpen(); // open the modal
        setSelectedSupplier(supplier); // set selected supplier
    };

    return (
        <>
            <PopupModal open={open} handleClose={handleClose}>
                <SupplierForm
                    mode="edit"
                    handleCancelButton={handleClose}
                    supplier={selectedSupplier}
                />
            </PopupModal>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                                Name
                            </TableCell>

                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                                Surname
                            </TableCell>

                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                                Phone Number
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                                Email
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                                Address
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                                Options
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {suppliers?.map((sup) => {
                            return (
                                <TableRow hover key={sup.id}>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {sup.name}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {sup.surname}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {sup.phoneNumber}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {sup.email || "N/A"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {sup.address || "N/A"}
                                    </TableCell>{" "}
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Tooltip title="Edit Product">
                                            <IconButton
                                                color="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditButton(sup);
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
