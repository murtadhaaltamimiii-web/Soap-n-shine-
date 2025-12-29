import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 z-50 relative">
            <Link href="/">
                <div className="relative w-40 h-16 cursor-pointer">
                    <Image
                        src="/logo.png"
                        alt="Soap N Shine Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 font-medium text-gray-800">
                <Link href="/services" className="hover:text-blue-600 transition">Services</Link>
                <Link href="/gallery" className="hover:text-blue-600 transition">Gallery</Link>
                <Link href="#reviews" className="hover:text-blue-600 transition">Reviews</Link>

                <Link href="/quote" className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold transition shadow-md">
                    Get a Quote
                </Link>
            </div>
        </nav>
    );
}