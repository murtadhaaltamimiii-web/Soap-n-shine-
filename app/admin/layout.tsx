import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        // FIXED LAYOUT: Sits on top of the global website (Navbar/Footer)
        <div className="fixed inset-0 z-[999] bg-[#f8f9fa] flex overflow-hidden">

            {/* SIDEBAR (Classy Dark) */}
            <aside className="w-64 bg-[#0F1115] text-white flex flex-col h-full shrink-0 border-r border-[#1f2128]">
                <div className="p-8">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-white uppercase">Soap n Shine</h2>
                    <p className="text-[10px] text-gray-500 font-medium mt-1 tracking-wide">ADMIN PORTAL</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <span>Overview</span>
                    </Link>

                    <Link href="/admin/clients" className="flex items-center gap-3 px-4 py-2.5 rounded text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <span>Clients</span>
                    </Link>
                    <Link href="/admin/trash" className="flex items-center gap-3 px-4 py-2.5 rounded text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <span>Trash</span>
                    </Link>
                </nav>
                <div className="p-8">
                    <Link href="/" className="text-[10px] font-semibold text-gray-600 hover:text-white uppercase tracking-widest transition">
                        ← Back to Site
                    </Link>
                </div>
            </aside>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto h-full p-10">
                <div className="max-w-5xl mx-auto pb-20">
                    {children}
                </div>
            </div>
        </div>
    );
}
