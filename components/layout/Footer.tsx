import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">Soap N Shine</p>
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Soap N Shine. All rights reserved.
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="flex items-center gap-4">
                    <Link
                        href="https://www.instagram.com/sns.mobiledetailing/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-pink-600 transition-colors"
                        aria-label="Follow us on Instagram"
                    >
                        <Instagram size={24} />
                    </Link>
                    <Link
                        href="https://www.tiktok.com/@sns.detailing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                        aria-label="Follow us on TikTok"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/#services" className="text-sm text-gray-500 hover:text-brand transition">
                        Services
                    </Link>
                    <Link href="/gallery" className="text-sm text-gray-500 hover:text-brand transition">
                        Gallery
                    </Link>
                    <Link href="/privacy" className="text-sm text-gray-500 hover:text-brand transition">
                        Privacy
                    </Link>
                    {/* Admin Link */}
                    <Link href="/admin" className="text-xs text-gray-300 hover:text-gray-500 transition">
                        Admin Login
                    </Link>
                </div>
            </div>
        </footer>
    );
}
