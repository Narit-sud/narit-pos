import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Link from "next/link";

export default function Page() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    mb={3}
                    color="primary.main"
                >
                    About Narit POS
                </Typography>{" "}
                <Box mb={4}>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        <AlertTitle>
                            <strong>
                                PROTOTYPE APPLICATION - NOT A REAL PRODUCT
                            </strong>
                        </AlertTitle>
                        <Typography variant="body2" fontWeight="bold">
                            This is a PROTOTYPE application created for
                            demonstration and portfolio purposes only.
                        </Typography>
                        <Typography variant="body2" mt={1}>
                            Narit POS is not a real commercial product. All
                            features, pricing, and company information are
                            fictional and created solely for showcasing
                            development skills. While the application will store
                            user data in the database, please do not store any
                            real, sensitive, or personal information.
                        </Typography>
                        <Typography variant="body2" mt={1}>
                            This application is not intended for actual business
                            use and does not implement all security measures
                            that would be required for a commercial application.
                        </Typography>
                    </Alert>
                </Box>
                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    Project Overview
                </Typography>
                <Typography variant="body1" mb={3}>
                    Narit POS is a point-of-sale system designed to demonstrate
                    modern web application development techniques using Next.js,
                    React, and Material UI. It provides a comprehensive set of
                    features for inventory management, sales processing,
                    customer management, and reporting.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    Developer Information
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Developer:</strong> Narit
                </Typography>{" "}
                <Typography variant="body1" mb={1}>
                    <strong>Date:</strong> May 14, 2025
                </Typography>
                <Typography variant="body1" mb={3}>
                    <strong>Purpose:</strong> A demonstration project to
                    showcase full-stack development skills with React, Next.js,
                    and Material UI, focusing on creating a responsive and
                    user-friendly point-of-sale system.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    Project Structure
                </Typography>
                <Typography variant="body1" mb={2}>
                    This project follows the Next.js App Router architecture
                    with a clear separation of concerns:
                </Typography>
                <Box sx={{ ml: 2, mb: 3 }}>
                    <Typography variant="body1" fontWeight="bold" mb={1}>
                        Frontend:
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • <strong>UI Framework:</strong> React with Material UI
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • <strong>State Management:</strong> React Context API
                        for global state
                    </Typography>
                    <Typography variant="body1" mb={2} sx={{ ml: 2 }}>
                        • <strong>Routing:</strong> Next.js App Router
                    </Typography>

                    <Typography variant="body1" fontWeight="bold" mb={1}>
                        Backend:
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • <strong>API:</strong> Next.js API Routes
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • <strong>Database:</strong> SQL database with prepared
                        statements
                    </Typography>
                    <Typography variant="body1" mb={2} sx={{ ml: 2 }}>
                        • <strong>Authentication:</strong> Custom auth system
                        with JWT tokens
                    </Typography>

                    <Typography variant="body1" fontWeight="bold" mb={1}>
                        Key Directories:
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • <strong>/src/app</strong> - Next.js App Router pages
                        and layouts
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • <strong>/src/app/api</strong> - Backend API endpoints
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • <strong>/src/components</strong> - Reusable React
                        components
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • <strong>/src/lib</strong> - Utility functions and
                        common logic
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • <strong>/src/model</strong> - TypeScript
                        interfaces/types
                    </Typography>
                </Box>
                <Divider sx={{ my: 3 }} />
                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    Technologies Used
                </Typography>{" "}
                <Box
                    sx={{
                        ml: 2,
                        mb: 3,
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography variant="body1" fontWeight="bold" mb={1}>
                            Frontend:
                        </Typography>
                        <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                            • Next.js 14
                        </Typography>
                        <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                            • React 18
                        </Typography>
                        <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                            • TypeScript 5
                        </Typography>
                        <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                            • Material UI 5
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" fontWeight="bold" mb={1}>
                            Backend:
                        </Typography>
                        <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                            • Next.js API Routes
                        </Typography>
                        <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                            • SQL Database
                        </Typography>
                        <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                            • JSON Web Tokens (JWT)
                        </Typography>
                        <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                            • Axios
                        </Typography>
                    </Box>
                </Box>{" "}
                <Divider sx={{ my: 3 }} />
                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    Recent Updates
                </Typography>
                <Typography variant="body1" mb={2}>
                    Our latest update (May 14, 2025) includes:
                </Typography>
                <Box sx={{ ml: 2, mb: 3 }}>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • Enhanced POS interface with faster checkout process
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • Improved inventory management with automated stock
                        alerts
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • New customer loyalty features
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • Optimized database performance
                    </Typography>
                    <Typography variant="body1" mb={1} sx={{ ml: 2 }}>
                        • Added mobile-responsive design improvements
                    </Typography>
                </Box>
                <Divider sx={{ my: 3 }} />{" "}
                <Box textAlign="center" mt={4}>
                    <Typography variant="body1" color="text.secondary">
                        This project is intended for educational and
                        demonstration purposes only.
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
