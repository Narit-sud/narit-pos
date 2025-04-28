"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreateForm() {
    const nameRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    function handleCencelButton() {
        router.back();
    }
    function handleCreateButton() {}
    return (
        <Container>
            <Paper elevation={2}>
                <FormControl>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "auto",
                        }}
                    >
                        <TextField
                            type="text"
                            ref={nameRef}
                            label="Store Name"
                            placeholder="Enter your store name"
                        />
                    </Box>
                </FormControl>
                <Button variant="contained">Create</Button>
                <Button variant="outlined">Cancel</Button>
            </Paper>
        </Container>
    );
}
