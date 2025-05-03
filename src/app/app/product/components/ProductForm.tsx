import Stack from "@mui/material/Stack";
import CategorySelect from "@/app/app/category/components/CategorySelect";
import BrandSelect from "@/app/app/brand/components/BrandSelect";

export default function ProductForm() {
    return (
        <Stack direction="column" spacing={2}>
            <CategorySelect />
            <BrandSelect />
        </Stack>
    );
}
