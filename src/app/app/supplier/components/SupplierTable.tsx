"use client";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SupplierForm from "./SupplierForm";
import PopupModal from "@/components/PopupModal";
import { useSupplier } from "../useSupplier";
import { useState } from "react";
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
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {suppliers?.map((cat) => {
                            return (
                                <TableRow
                                    hover
                                    key={cat.id}
                                    sx={{ cursor: "pointer" }}
                                    onDoubleClick={() =>
                                        handleRowDoubleClick(cat)
                                    }
                                >
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {cat.name}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {cat.surname}
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        {cat.phoneNumber}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {cat.email || "N/A"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {cat.address || "N/A"}
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
