import Link from "next/link";

// Material UI imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Icons
import DevicesIcon from "@mui/icons-material/Devices";
import InsightsIcon from "@mui/icons-material/Insights";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SecurityIcon from "@mui/icons-material/Security";

// Feature section component
const FeatureCard = ({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) => (
    <Paper
        elevation={0}
        sx={{
            p: 3,
            height: "100%",
            border: "1px solid #eaeaea",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 3,
            },
        }}
    >
        <Box sx={{ color: "primary.main", mb: 2 }}>{icon}</Box>
        <Typography variant="h6" component="h3" fontWeight="bold" mb={1}>
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {description}
        </Typography>
    </Paper>
);

export default function Home() {
    return (
        <Box sx={{ bgcolor: "background.default" }}>
            {/* Hero Section */}
            <Box
                sx={{
                    pt: { xs: 10, md: 15 },
                    pb: { xs: 8, md: 12 },
                    mt: 8,
                    textAlign: "center",
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h2"
                        component="h1"
                        fontWeight="bold"
                        mb={3}
                        sx={{
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                        }}
                    >
                        Manage Your Business with{" "}
                        <Box component="span" sx={{ color: "primary.main" }}>
                            Narit POS
                        </Box>
                    </Typography>

                    <Typography
                        variant="h6"
                        component="p"
                        color="text.secondary"
                        mb={4}
                        sx={{
                            mx: "auto",
                            maxWidth: "80%",
                        }}
                    >
                        A simple, fast, and powerful point of sale system
                        designed for small and medium businesses.
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent="center"
                        mb={8}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            href="/auth/signup"
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: 2,
                                fontWeight: "bold",
                            }}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            component={Link}
                            href="/auth/login"
                            sx={{
                                py: 1.5,
                                px: 4,
                                borderRadius: 2,
                                fontWeight: "bold",
                            }}
                        >
                            Login
                        </Button>
                    </Stack>

                    {/* App Preview Image */}
                    <Box
                        sx={{
                            maxWidth: "100%",
                            mx: "auto",
                            borderRadius: 4,
                            overflow: "hidden",
                            boxShadow: 3,
                            border: "1px solid #eaeaea",
                            height: { xs: 200, sm: 300, md: 400 },
                            bgcolor: "grey.100",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography color="text.secondary">
                            POS System Screenshot
                        </Typography>
                        {/* Replace this with an actual app screenshot when available */}
                        {/* <Image
                            src="/app-screenshot.jpg"
                            alt="Narit POS Application Screenshot"
                            width={800}
                            height={450}
                            style={{ width: '100%', height: 'auto' }}
                        /> */}
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "#f9f9f9" }}>
                <Container>
                    <Typography
                        variant="h4"
                        component="h2"
                        fontWeight="bold"
                        textAlign="center"
                        mb={6}
                    >
                        Features that Empower Your Business
                    </Typography>

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <FeatureCard
                                icon={<InventoryIcon fontSize="large" />}
                                title="Inventory Management"
                                description="Track your stock in real-time. Get alerts when items are running low and manage suppliers with ease."
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <FeatureCard
                                icon={<ReceiptIcon fontSize="large" />}
                                title="Quick Sales Processing"
                                description="Process transactions quickly with an intuitive interface designed for speed and accuracy."
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <FeatureCard
                                icon={<PeopleIcon fontSize="large" />}
                                title="Customer Management"
                                description="Build relationships with your customers by tracking preferences and purchase history."
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <FeatureCard
                                icon={<InsightsIcon fontSize="large" />}
                                title="Sales Reports & Analytics"
                                description="Get insights into your business performance with detailed reports and analytics."
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <FeatureCard
                                icon={<DevicesIcon fontSize="large" />}
                                title="Multi-Device Support"
                                description="Access your POS system from any device, anywhere. Perfect for businesses with multiple locations."
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <FeatureCard
                                icon={<SecurityIcon fontSize="large" />}
                                title="Secure & Reliable"
                                description="Your data is safe with us. We use the latest security measures to protect your business information."
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                sx={{
                    py: { xs: 8, md: 12 },
                    textAlign: "center",
                    bgcolor: "primary.main",
                    color: "white",
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h3"
                        component="h2"
                        fontWeight="bold"
                        mb={3}
                        sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}
                    >
                        Ready to Transform Your Business?
                    </Typography>

                    <Typography
                        variant="h6"
                        component="p"
                        mb={4}
                        sx={{
                            mx: "auto",
                            maxWidth: "80%",
                            opacity: 0.9,
                        }}
                    >
                        Join thousands of businesses already using Narit POS to
                        streamline their operations.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        href="/auth/signup"
                        sx={{
                            py: 1.5,
                            px: 4,
                            borderRadius: 2,
                            fontWeight: "bold",
                            bgcolor: "white",
                            color: "primary.main",
                            "&:hover": {
                                bgcolor: "grey.100",
                            },
                        }}
                    >
                        Start Your Free Trial
                    </Button>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    py: 5,
                    borderTop: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Container>
                    {" "}
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Narit POS
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                A modern point of sale solution for modern
                                businesses.
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                mb={2}
                            >
                                Product
                            </Typography>
                            <Stack spacing={1}>
                                <Link
                                    href="/manual"
                                    passHref
                                    style={{ textDecoration: "none" }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Features
                                    </Typography>
                                </Link>
                                <Link
                                    href="/manual"
                                    passHref
                                    style={{ textDecoration: "none" }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Manual
                                    </Typography>
                                </Link>
                                <Link
                                    href="/about"
                                    passHref
                                    style={{ textDecoration: "none" }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        About
                                    </Typography>
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 6, md: 2 }}>
                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                mb={2}
                            >
                                Legal
                            </Typography>
                            <Stack spacing={1}>
                                <Link
                                    href="#"
                                    passHref
                                    style={{ textDecoration: "none" }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Privacy Policy
                                    </Typography>
                                </Link>
                                <Link
                                    href="#"
                                    passHref
                                    style={{ textDecoration: "none" }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Terms of Service
                                    </Typography>
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                mb={2}
                            >
                                Contact
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Email: contact@naritpos.com
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Phone: +1 (234) 567-8901
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        sx={{ mt: 4 }}
                    >
                        © {new Date().getFullYear()} Narit POS. All rights
                        reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}
