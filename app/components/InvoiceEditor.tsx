"use client";
import { useState } from "react";
import Link from "next/link";
import { Booking } from "@/types";

interface InvoiceProps { booking: Booking; }

export default function InvoiceEditor({ booking }: InvoiceProps) {
    const [taxRate, setTaxRate] = useState(13); // Default 13% 
    const [discount, setDiscount] = useState(0); // Default $0

    // MATH LOGIC 
    const subtotal = booking.priceEstimate || 0;
    const taxableAmount = Math.max(0, subtotal - discount);
    const taxAmount = taxableAmount * (taxRate / 100);
    const total = taxableAmount + taxAmount;
    const invoiceDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Fallback for null address 
    const clientAddress = booking.address || "No address provided";

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 p-8 print:p-0 print:bg-white">
            {/* EDITOR CONTROLS (Hidden when printing) */}
            <div className="fixed top-6 right-6 flex flex-col gap-3 print:hidden z-50 items-end">
                <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200 flex flex-col gap-3 w-64">
                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Invoice Settings</p>

                    {/* TAX INPUT */}
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-gray-700">Tax Rate (%)</label>
                        <input
                            type="number"
                            value={taxRate}
                            onChange={(e) => setTaxRate(Number(e.target.value))}
                            className="w-20 text-right text-sm border border-gray-300 rounded p-1 text-gray-900 bg-white focus:ring-2 focus:ring-black focus:outline-none"
                        />
                    </div>
                    {/* DISCOUNT INPUT */}
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-gray-700">Discount ($)</label>
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                            className="w-20 text-right text-sm border border-gray-300 rounded p-1 text-gray-900 bg-white focus:ring-2 focus:ring-black focus:outline-none"
                        />
                    </div>
                </div>
                {/* ACTION BUTTONS */}
                <div className="flex gap-2">
                    <button
                        onClick={() => window.print()}
                        className="bg-black text-white px-6 py-2 rounded shadow-lg text-sm font-bold hover:bg-gray-800 transition"
                    >
                        Print / PDF
                    </button>
                    <Link href="/admin/clients" className="bg-white text-gray-700 px-4 py-2 rounded shadow-lg text-sm font-bold hover:bg-gray-50 transition border border-gray-200">
                        Close
                    </Link>
                </div>
            </div>
            {/* OFFICIAL INVOICE PAPER */}
            <div className="bg-white w-full max-w-3xl p-12 shadow-lg print:shadow-none print:w-full min-h-[1000px] relative">

                {/* HEADER */}
                <div className="flex justify-between items-start mb-12 border-b border-gray-100 pb-8">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight uppercase text-black">Soap n Shine</h1>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Mobile Detailing</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-4xl font-light text-gray-200 uppercase tracking-widest">Invoice</h2>
                        <p className="text-sm font-medium text-gray-600 mt-2"># {booking.id.slice(-6).toUpperCase()}</p>
                        <p className="text-xs text-gray-400 mt-1">{invoiceDate}</p>
                    </div>
                </div>
                {/* BILL TO SECTION */}
                <div className="flex justify-between mb-16">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Billed To</p>
                        <p className="text-lg font-semibold text-gray-900 capitalize">{booking.customerName}</p>
                        <p className="text-sm text-gray-500">{booking.customerPhone}</p>
                        <p className="text-sm text-gray-500 max-w-xs mt-1">{clientAddress}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Service Details</p>
                        <p className="text-sm font-medium text-gray-900 capitalize">{booking.vehicleType}</p>
                        <p className="text-sm text-gray-500 capitalize">{booking.packageType}</p>
                        <p className="text-sm text-gray-500 mt-1">Date: {booking.requestedDate}</p>
                    </div>
                </div>
                {/* LINE ITEMS */}
                <table className="w-full mb-12">
                    <thead>
                        <tr className="border-b-2 border-gray-900">
                            <th className="text-left py-3 text-xs font-bold uppercase tracking-wider text-gray-900">Description</th>
                            <th className="text-right py-3 text-xs font-bold uppercase tracking-wider text-gray-900">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-100">
                            <td className="py-4 text-sm font-medium text-gray-700 capitalize">
                                {booking.packageType} Package
                                <span className="block text-xs text-gray-400 font-normal mt-1">
                                    Vehicle: {booking.vehicleType}
                                    {booking.carCount > 1 && ` (x${booking.carCount} cars)`}
                                </span>
                            </td>
                            <td className="py-4 text-right text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</td>
                        </tr>
                        {/* Dynamic Discount Row */}
                        {discount > 0 && (
                            <tr className="border-b border-gray-100">
                                <td className="py-4 text-sm font-medium text-gray-700 text-red-600">Discount Applied</td>
                                <td className="py-4 text-right text-sm font-medium text-red-600">- ${discount.toFixed(2)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* TOTALS CALCULATION */}
                <div className="flex justify-end mb-16">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span>${Math.max(0, subtotal - discount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Tax ({taxRate}%)</span>
                            <span>${taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-3 mt-3">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                {/* FOOTER */}
                <div className="absolute bottom-12 left-12 right-12 border-t border-gray-100 pt-8 text-center">
                    <p className="text-sm font-medium text-gray-900">Thank you for your business!</p>
                    <p className="text-xs text-gray-500 mt-2">Payment due upon receipt.</p>
                </div>
            </div>
        </div>
    );
}
