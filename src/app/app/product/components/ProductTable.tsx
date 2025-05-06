"use client";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ProductForm from "./ProductForm";
import PopupModal from "@/components/PopupModal";
import { useProduct } from "../useProduct";
import { useState, useEffect, use } from "react";
import { ProductInterface } from "@/model/product.interface";

export default function CategoryTable() {
    const { products } = useProduct(); // get brand from context to display
    const [open, setOpen] = useState(false); // state to control the modal open/close
    const [loading, setLoading] = useState<boolean>(false); // state to control the loading state
    const [error, setError] = useState<string | null>(null); // state to control the error state
    const [selectedProduct, setSelectedProduct] = useState<
        ProductInterface | undefined
    >(undefined); // state to store selected brand

    const handleOpen = () => {
        setOpen(true); // open the modal
    };
    const handleClose = () => {
        setOpen(false); // close the modal
    };

    const handleRowDoubleClick = (product: ProductInterface) => {
        handleOpen(); // open the modal
        setSelectedProduct(product); // set selected category to the clicked category
    };

    useEffect(() => {
        if (products) {
            setLoading(false); // set loading to false when products are fetched
        }
    }, [products]);

    return (
        <>
            <PopupModal open={open} handleClose={handleClose}>
                <ProductForm
                    mode="edit"
                    handleCancelButton={handleClose}
                    product={selectedProduct}
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
                    {loading && <CircularProgress />}
                    {!loading && products?.length === 0 && (
                        <TableBody>
                            {products?.map((prod) => {
                                return (
                                    <TableRow
                                        hover
                                        key={prod.id}
                                        onDoubleClick={() =>
                                            handleRowDoubleClick(prod)
                                        }
                                        sx={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        <TableCell sx={{ textAlign: "center" }}>
                                            {prod.name}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            {prod.category}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            {prod.detail}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            {prod.createdAt}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            {prod.createdBy}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            {prod.updatedAt}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            {prod.updatedBy}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </>
    );
}
