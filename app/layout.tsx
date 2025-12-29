import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Soap N Shine | Mobile Detailing",
    description: "Premium mobile car detailing coming to you.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* THIS LINE MAKES THE LOGO APPEAR ON EVERY PAGE */}
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}