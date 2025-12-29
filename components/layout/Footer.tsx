import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">Soap N Shine</p>
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Soap & Shine. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/services" className="text-sm text-gray-500 hover:text-blue-600 transition">
                        Services
                    </Link>
                    <Link href="/gallery" className="text-sm text-gray-500 hover:text-blue-600 transition">
                        Gallery
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
