"use client";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BrandForm from "./BrandForm";
import PopupModal from "@/components/PopupModal";
import { useBrand } from "../useBrand";
import { convertToThailandTime } from "@/lib/convertTime";
import { BrandInterface } from "@/model/brand.interface";
import { useState } from "react";

export default function CategoryTable() {
    const { brands } = useBrand(); // get brand from context to display
    const [open, setOpen] = useState(false); // state to control the modal open/close
    const [selectedBrand, setSelectedBrand] = useState<
        BrandInterface | undefined
    >(undefined); // state to store selected brand

    const handleOpen = () => {
        setOpen(true); // open the modal
    };
    const handleClose = () => {
        setOpen(false); // close the modal
    };

    const handleRowDoubleClick = (brand: BrandInterface) => {
        handleOpen(); // open the modal
        setSelectedBrand(brand); // set selected category to the clicked category
    };
    return (
        <>
            <PopupModal open={open} handleClose={handleClose}>
                <BrandForm
                    mode="edit"
                    handleCancelButton={handleClose}
                    brand={selectedBrand}
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
                                Category
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                                Detail
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                                Created at
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                                Created by
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                                Updated at
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                            >
                                Updated by
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {brands?.map((bra) => {
                            return (
                                <TableRow
                                    hover
                                    key={bra.id}
                                    onDoubleClick={() =>
                                        handleRowDoubleClick(bra)
                                    }
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {bra.name}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {bra.category}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {bra.detail}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {bra.createdAt}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {bra.createdBy}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {bra.updatedAt}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {bra.updatedBy}
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
