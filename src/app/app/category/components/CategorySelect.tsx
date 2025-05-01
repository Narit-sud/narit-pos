"use client";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";

type Props = {
    getValue?: () => void;
};
export default function CategorySelect({ getValue }: Props) {
    const [currentCategory, setCurrentCategory] = useState();

    return (
        <Box>
            <Select>
                <MenuItem />
            </Select>
        </Box>
    );
}
