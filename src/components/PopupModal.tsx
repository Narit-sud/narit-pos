"use client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    open: boolean;
    width?: string | number;
    handleClose: () => void;
};

export default function PopupModal({
    children,
    width = 400,
    open = false,
    handleClose,
}: Props) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "100vw", sm: width },
                    maxHeight: { sm: "100vh", md: "90vh" },
                    overflowY: "auto",
                    overflowX: "hidden",
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                }}
            >
                {children}
            </Box>
        </Modal>
    );
}
