"use client";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useBrand } from "../useBrand";

export default function CategoryTable() {
    const { brands } = useBrand(); // get categories from context to display

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Detail</TableCell>
                    <TableCell>Created at</TableCell>
                    <TableCell>Created by</TableCell>
                    <TableCell>Updated at</TableCell>
                    <TableCell>Updated by</TableCell>
                </TableHead>
                <TableBody>
                    {brands?.map((bra) => {
                        return (
                            <TableRow hover key={bra.id}>
                                <TableCell>{bra.name}</TableCell>
                                <TableCell>{bra.category}</TableCell>
                                <TableCell>{bra.detail}</TableCell>
                                <TableCell>{bra.createdAt}</TableCell>
                                <TableCell>{bra.createdBy}</TableCell>
                                <TableCell>{bra.updatedAt}</TableCell>
                                <TableCell>{bra.updatedBy}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
