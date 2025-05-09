import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import { CustomerInterface } from "@/model/customer.interface";

type Props = {
    customer: CustomerInterface;
    handleCancelButton: () => void;
};
export default function EditForm({
    customer,
    handleCancelButton = () => {
        console.log("Please add function to this button.");
    },
}: Props) {
    function handleSubmit() {
        console.log("Submit button clicked");
    }

    return (
        <>
            <Typography variant="h5">Edit Customer</Typography>
            <FormControl variant="filled" fullWidth>
                <Stack direction="column" spacing={1}>
                    <TextField
                        label="Name"
                        value={customer.name}
                        placeholder="Enter customer name"
                        required
                    />
                    <TextField
                        label="Surname"
                        value={customer.surname}
                        placeholder="Enter customer surname"
                    />
                    <TextField
                        label="Email"
                        value={customer.email}
                        placeholder="Enter customer email"
                    />
                    <TextField
                        label="Phone Number"
                        value={customer.phoneNumber}
                        placeholder="Enter customer phone number"
                    />
                    <TextField
                        label="Address"
                        value={customer.address}
                        placeholder="Enter customer address"
                    />
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="outlined" onClick={handleCancelButton}>
                        Cancel
                    </Button>
                </Stack>
            </FormControl>
        </>
    );
}
// 	}}
