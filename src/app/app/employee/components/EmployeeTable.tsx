"use client";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";

import { EmployeeInterface } from "@/model/employee.interface";
import { getEmployeePermissionList } from "@/app/app/employee/service";

import { useState, useEffect } from "react";

export default function EmployeeTable() {
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const initialize = async () => {
        const employees = await getEmployeePermissionList();
        setEmployees(employees);
    };
    useEffect(() => {
        initialize();
    }, []);

    return (
        <>
            <TableContainer
                sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid rgba(224, 224, 224, 1)",
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                Name
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                Surname
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                Username
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                Email
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                Permission
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                Joined
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {employees?.map((employee) => (
                            <TableRow hover key={employee.userId}>
                                <TableCell
                                    sx={{
                                        textAlign: "center",
                                        fontWeight: "medium",
                                    }}
                                >
                                    {employee.name}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {employee.surname || "-"}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {employee.username || "-"}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {employee.email || "-"}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Chip
                                        label={employee.permission}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {employee.joinedAt}
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    {
                                        <Tooltip title="Edit Employee">
                                            <IconButton color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {employees && (
                <Grid container spacing={2}>
                    {employees.map((employee) => (
                        <Grid size={{ xs: 12 }} key={employee.userId}>
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { boxShadow: 6 },
                                    transition: "box-shadow 0.3s ease-in-out",
                                }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="div"
                                        >
                                            {employee.name} {employee.surname}
                                        </Typography>
                                        <Chip
                                            label={employee.permission}
                                            color="primary"
                                            size="small"
                                        />
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        {employee.email}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Username: {employee.username}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            mt: 2,
                                            pt: 1,
                                            borderTop: "1px solid #eee",
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Joined {employee.joinedAt}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}
