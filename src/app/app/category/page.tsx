import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";

export default function Page() {
    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <CategoryTable />
        </Paper>
    );
}
