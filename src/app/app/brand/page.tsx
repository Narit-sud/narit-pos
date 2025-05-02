import Box from "@mui/material/Box";
import BrandForm from "./components/BrandForm";

export default function Page() {
    return (
        <Box>
            brand page
            <BrandForm mode="create" />
        </Box>
    );
}
