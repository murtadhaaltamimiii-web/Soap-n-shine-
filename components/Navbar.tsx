"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-white border-b border-gray-100 z-50 sticky top-0 backdrop-blur-sm bg-white/95">
            <Link href="/" className="flex-shrink-0">
                <div className="relative w-32 h-12 sm:w-40 sm:h-16 cursor-pointer">
                    <Image
                        src="/logo.png"
                        alt="Soap N Shine Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 font-medium text-gray-700">
                <Link href="/#services" className="hover:text-brand transition-colors duration-200 text-sm">
                    Services
                </Link>
                <Link href="/gallery" className="hover:text-brand transition-colors duration-200 text-sm">
                    Gallery
                </Link>
                <Link href="/#reviews" className="hover:text-brand transition-colors duration-200 text-sm">
                    Reviews
                </Link>
                <Link
                    href="/admin/login"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                    Admin Login
                </Link>
                <Link
                    href="/#contact"
                    className="bg-brand hover:bg-brand-dark text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
                >
                    Get in Touch
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-brand transition-colors"
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg md:hidden">
                    <div className="flex flex-col px-4 py-6 gap-4">
                        <Link
                            href="/#services"
                            className="text-gray-700 hover:text-brand transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Services
                        </Link>
                        <Link
                            href="/gallery"
                            className="text-gray-700 hover:text-brand transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Gallery
                        </Link>
                        <Link
                            href="/#reviews"
                            className="text-gray-700 hover:text-brand transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Reviews
                        </Link>
                        <Link
                            href="/admin/login"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 px-4 py-2 rounded-lg font-medium text-sm transition-colors text-center mt-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Admin Login
                        </Link>
                        <Link
                            href="/#contact"
                            className="bg-brand hover:bg-brand-dark text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}