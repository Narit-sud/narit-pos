import Box from "@mui/material/Box";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HomeBar from "@/components/HomeBar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Narit POS",
    description: "Narit's Point of Sale system",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <HomeBar />
                <Box sx={{ mt: 8, mx: { sm: 1, md: 8 } }}>{children}</Box>
            </body>
        </html>
    );
}
