"use client";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { createNewStoreInterface, type NewStoreInterface } from "../interface";
import { createStoreService } from "../service";
import { useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
    handleCancelButton: () => void;
};
export default function StoreForm({ handleCancelButton }: Props) {
    const nameRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    async function handleCreateButton() {
        // if (!nameRef.current?.value) {
        //     // Add validation
        //     return;
        // }

        const newStore = createNewStoreInterface({
            name: nameRef.current!.value,
        });

        try {
            await createStoreService(newStore);
            // Close modal and refresh store list
            handleCancelButton();
            router.refresh();
        } catch (error) {
            console.error("Failed to create store:", error);
        }
    }
    return (
        <Paper elevation={2} sx={{ justifyContent: "center", padding: 2 }}>
            <FormControl fullWidth variant="outlined">
                <TextField
                    type="text"
                    inputRef={nameRef}
                    label="Store Name"
                    placeholder="Enter your store name"
                    required
                />
            </FormControl>
            <Stack spacing={1} direction="row" justifyContent="flex-end" mt={1}>
                <Button
                    type="button"
                    variant="outlined"
                    onClick={handleCancelButton}
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    onClick={handleCreateButton}
                >
                    Create
                </Button>
            </Stack>
        </Paper>
    );
}
