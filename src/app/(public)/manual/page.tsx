"use client";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Link from "next/link";

// Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DoneIcon from "@mui/icons-material/Done";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InfoIcon from "@mui/icons-material/Info";

export default function Page() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                {" "}
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    mb={3}
                    color="primary.main"
                >
                    Narit POS User Manual
                </Typography>
                <Box mb={4}>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        <AlertTitle>
                            <strong>
                                PROTOTYPE APPLICATION - NOT A REAL PRODUCT
                            </strong>
                        </AlertTitle>
                        <Typography variant="body2">
                            This user manual is for a{" "}
                            <strong>fictional prototype application</strong>{" "}
                            created for demonstration and portfolio purposes
                            only. Narit POS is not a real product or service.
                            All features, functionality, and support options
                            described in this manual are simulated for
                            demonstration purposes and not actually available
                            for real-world use.
                        </Typography>
                    </Alert>
                </Box>
                <Box mb={4}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Welcome to Narit POS!
                        </Typography>
                        <Typography variant="body2">
                            This manual was last updated on May 14, 2025. It
                            will guide you through all aspects of using the
                            Narit POS system. If you need additional assistance,
                            please contact support.
                        </Typography>
                    </Alert>
                </Box>
                {/* Getting Started */}
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="getting-started-content"
                        id="getting-started-header"
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Getting Started
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            mb={2}
                        >
                            Follow these steps to set up your account and start
                            using Narit POS:
                        </Typography>

                        <Stepper orientation="vertical">
                            <Step active={true} completed={false}>
                                <StepLabel>
                                    <Typography variant="h6">
                                        Registration
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                                    <Typography variant="body1" mb={1}>
                                        From the home page, click the "Get
                                        Started" button or navigate to the
                                        signup page.
                                    </Typography>
                                    <Typography variant="body1" mb={1}>
                                        Fill in all required fields:
                                    </Typography>
                                    <List dense>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Name and Surname" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Email address" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Phone number" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Username" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Password (choose a strong password)" />
                                        </ListItem>
                                    </List>
                                    <Typography variant="body1">
                                        Click "Submit" to create your account.
                                        You'll be redirected to the login page.
                                    </Typography>
                                </StepContent>
                            </Step>

                            <Step active={true} completed={false}>
                                <StepLabel>
                                    <Typography variant="h6">Login</Typography>
                                </StepLabel>
                                <StepContent>
                                    <Typography variant="body1" mb={1}>
                                        On the login page, enter your username
                                        and password.
                                    </Typography>
                                    <Typography variant="body1" mb={1}>
                                        Click "Login" to access your account.
                                    </Typography>
                                    <Typography variant="body1">
                                        After successful login, you will be
                                        directed to the store selection page.
                                    </Typography>
                                </StepContent>
                            </Step>

                            <Step active={true} completed={false}>
                                <StepLabel>
                                    <Typography variant="h6">
                                        Store Selection/Creation
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                                    <Typography variant="body1" mb={1}>
                                        If you already have a store, select it
                                        from the list and click "Confirm".
                                    </Typography>
                                    <Typography variant="body1" mb={1}>
                                        To create a new store:
                                    </Typography>
                                    <List dense>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Click 'Add New Store'" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Enter a store name" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Click 'Create'" />
                                        </ListItem>
                                    </List>
                                    <Typography variant="body1">
                                        After selecting or creating a store,
                                        you'll be redirected to the main
                                        dashboard.
                                    </Typography>
                                </StepContent>
                            </Step>
                        </Stepper>
                    </AccordionDetails>
                </Accordion>
                {/* Setup Workflow */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="workflow-content"
                        id="workflow-header"
                    >
                        <Typography variant="h5" fontWeight="bold">
                            System Setup Workflow
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            mb={2}
                        >
                            Follow this recommended setup order to configure
                            your POS system:
                        </Typography>

                        <Stepper orientation="vertical">
                            <Step active={true} completed={false}>
                                <StepLabel>
                                    <Typography variant="h6">
                                        1. Create Categories
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                                    <Typography variant="body1" mb={1}>
                                        First, set up the product categories to
                                        organize your inventory:
                                    </Typography>
                                    <List dense>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CategoryIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Go to the Categories section from the sidebar" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Click 'New' to create a new category" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Enter the category name" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Click 'Create' to save" />
                                        </ListItem>
                                    </List>
                                    <Typography
                                        variant="body1"
                                        fontStyle="italic"
                                    >
                                        Example categories: Beverages, Food,
                                        Electronics, Clothing
                                    </Typography>
                                </StepContent>
                            </Step>

                            <Step active={true} completed={false}>
                                <StepLabel>
                                    <Typography variant="h6">
                                        2. Create Brands
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                                    <Typography variant="body1" mb={1}>
                                        Next, set up the brands for your
                                        products:
                                    </Typography>
                                    <List dense>
                                        <ListItem>
                                            <ListItemIcon>
                                                <BrandingWatermarkIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Go to the Brands section from the sidebar" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Click 'New' to create a new brand" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Enter the brand name" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Click 'Create' to save" />
                                        </ListItem>
                                    </List>
                                    <Typography
                                        variant="body1"
                                        fontStyle="italic"
                                    >
                                        Example brands: Coca-Cola, Samsung,
                                        Nike, Apple
                                    </Typography>
                                </StepContent>
                            </Step>

                            <Step active={true} completed={false}>
                                <StepLabel>
                                    <Typography variant="h6">
                                        3. Add Products
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                                    <Typography variant="body1" mb={1}>
                                        Now you can add products using the
                                        categories and brands you've created:
                                    </Typography>
                                    <List dense>
                                        <ListItem>
                                            <ListItemIcon>
                                                <InventoryIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Go to the Products section from the sidebar" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Click 'New' to add a new product" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Fill in product details:" />
                                        </ListItem>
                                    </List>
                                    <Box sx={{ pl: 4 }}>
                                        <List dense>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Name, Description, Cost, Price"
                                                    secondary="Enter the basic product information"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Select Brand and Category"
                                                    secondary="Choose from your previously created items"
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Stock Quantity"
                                                    secondary="Current inventory amount"
                                                />
                                            </ListItem>
                                        </List>
                                    </Box>
                                    <Typography variant="body1" mb={1}>
                                        Click 'Create' to save the product to
                                        your inventory.
                                    </Typography>
                                </StepContent>
                            </Step>

                            <Step active={true} completed={false}>
                                <StepLabel>
                                    <Typography variant="h6">
                                        4. Add Customers (Optional)
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                                    <Typography variant="body1" mb={1}>
                                        Set up your customer database for
                                        tracking sales:
                                    </Typography>
                                    <List dense>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PeopleIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Go to the Customers section from the sidebar" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Click 'New' to add a new customer" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Enter customer details (name, contact info)" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DoneIcon color="primary" />
                                            </ListItemIcon>
                                            <ListItemText primary="Click 'Create' to save" />
                                        </ListItem>
                                    </List>
                                </StepContent>
                            </Step>
                        </Stepper>
                    </AccordionDetails>
                </Accordion>
                {/* Daily Operations */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="daily-operations-content"
                        id="daily-operations-header"
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Daily Operations
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box mb={3}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                <PointOfSaleIcon
                                    sx={{ mr: 1, verticalAlign: "middle" }}
                                />
                                Point of Sale (POS)
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                Process customer sales using the POS module:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="1. Click on the POS button in the sidebar"
                                        secondary="This will open the point of sale interface"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="2. Add products to the cart"
                                        secondary="You can scan barcodes, select from the product list, or search for items"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="3. Adjust quantities as needed"
                                        secondary="Use the + and - buttons or type the exact amount"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="4. Apply discounts if applicable"
                                        secondary="Enter percentage or fixed amount discounts"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="5. Process payment"
                                        secondary="Select payment method (cash, card, etc.) and complete the transaction"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="6. Print or email receipt"
                                        secondary="Provide the customer with a receipt of their purchase"
                                    />
                                </ListItem>
                            </List>
                        </Box>

                        <Box mb={3}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                <ReceiptLongIcon
                                    sx={{ mr: 1, verticalAlign: "middle" }}
                                />
                                Managing Orders
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                View and manage customer orders:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Access the Orders section from the sidebar"
                                        secondary="View all orders with their status"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Filter orders by date, customer, or status"
                                        secondary="Find specific orders quickly"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="View order details"
                                        secondary="See complete information about products, quantities, and payments"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Process returns or refunds if needed"
                                        secondary="Follow the return procedure through the order details page"
                                    />
                                </ListItem>
                            </List>
                        </Box>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                <InventoryIcon
                                    sx={{ mr: 1, verticalAlign: "middle" }}
                                />
                                Inventory Management
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                Keep track of your inventory:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Monitor stock levels in the Products section"
                                        secondary="The system will highlight low stock items"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Update inventory manually when needed"
                                        secondary="Adjust quantities for items received or damaged"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Create purchase orders for low stock items"
                                        secondary="Process through the Procurement section"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Receive and process incoming inventory"
                                        secondary="Update stock levels when new shipments arrive"
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="new-features-content"
                        id="new-features-header"
                    >
                        <Typography variant="h5" fontWeight="bold">
                            New Features (May 2025)
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box mb={3}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                <InfoIcon
                                    sx={{ mr: 1, verticalAlign: "middle" }}
                                />
                                Enhanced POS Interface
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                Our POS interface has been updated with the
                                following improvements:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Quick Search Improvements"
                                        secondary="Find products faster with improved search algorithms and auto-complete"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Express Checkout"
                                        secondary="New one-click checkout option for common transactions"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Digital Receipts"
                                        secondary="Send receipts via email or SMS directly from the POS"
                                    />
                                </ListItem>
                            </List>
                        </Box>

                        <Box mb={3}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                <InventoryIcon
                                    sx={{ mr: 1, verticalAlign: "middle" }}
                                />
                                Automated Inventory Alerts
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                New inventory management features:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Low Stock Notifications"
                                        secondary="Automatic alerts when inventory falls below specified thresholds"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Inventory Forecast"
                                        secondary="Predict when you'll need to restock based on sales patterns"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="One-Click Reorder"
                                        secondary="Create purchase orders with a single click for low-stock items"
                                    />
                                </ListItem>
                            </List>
                        </Box>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                <PeopleIcon
                                    sx={{ mr: 1, verticalAlign: "middle" }}
                                />
                                Customer Loyalty Program
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                Our new customer loyalty features include:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Points System"
                                        secondary="Customers earn points for purchases which can be redeemed for discounts"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Loyalty Tiers"
                                        secondary="Reward your best customers with different levels of benefits"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Birthday Rewards"
                                        secondary="Automatically apply special offers on customer birthdays"
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                {/* Account Management */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="account-content"
                        id="account-header"
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Account Management
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box mb={3}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Switching Stores
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                If you manage multiple stores, you can switch
                                between them:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="1. Click on your username in the top right corner"
                                        secondary="This will open the user menu"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="2. Select 'Change store' from the dropdown menu"
                                        secondary="You'll be taken to the store selection page"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="3. Choose the store you want to access"
                                        secondary="Click on a store and confirm your selection"
                                    />
                                </ListItem>
                            </List>
                        </Box>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Logging Out
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                To log out of your account:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="1. Click on your username in the top right corner"
                                        secondary="This will open the user menu"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="2. Select 'Logout' from the dropdown menu"
                                        secondary="You'll be asked to confirm"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="3. Confirm logout"
                                        secondary="You'll be redirected to the home page"
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 4 }} />{" "}
                <Box textAlign="center">
                    <Typography variant="body1" color="text.secondary" mb={2}>
                        If you need additional help, please contact our support
                        team at support@naritpos.com or call our hotline at
                        +1-800-NARIT-POS (available 24/7)
                    </Typography>{" "}
                    <Typography variant="body1" color="text.secondary" mb={2}>
                        Manual last updated: May 14, 2025
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="center" gap={2}>
                        <Link href="/" style={{ textDecoration: "none" }}>
                            <Typography variant="body2" color="primary">
                                Home
                            </Typography>
                        </Link>
                        <Link
                            href="/privacy-policy"
                            style={{ textDecoration: "none" }}
                        >
                            <Typography variant="body2" color="primary">
                                Privacy Policy
                            </Typography>
                        </Link>
                        <Link
                            href="/terms-of-service"
                            style={{ textDecoration: "none" }}
                        >
                            <Typography variant="body2" color="primary">
                                Terms of Service
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
