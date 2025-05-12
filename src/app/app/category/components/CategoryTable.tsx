"use client";
import PopupModal from "@/components/PopupModal";
import { CategoryInterface } from "@/model/category.interface";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { useCategory } from "../useCategory";
import CategoryForm from "./CategoryForm";

// Material UI imports
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid/";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

// Icons
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";

export default function CategoryTable() {
    const { categories } = useCategory(); // get categories from context to display
    const [open, setOpen] = useState(false); // state to control the modal open/close
    const [loading, setLoading] = useState(categories?.length === 0); // state to control the loading state
    const [selectedCategory, setSelectedCategory] = useState<
        CategoryInterface | undefined
    >(undefined); // state to store selected category
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpen = () => {
        setOpen(true); // open the modal
    };
    const handleClose = () => {
        setOpen(false); // close the modal
    };

    const handleEditCategory = (category: CategoryInterface) => {
        handleOpen(); // open the modal
        setSelectedCategory(category); // set selected category to the clicked category
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
        if (categories.length > 0) {
            setLoading(false); // set loading to false if categories are loaded
        }
    }, [categories]);
    return (
        <>
            <PopupModal open={open} handleClose={handleClose}>
                <CategoryForm
                    mode="edit"
                    handleCancelButton={handleClose}
                    category={selectedCategory}
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
            {!loading && categories && !isMobile && (
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
                            {categories?.map((category) => (
                                <TableRow
                                    hover
                                    key={category.id}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor:
                                                theme.palette.action.hover,
                                        },
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            textAlign: "left",
                                            fontWeight: "medium",
                                        }}
                                    >
                                        {category.name}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {category.detail || "-"}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Tooltip
                                            title={`Created by ${category.createdBy}`}
                                        >
                                            <Typography variant="body2">
                                                {formatDate(category.createdAt)}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Tooltip title="Edit Category">
                                            <IconButton
                                                color="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditCategory(
                                                        category
                                                    );
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
            {!loading && categories && isMobile && (
                <Grid container spacing={2}>
                    {categories.map((category) => (
                        <Grid size={{ xs: 12 }} key={category.id}>
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { boxShadow: 6 },
                                    transition: "box-shadow 0.3s ease-in-out",
                                    borderRadius: 2,
                                }}
                                onClick={() => handleEditCategory(category)}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <CategoryIcon color="primary" />
                                            <Typography
                                                variant="h6"
                                                component="div"
                                            >
                                                {category.name}
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditCategory(category);
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    {category.detail && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 1 }}
                                        >
                                            {category.detail}
                                        </Typography>
                                    )}

                                    <Divider sx={{ my: 1.5 }} />

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Created{" "}
                                            {formatDate(category.createdAt)}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            By {category.createdBy}
                                        </Typography>
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
