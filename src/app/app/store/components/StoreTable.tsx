"use client";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import type { StoreUserInterface } from "@/app/app/store/interface";
import { setUserStore } from "../service";

type Props = {
    store?: StoreUserInterface[];
};

export default function StoreTable({ store = [] }: Props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState<
        StoreUserInterface | undefined
    >(undefined);

    const handleConfirm = async () => {
        if (!selectedStore) return;
        await setUserStore(selectedStore.id);
        setDialogOpen(false);
        window.location.href = "/app";
    };

    async function handleSelectButton(storeData: StoreUserInterface) {
        setSelectedStore(storeData);
        setDialogOpen(true);
    }

    function handleEditButton(storeData: StoreUserInterface) {
        console.log(`Edit store id ${storeData.id}`);
    }

    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={() => {
                    setDialogOpen(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirm Store Selection
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Store name: {selectedStore?.name}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Your permission: {selectedStore?.permission}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Created by: {selectedStore?.createdBy}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Last update: {selectedStore?.updatedAt}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Updated by: {selectedStore?.updatedBy}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        This action will redirect you to dashboard page.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setDialogOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirm}
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="Store select table">
                    <TableHead
                        sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}
                    >
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Store name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Your permission
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Created by
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Last update
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Updated by
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Option
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {store.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {row.name}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {row.permission}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {row.createdBy}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {row.updatedAt}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {row.updatedBy}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Stack
                                        gap={1}
                                        direction={"row"}
                                        alignSelf={"center"}
                                        justifyContent={"center"}
                                    >
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={() =>
                                                handleEditButton(row)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color={
                                                row.permission === "Pending"
                                                    ? "error"
                                                    : "primary"
                                            }
                                            onClick={() =>
                                                handleSelectButton(row)
                                            }
                                        >
                                            {row.permission !== "Pending"
                                                ? "Select"
                                                : "Cancel join"}
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow></TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
