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
                    Privacy Policy
                </Typography>

                <Box mb={4}>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        <AlertTitle>
                            <strong>
                                PROTOTYPE APPLICATION - FICTIONAL CONTENT
                            </strong>
                        </AlertTitle>
                        <Typography variant="body2">
                            This privacy policy is for a{" "}
                            <strong>fictional prototype application</strong> and
                            is provided for demonstration purposes only. Narit
                            POS is not a real product or service. This document
                            is a simulation and should not be considered a
                            legally binding privacy policy. No actual data
                            collection or processing occurs in this prototype
                            beyond what is needed for demonstration
                            functionality.
                        </Typography>
                    </Alert>
                </Box>

                <Box mb={4}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        <AlertTitle>
                            <strong>Last Updated</strong>
                        </AlertTitle>
                        This Privacy Policy was last updated on May 14, 2025.
                    </Alert>
                </Box>

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    Introduction
                </Typography>
                <Typography variant="body1" mb={3}>
                    Narit POS ("we", "our", or "us") is committed to protecting
                    your privacy. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you use
                    our Narit POS application. Please read this privacy policy
                    carefully. If you do not agree with the terms of this
                    privacy policy, please do not access the application.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    Information We Collect
                </Typography>
                <Typography variant="body1" mb={1}>
                    We may collect information about you in various ways. The
                    information we may collect via the Application includes:
                </Typography>
                <Box sx={{ ml: 3, mb: 3 }}>
                    <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        mb={1}
                    >
                        Personal Data
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        Personally identifiable information, such as your name,
                        email address, telephone number, and any other
                        identifier by which you may be contacted online or
                        offline, that you provide voluntarily when registering
                        with the Application or when using certain features.
                    </Typography>

                    <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        mb={1}
                    >
                        Business Data
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        Information about your business, including but not
                        limited to store information, inventory, sales records,
                        customer information, and other business-related data
                        necessary for the functioning of the POS system.
                    </Typography>

                    <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        mb={1}
                    >
                        Derivative Data
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        Information our servers automatically collect when you
                        access the Application, such as your IP address, browser
                        type, operating system, access times, and the pages you
                        have viewed.
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    Use of Your Information
                </Typography>
                <Typography variant="body1" mb={1}>
                    Having accurate information about you permits us to provide
                    you with a smooth, efficient, and customized experience.
                    Specifically, we may use information collected about you via
                    the Application to:
                </Typography>
                <Box sx={{ ml: 3, mb: 3 }}>
                    <Typography variant="body1" mb={1}>
                        • Create and manage your account.
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Compile anonymous statistical data and analysis for
                        internal use.
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Deliver targeted advertising, newsletters, and other
                        information regarding promotions and the Application to
                        you.
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Enable user-to-user communications.
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Fulfill and manage purchases, orders, payments, and
                        other transactions related to the Application.
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Generate a personal profile about you to make future
                        visits to the Application more personalized.
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Increase the efficiency and operation of the
                        Application.
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Notify you of updates to the Application.
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Process payments and refunds.
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Request feedback and contact you about your use of the
                        Application.
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Resolve disputes and troubleshoot problems.
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Respond to product and customer service requests.
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    Disclosure of Your Information
                </Typography>
                <Typography variant="body1" mb={3}>
                    We may share information we have collected about you in
                    certain situations. Your information may be disclosed as
                    follows:
                </Typography>
                <Box sx={{ ml: 3, mb: 3 }}>
                    <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        mb={1}
                    >
                        By Law or to Protect Rights
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        If we believe the release of information about you is
                        necessary to respond to legal process, to investigate or
                        remedy potential violations of our policies, or to
                        protect the rights, property, and safety of others, we
                        may share your information as permitted or required by
                        any applicable law, rule, or regulation.
                    </Typography>

                    <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        mb={1}
                    >
                        Third-Party Service Providers
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        We may share your information with third parties that
                        perform services for us or on our behalf, including
                        payment processing, data analysis, email delivery,
                        hosting services, customer service, and marketing
                        assistance.
                    </Typography>

                    <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        mb={1}
                    >
                        Marketing Communications
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        With your consent, or with an opportunity for you to
                        withdraw consent, we may share your information with
                        third parties for marketing purposes, as permitted by
                        law.
                    </Typography>

                    <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        mb={1}
                    >
                        Business Transfers
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        If we are involved in a merger, acquisition, financing
                        due diligence, reorganization, bankruptcy, receivership,
                        sale of company assets, or transition of service to
                        another provider, your information may be transferred as
                        part of such a transaction as permitted by law and/or
                        contract.
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    Security of Your Information
                </Typography>
                <Typography variant="body1" mb={3}>
                    We use administrative, technical, and physical security
                    measures to help protect your personal information. While we
                    have taken reasonable steps to secure the personal
                    information you provide to us, please be aware that despite
                    our efforts, no security measures are perfect or
                    impenetrable, and no method of data transmission can be
                    guaranteed against any interception or other type of misuse.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    Contact Us
                </Typography>
                <Typography variant="body1" mb={3}>
                    If you have questions or comments about this Privacy Policy,
                    please contact us at:
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Email:</strong> privacy@naritpos.com
                </Typography>
                <Typography variant="body1" mb={3}>
                    <strong>Phone:</strong> +1-800-NARIT-POS
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Box textAlign="center" mt={4}>
                    <Typography variant="body1" color="text.secondary">
                        This policy is for demonstration purposes only and is
                        not intended as legal advice.
                    </Typography>
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <Typography variant="body1" color="primary" mt={1}>
                            Return to Home
                        </Typography>
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
}
