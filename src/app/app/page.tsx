"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

// Icons
import CategoryIcon from "@mui/icons-material/Category";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import StoreIcon from "@mui/icons-material/Store";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonIcon from "@mui/icons-material/Person";

export default function Page() {
    const router = useRouter();

    const routes = [
        {
            name: "Point of Sale",
            path: "/pos",
            icon: (
                <PointOfSaleIcon sx={{ fontSize: 40, color: "primary.main" }} />
            ),
            description: "Process sales and manage transactions",
        },
        {
            name: "Dashboard",
            path: "/app/dashboard",
            icon: (
                <SpaceDashboardIcon
                    sx={{ fontSize: 40, color: "primary.main" }}
                />
            ),
            description: "View store performance and analytics",
        },
        {
            name: "Products",
            path: "/app/product",
            icon: (
                <InventoryIcon sx={{ fontSize: 40, color: "primary.main" }} />
            ),
            description: "Manage your product inventory",
        },
        {
            name: "Categories",
            path: "/app/category",
            icon: <CategoryIcon sx={{ fontSize: 40, color: "primary.main" }} />,
            description: "Organize products by categories",
        },
        {
            name: "Brands",
            path: "/app/brand",
            icon: (
                <BrandingWatermarkIcon
                    sx={{ fontSize: 40, color: "primary.main" }}
                />
            ),
            description: "Manage product brands",
        },
        {
            name: "Customers",
            path: "/app/customer",
            icon: <PeopleIcon sx={{ fontSize: 40, color: "primary.main" }} />,
            description: "Track customer information and sales",
        },
        {
            name: "Orders",
            path: "/app/order",
            icon: (
                <ReceiptLongIcon sx={{ fontSize: 40, color: "primary.main" }} />
            ),
            description: "View and manage sales orders",
        },
        {
            name: "Store",
            path: "/app/store",
            icon: <StoreIcon sx={{ fontSize: 40, color: "primary.main" }} />,
            description: "Manage your store settings",
        },
        {
            name: "Employees",
            path: "/app/employee",
            icon: <PersonIcon sx={{ fontSize: 40, color: "primary.main" }} />,
            description: "Manage staff and permissions",
        },
    ];

    return (
        <Box sx={{ py: 3 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                fontWeight="bold"
                color="primary.main"
            >
                Welcome to Narit POS
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                Select a module to get started:
            </Typography>

            <Grid container spacing={3}>
                {routes.map((route) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={route.path}>
                        <Card
                            sx={{
                                height: "100%",
                                transition: "transform 0.2s",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardActionArea
                                sx={{ height: "100%" }}
                                onClick={() => router.push(route.path)}
                            >
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        p: 3,
                                    }}
                                >
                                    {route.icon}
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        sx={{ mt: 2, fontWeight: "bold" }}
                                    >
                                        {route.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        {route.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
