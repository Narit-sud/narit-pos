"use client";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CategoryForm from "./CategoryForm";
import PopupModal from "@/components/PopupModal";
import { useCategory } from "../useCategory";
import { useState } from "react";
import { CategoryInterface } from "@/model/category.interface";
import { convertToThailandTime } from "@/lib/convertTime";

export default function CategoryTable() {
    const { categories } = useCategory(); // get categories from context to display
    const [open, setOpen] = useState(false); // state to control the modal open/close
    const [selectedCategory, setSelectedCategory] = useState<
        CategoryInterface | undefined
    >(undefined); // state to store selected category

    const handleOpen = () => {
        setOpen(true); // open the modal
    };
    const handleClose = () => {
        setOpen(false); // close the modal
    };

    const handleRowDoubleClick = (category: CategoryInterface) => {
        handleOpen(); // open the modal
        setSelectedCategory(category); // set selected category to the clicked category
    };

    return (
        <>
            <PopupModal open={open} handleClose={handleClose}>
                <CategoryForm
                    mode="edit"
                    handleCancelButton={handleClose}
                    category={selectedCategory}
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
                        {categories?.map((cat) => {
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
                                        {cat.detail}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {cat.createdAt}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {cat.createdBy}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {cat.updatedAt}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {cat.updatedBy}
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
