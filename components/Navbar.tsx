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
            <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
                <Link href="/services" className="hover:text-blue-600 transition-colors duration-200 text-sm">
                    Services
                </Link>
                <Link href="/gallery" className="hover:text-blue-600 transition-colors duration-200 text-sm">
                    Gallery
                </Link>
                <Link href="#reviews" className="hover:text-blue-600 transition-colors duration-200 text-sm">
                    Reviews
                </Link>
                <Link 
                    href="/quote" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                >
                    Get a Quote
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg md:hidden">
                    <div className="flex flex-col px-4 py-6 gap-4">
                        <Link 
                            href="/services" 
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Services
                        </Link>
                        <Link 
                            href="/gallery" 
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Gallery
                        </Link>
                        <Link 
                            href="#reviews" 
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Reviews
                        </Link>
                        <Link 
                            href="/quote" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all text-center mt-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get a Quote
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}