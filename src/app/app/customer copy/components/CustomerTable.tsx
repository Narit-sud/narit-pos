"use client";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomerForm from "./CustomerForm";
import PopupModal from "@/components/PopupModal";
import { useCustomer } from "../useCustomer";
import { useState } from "react";
import { CustomerInterface } from "@/model/customer.interface";

export default function CustomerTable() {
    const { customers } = useCustomer(); // get categories from context to display
    const [open, setOpen] = useState(false); // state to control the modal open/close
    const [selectedCustomer, setSelectedCustomer] = useState<
        CustomerInterface | undefined
    >(undefined); // state to store selected customer

    const handleOpen = () => {
        setOpen(true); // open the modal
    };
    const handleClose = () => {
        setOpen(false); // close the modal
    };

    const handleRowDoubleClick = (customer: CustomerInterface) => {
        handleOpen(); // open the modal
        setSelectedCustomer(customer); // set selected customer to the clicked customer
    };

    return (
        <>
            <PopupModal open={open} handleClose={handleClose}>
                <CustomerForm
                    mode="edit"
                    handleCancelButton={handleClose}
                    customer={selectedCustomer}
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
                        {customers?.map((cat) => {
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
