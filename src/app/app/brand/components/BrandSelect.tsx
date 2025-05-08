"use client";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import PopupModal from "@/components/PopupModal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import BrandForm from "./BrandForm";
import { useBrand } from "@/app/app/brand/useBrand";
import { useState } from "react";

type Props = {
    getValue?: (brandId: string) => void;
    initialValue?: string;
    showRequired?: boolean;
    createMode?: boolean;
};
/**
 * BrandSelect component
 * This component is used to select a category from a list of categories.
 * It takes in the following props:
 * @param getValue: (categoryId: string) => void - function to handle category selection (default is empty function)
 * @param initialValue: string - initial value of the select input (optional)
 * @param showRequired: boolean - whether to show the required asterisk or not (default is true)
 */
export default function CategorySelect({
    getValue = () => {},
    initialValue = "",
    showRequired = true,
    createMode = false,
}: Props) {
    const { brands } = useBrand(); // get brands from context to display
    const [currentBrand, setCurrentBrand] = useState<string>(initialValue); // brandId
    const [createPopupOpen, setCreatePopupOpen] = useState<boolean>(false); // toggle create popup modal

    const handleCreateOpen = () => {
        setCreatePopupOpen(true); // open the create popup modal
    };

    const handleCreateClose = () => {
        setCreatePopupOpen(false); // close the create popup modal
    };

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value === "create") {
            return handleCreateOpen();
        }
        setCurrentBrand(event.target.value as string);
        getValue?.(event.target.value as string);
    };
    return (
        <Box>
            {createMode && (
                <PopupModal
                    open={createPopupOpen}
                    handleClose={handleCreateClose}
                    width={500}
                >
                    <BrandForm
                        mode="create"
                        handleCancelButton={handleCreateClose}
                    />
                </PopupModal>
            )}
            <FormControl fullWidth>
                <InputLabel id="brand-select-label">Brand</InputLabel>
                <Select
                    labelId="brand-select-label"
                    onChange={handleChange}
                    value={currentBrand}
                    label={showRequired ? "Brand*" : "Brand"}
                >
                    {brands.map((bra) => (
                        <MenuItem key={bra.id} value={bra.id}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <Typography>{bra.name}</Typography>
                                <Typography>{bra.detail}</Typography>
                            </Box>
                        </MenuItem>
                    ))}
                    {createMode && (
                        <MenuItem value={"create"}>
                            <AddIcon /> Create new brand
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}
