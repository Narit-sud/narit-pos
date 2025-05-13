"use client";
import PopupModal from "@/components/PopupModal";
import { ProductInterface } from "@/model/product.interface";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useProduct } from "../useProduct";
import ProductForm from "./ProductForm";

export default function ProductTable() {
    const { products } = useProduct(); // get products from context to display
    const [open, setOpen] = useState(false); // state to control the modal open/close
    const [loading, setLoading] = useState<boolean>(true); // state to control the loading state
    const [selectedProduct, setSelectedProduct] = useState<
        ProductInterface | undefined
    >(undefined); // state to store selected product
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpen = () => {
        setOpen(true); // open the modal
    };
    const handleClose = () => {
        setOpen(false); // close the modal
    };

    const handleEditButton = (product: ProductInterface) => {
        handleOpen(); // open the modal
        setSelectedProduct(product); // set selected product
    };

    const handleEditProduct = (product: ProductInterface) => {
        handleOpen(); // open the modal
        setSelectedProduct(product); // set selected product
    };

    useEffect(() => {
        if (products) {
            setLoading(false); // set loading to false when products are fetched
        }
    }, [products]);

    // Helper function to format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <PopupModal open={open} handleClose={handleClose} width={600}>
                <ProductForm
                    mode="edit"
                    handleCancelButton={handleClose}
                    product={selectedProduct}
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
            {!loading && products && !isMobile && (
                <TableContainer
                    sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        border: "1px solid rgba(224, 224, 224, 1)",
                        userSelect: "none",
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
                                    Brand/Category
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Price
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: "white",
                                    }}
                                >
                                    Stock
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
                            {products?.map((product) => (
                                <TableRow
                                    hover
                                    key={product.id}
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
                                        {product.name}
                                        {product.detail && (
                                            <Typography
                                                variant="caption"
                                                display="block"
                                                color="text.secondary"
                                            >
                                                {product.detail}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Stack
                                            direction="column"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <Chip
                                                icon={<StoreIcon />}
                                                label={product.brand}
                                                variant="outlined"
                                                size="small"
                                                color="primary"
                                            />
                                            <Chip
                                                icon={<CategoryIcon />}
                                                label={product.category}
                                                size="small"
                                                color="secondary"
                                                variant="outlined"
                                            />
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Typography
                                            fontWeight="bold"
                                            color="primary"
                                        >
                                            {formatCurrency(product.price)}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Cost: {formatCurrency(product.cost)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Typography
                                            fontWeight="bold"
                                            color={
                                                product.stock > 10
                                                    ? "success.main"
                                                    : "error.main"
                                            }
                                        >
                                            {product.stock} units
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Tooltip title="Edit Product">
                                            <IconButton
                                                color="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditButton(product);
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
            {!loading && products && isMobile && (
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid size={{ xs: 12 }} key={product.id}>
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { boxShadow: 6 },
                                    transition: "box-shadow 0.3s ease-in-out",
                                    borderRadius: 2,
                                }}
                                onClick={() => handleEditProduct(product)}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                            >
                                                {product.name}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 1,
                                                    mt: 1,
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <Chip
                                                    icon={<StoreIcon />}
                                                    label={product.brand}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                                <Chip
                                                    icon={<CategoryIcon />}
                                                    label={product.category}
                                                    size="small"
                                                    color="secondary"
                                                    variant="outlined"
                                                />
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                                fontWeight="bold"
                                            >
                                                {formatCurrency(product.price)}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {product.detail && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 1 }}
                                        >
                                            {product.detail}
                                        </Typography>
                                    )}

                                    <Divider sx={{ my: 2 }} />

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <InventoryIcon
                                                    fontSize="small"
                                                    color={
                                                        product.stock > 10
                                                            ? "success"
                                                            : "error"
                                                    }
                                                />
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="medium"
                                                    color={
                                                        product.stock > 10
                                                            ? "success.main"
                                                            : "error.main"
                                                    }
                                                >
                                                    Stock: {product.stock} units
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    mt: 0.5,
                                                }}
                                            >
                                                <AttachMoneyIcon
                                                    fontSize="small"
                                                    color="action"
                                                />
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Cost:{" "}
                                                    {formatCurrency(
                                                        product.cost
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <IconButton
                                            size="medium"
                                            color="primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditButton(product);
                                            }}
                                            sx={{ ml: 1 }}
                                        >
                                            <EditIcon />
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
