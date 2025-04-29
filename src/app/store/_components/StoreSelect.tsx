import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { StoreUserInterface } from "@/app/store/interface";

type Props = {
    store: StoreUserInterface[];
};

export default function StoreSelect({ store }: Props) {
    function handleSelect(id: string) {
        console.log(`Select store id ${id}`);
    }
    function handleEdit(id: string) {
        console.log(`Edit store id ${id}`);
    }
    return (
        <>
            {JSON.stringify(store)}
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="Store select table">
                    <TableHead
                        sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}
                    >
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Store name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Your permission
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Created by
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Last update
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Updated by
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography fontWeight="bold">
                                    Option
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {store.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {row.name}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {row.permission}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {row.createdBy}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {row.updatedAt}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {row.updatedBy}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Stack
                                        gap={1}
                                        direction={"row"}
                                        alignSelf={"center"}
                                        justifyContent={"center"}
                                    >
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={() => handleEdit(row.id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={() => handleSelect(row.id)}
                                        >
                                            {row.permission !== "Pending"
                                                ? "Select"
                                                : "Cancel join"}
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow></TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
