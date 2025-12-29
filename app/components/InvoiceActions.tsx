"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function InvoiceActions({ invoiceId }: { invoiceId: string }) {
    useEffect(() => {
        // Optional: Update title for print
        const originalTitle = document.title;
        window.onbeforeprint = () => {
            document.title = `INVOICE-${invoiceId}`;
        };
        return () => {
            window.onbeforeprint = null;
        };
    }, [invoiceId]);

    return (
        <div className="fixed top-6 right-6 flex gap-3 print:hidden">
            <button
                onClick={() => window.print()}
                className="bg-black text-white px-6 py-2 rounded shadow-lg text-sm font-bold hover:bg-gray-800 transition"
            >
                Download / Print PDF
            </button>
            <Link href="/admin/clients" className="bg-white text-gray-700 px-6 py-2 rounded shadow-lg text-sm font-bold hover:bg-gray-50 transition border border-gray-200">
                Close
            </Link>
        </div>
    );
}
