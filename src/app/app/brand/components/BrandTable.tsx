"use client";
import PopupModal from "@/components/PopupModal";
import { BrandInterface } from "@/model/brand.interface";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid"; // Fixed import path for Grid
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { useBrand } from "../useBrand";
import BrandForm from "./BrandForm";

export default function BrandTable() {
    const { brands } = useBrand(); // get brand from context to display
    const [open, setOpen] = useState(false); // state to control the modal open/close
    const [loading, setLoading] = useState<boolean>(true); // state to control the loading state
    const [selectedBrand, setSelectedBrand] = useState<
        BrandInterface | undefined
    >(undefined); // state to store selected brand
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpen = () => {
        setOpen(true); // open the modal
    };
    const handleClose = () => {
        setOpen(false); // close the modal
    };

    const handleEditBrand = (brand: BrandInterface) => {
        handleOpen(); // open the modal
        setSelectedBrand(brand); // set selected category to the clicked category
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return formatDistanceToNow(date, { addSuffix: true });
        } catch {
            return dateString;
        }
    };

    useEffect(() => {
        if (brands.length > 0) {
            setLoading(false);
        }
    }, [brands]);
    return (
        <>
            <PopupModal open={open} handleClose={handleClose}>
                <BrandForm
                    mode="edit"
                    handleCancelButton={handleClose}
                    brand={selectedBrand}
                />
            </PopupModal>
            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "200px",
                    }}
                >
                    <CircularProgress size={60} />
                </Box>
            )}{" "}
            {!loading && brands && !isMobile && (
                <TableContainer
                    sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                >
                    <Table>
                        <TableHead
                            sx={{ backgroundColor: theme.palette.primary.main }}
                        >
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
                                    Category
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Detail
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Created
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
                            {brands?.map((brand) => (
                                <TableRow
                                    hover
                                    key={brand.id}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor:
                                                theme.palette.action.hover,
                                        },
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            textAlign: "center",
                                            fontWeight: "medium",
                                        }}
                                    >
                                        {brand.name}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Chip
                                            icon={<CategoryIcon />}
                                            label={brand.category}
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {brand.detail || "-"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Tooltip
                                            title={`Created by ${brand.createdBy}`}
                                        >
                                            <Typography variant="body2">
                                                {formatDate(brand.createdAt)}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Tooltip title="Edit Brand">
                                            <IconButton
                                                color="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditBrand(brand);
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}{" "}
            {!loading && brands && isMobile && (
                <Grid container spacing={2}>
                    {brands.map((brand) => (
                        <Grid size={{ xs: 12 }} key={brand.id}>
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { boxShadow: 6 },
                                    transition: "box-shadow 0.3s ease-in-out",
                                }}
                                onClick={() => handleEditBrand(brand)}
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
                                            {brand.name}
                                        </Typography>
                                        <Chip
                                            icon={<CategoryIcon />}
                                            label={brand.category}
                                            size="small"
                                            color="primary"
                                        />
                                    </Box>

                                    {brand.detail && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 1 }}
                                        >
                                            {brand.detail}
                                        </Typography>
                                    )}

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
                                            Created{" "}
                                            {formatDate(brand.createdAt)}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditBrand(brand);
                                            }}
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
