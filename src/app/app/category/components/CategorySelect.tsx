"use client";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import PopupModal from "@/components/PopupModal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import CategoryForm from "./CategoryForm";
import { useCategory } from "@/app/app/category/useCategory";
import { useState } from "react";
import { Divider, FormControl, InputLabel } from "@mui/material";

type Props = {
    getValue?: (categoryId: string) => void;
    initialValue?: string;
};
export default function CategorySelect({ getValue, initialValue }: Props) {
    const [currentCategory, setCurrentCategory] = useState<string>(
        initialValue || "",
    ); // categoryId
    const [createMode, setCreateMode] = useState<boolean>(false); // toggle create popup modal
    const { categories } = useCategory(); // get categories from context to display

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value === "create") {
            return setCreateMode(true);
        }
        setCurrentCategory(event.target.value as string);
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
                    <CategoryForm
                        mode="create"
                        handleCancelButton={() => {
                            setCreateMode(false);
                        }}
                    />
                </PopupModal>
            )}
            <Divider />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    onChange={handleChange}
                    value={currentCategory}
                    label="Category"
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <Typography>{category.name}</Typography>
                                <Typography>{category.detail}</Typography>
                            </Box>
                        </MenuItem>
                    ))}
                    <MenuItem value={"create"}>
                        <AddIcon /> Create new category
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
