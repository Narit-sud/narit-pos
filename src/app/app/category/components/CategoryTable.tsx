"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useCategory } from "../useCategory";

export default function CategoryTable() {
    const { categories } = useCategory(); // get categories from context to display

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>Name</TableCell>
                    <TableCell>Detail</TableCell>
                    <TableCell>Created at</TableCell>
                    <TableCell>Created by</TableCell>
                    <TableCell>Updated at</TableCell>
                    <TableCell>Updated by</TableCell>
                </TableHead>
                <TableBody>
                    {categories?.map((cat) => {
                        return (
                            <TableRow hover key={cat.id}>
                                <TableCell>{cat.name}</TableCell>
                                <TableCell>{cat.detail}</TableCell>
                                <TableCell>{cat.createdAt}</TableCell>
                                <TableCell>{cat.createdBy}</TableCell>
                                <TableCell>{cat.updatedAt}</TableCell>
                                <TableCell>{cat.updatedBy}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
