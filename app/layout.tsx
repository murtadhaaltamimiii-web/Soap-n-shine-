import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://soap-n-shine.vercel.app"),
    title: {
        default: "Soap N Shine | Premium Mobile Car Detailing",
        template: "%s | Soap N Shine",
    },
    description: "Restore your vehicle's showroom glory with our premium mobile detailing services. We come to you!",
    openGraph: {
        title: "Soap N Shine | Premium Mobile Car Detailing",
        description: "Restore your vehicle's showroom glory with our premium mobile detailing services. We come to you!",
        url: "https://soap-n-shine.vercel.app",
        siteName: "Soap N Shine",
        images: [
            {
                url: "/mercedes-after.jpg",
                width: 1200,
                height: 630,
                alt: "Soap N Shine Detailing Result",
            },
        ],
        locale: "en_US",
        type: "website",
    },
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