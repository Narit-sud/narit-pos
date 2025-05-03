"use client";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import PopupModal from "@/components/PopupModal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import BrandForm from "./BrandForm";
import { useBrand } from "@/app/app/brand/useBrand";
import { useState } from "react";
import { Divider, FormControl, InputLabel } from "@mui/material";

type Props = {
    getValue?: (brandId: string) => void;
    initialValue?: string;
    filter?: string;
};
export default function CategorySelect({
    getValue,
    initialValue,
    filter,
}: Props) {
    const { brands } = useBrand(); // get categories from context to display
    const [currentBrand, setCurrentBrand] = useState<string>(
        initialValue || ""
    ); // brandId
    const [createMode, setCreateMode] = useState<boolean>(false); // toggle create popup modal

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value === "create") {
            return setCreateMode(true);
        }
        setCurrentBrand(event.target.value as string);
        getValue?.(event.target.value as string);
    };
    return (
        <Box>
            {createMode && (
                <PopupModal
                    open={createMode}
                    handleClose={() => {
                        setCreateMode(false);
                    }}
                >
                    <BrandForm
                        mode="create"
                        handleCancelButton={() => {
                            setCreateMode(false);
                        }}
                    />
                </PopupModal>
            )}
            <Divider />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    onChange={handleChange}
                    value={currentBrand}
                    label="Category"
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
                    <MenuItem value={"create"}>
                        <AddIcon /> Create new brand
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
