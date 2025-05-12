import { ReactNode } from "react";

import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import ReplayIcon from "@mui/icons-material/Replay";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";

type List = { name: string; url: string; icon: ReactNode }[];

export const list1: List = [
    { name: "Category", url: "/category", icon: <CategoryIcon /> },
    { name: "Brand", url: "/brand", icon: <BrandingWatermarkIcon /> },
    { name: "Product", url: "/product", icon: <InventoryIcon /> },
    { name: "Customer", url: "/customer", icon: <PeopleIcon /> },
    { name: "Supplier", url: "/supplier", icon: <PeopleIcon /> },
];
export const list2: List = [
    { name: "Order", url: "/order", icon: <ReceiptLongIcon /> },
    { name: "Procurement", url: "/procurement", icon: <ReceiptLongIcon /> },
    { name: "Stock Management", url: "/stock", icon: <ReceiptLongIcon /> },
];
export const list3: List = [
    { name: "Dashboard", url: "/dashboard", icon: <SpaceDashboardIcon /> },
    { name: "Store", url: "/store", icon: <StoreIcon /> },
];
export const list4: List = [
    { name: "Employee", url: "/employee", icon: <PersonIcon /> },
    {
        name: "Change store",
        url: "/auth/store-select",
        icon: <ReplayIcon />,
    },
    {
        name: "Logout",
        url: "#",
        icon: <LogoutIcon />,
    },
];
