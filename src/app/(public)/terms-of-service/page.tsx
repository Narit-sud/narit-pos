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
                    Terms of Service
                </Typography>

                <Box mb={4}>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        <AlertTitle>
                            <strong>
                                PROTOTYPE APPLICATION - FICTIONAL CONTENT
                            </strong>
                        </AlertTitle>
                        <Typography variant="body2">
                            These terms of service are for a{" "}
                            <strong>fictional prototype application</strong> and
                            are provided for demonstration purposes only. Narit
                            POS is not a real product or service. This document
                            is a simulation and should not be considered a
                            legally binding agreement. This is purely for
                            educational and portfolio demonstration purposes.
                        </Typography>
                    </Alert>
                </Box>

                <Box mb={4}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        <AlertTitle>
                            <strong>Last Updated</strong>
                        </AlertTitle>
                        These Terms of Service were last updated on May 14,
                        2025.
                    </Alert>
                </Box>

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    1. Agreement to Terms
                </Typography>
                <Typography variant="body1" mb={3}>
                    By accessing or using Narit POS application, you agree to be
                    bound by these Terms of Service and all applicable laws and
                    regulations. If you do not agree with any of these terms,
                    you are prohibited from using or accessing this application.
                    The materials contained in this application are protected by
                    applicable copyright and trademark law.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    2. Use License
                </Typography>
                <Typography variant="body1" mb={1}>
                    Permission is granted to temporarily use Narit POS
                    application for personal, non-commercial transitory viewing
                    only. This is the grant of a license, not a transfer of
                    title, and under this license you may not:
                </Typography>
                <Box sx={{ ml: 3, mb: 3 }}>
                    <Typography variant="body1" mb={1}>
                        • Modify or copy the materials;
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Use the materials for any commercial purpose, or for
                        any public display (commercial or non-commercial);
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Attempt to decompile or reverse engineer any software
                        contained in Narit POS;
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Remove any copyright or other proprietary notations
                        from the materials; or
                    </Typography>
                    <Typography variant="body1" mb={1}>
                        • Transfer the materials to another person or "mirror"
                        the materials on any other server.
                    </Typography>
                </Box>
                <Typography variant="body1" mb={3}>
                    This license shall automatically terminate if you violate
                    any of these restrictions and may be terminated by Narit POS
                    at any time. Upon terminating your viewing of these
                    materials or upon the termination of this license, you must
                    destroy any downloaded materials in your possession whether
                    in electronic or printed format.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    3. Disclaimer
                </Typography>
                <Typography variant="body1" mb={3}>
                    The materials on Narit POS are provided on an 'as is' basis.
                    Narit POS makes no warranties, expressed or implied, and
                    hereby disclaims and negates all other warranties including,
                    without limitation, implied warranties or conditions of
                    merchantability, fitness for a particular purpose, or
                    non-infringement of intellectual property or other violation
                    of rights.
                </Typography>
                <Typography variant="body1" mb={3}>
                    Further, Narit POS does not warrant or make any
                    representations concerning the accuracy, likely results, or
                    reliability of the use of the materials on its application
                    or otherwise relating to such materials or on any sites
                    linked to this application.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    4. Limitations
                </Typography>
                <Typography variant="body1" mb={3}>
                    In no event shall Narit POS or its suppliers be liable for
                    any damages (including, without limitation, damages for loss
                    of data or profit, or due to business interruption) arising
                    out of the use or inability to use the materials on Narit
                    POS, even if Narit POS or a Narit POS authorized
                    representative has been notified orally or in writing of the
                    possibility of such damage. Because some jurisdictions do
                    not allow limitations on implied warranties, or limitations
                    of liability for consequential or incidental damages, these
                    limitations may not apply to you.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    5. Accuracy of Materials
                </Typography>
                <Typography variant="body1" mb={3}>
                    The materials appearing on Narit POS could include
                    technical, typographical, or photographic errors. Narit POS
                    does not warrant that any of the materials on its
                    application are accurate, complete or current. Narit POS may
                    make changes to the materials contained on its application
                    at any time without notice. However Narit POS does not make
                    any commitment to update the materials.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    6. Links
                </Typography>
                <Typography variant="body1" mb={3}>
                    Narit POS has not reviewed all of the sites linked to its
                    application and is not responsible for the contents of any
                    such linked site. The inclusion of any link does not imply
                    endorsement by Narit POS of the site. Use of any such linked
                    website is at the user's own risk.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    7. Modifications
                </Typography>
                <Typography variant="body1" mb={3}>
                    Narit POS may revise these terms of service for its
                    application at any time without notice. By using this
                    application you are agreeing to be bound by the then current
                    version of these terms of service.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    8. Governing Law
                </Typography>
                <Typography variant="body1" mb={3}>
                    These terms and conditions are governed by and construed in
                    accordance with the laws and you irrevocably submit to the
                    exclusive jurisdiction of the courts in that location.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    mb={2}
                >
                    9. Contact Information
                </Typography>
                <Typography variant="body1" mb={3}>
                    If you have any questions about these Terms of Service,
                    please contact us at:
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Email:</strong> legal@naritpos.com
                </Typography>
                <Typography variant="body1" mb={3}>
                    <strong>Phone:</strong> +1-800-NARIT-POS
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Box textAlign="center" mt={4}>
                    <Typography variant="body1" color="text.secondary">
                        These terms are for demonstration purposes only and are
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
