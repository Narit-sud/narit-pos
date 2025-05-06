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
    showRequired?: boolean;
};
/**
 * CategorySelect component
 * This component is used to select a category from a list of categories.
 * It takes in the following props:
 * @param getValue: (categoryId: string) => void - function to handle category selection (default is empty function)
 * @param initialValue: string - initial value of the select input (optional)
 * @param showRequired: boolean - whether to show the required asterisk or not (default is true)
 */
export default function CategorySelect({
    getValue = () => {},
    initialValue,
    showRequired = true,
}: Props) {
    const { categories } = useCategory(); // get categories from context to display
    const [currentCategory, setCurrentCategory] = useState<string>(
        initialValue || ""
    ); // categoryId
    const [createMode, setCreateMode] = useState<boolean>(false); // toggle create popup modal

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
                    label={showRequired ? "Category*" : "Category"}
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
