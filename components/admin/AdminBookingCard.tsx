"use client";
import { updateBookingStatus, rescheduleBooking } from "@/app/actions";
import { useState } from "react";

export default function AdminBookingCard({ booking }: { booking: any }) {
    const [status, setStatus] = useState(booking.status);
    const [loading, setLoading] = useState(false);

    // Reschedule State
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [newDate, setNewDate] = useState(booking.requestedDate);
    const [newTime, setNewTime] = useState(booking.requestedTime);

    const handleStatus = async (newStatus: string) => {
        setLoading(true);
        await updateBookingStatus(booking.id, newStatus);
        setStatus(newStatus);
        setLoading(false);
    };

    const handleReschedule = async () => {
        setLoading(true);
        const res = await rescheduleBooking(booking.id, newDate, newTime);
        if (res.success) {
            setIsRescheduling(false);
        } else {
            alert("Failed to update date.");
        }
        setLoading(false);
    };

    // Safely handle address if it's missing (backwards compatibility)
    const location = booking.address || "Not provided";
    // Safely handle car count
    const count = booking.carCount || 1;

    return (
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between h-full relative overflow-hidden">

            {/* COMPLETED STATUS STRIPE */}
            {status === "COMPLETED" && (
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_#22c55e]" />
            )}

            <div className="mb-4">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-white">{booking.customerName}</h3>
                        <p className="text-gray-400 text-sm">{booking.customerPhone}</p>
                        <p className="text-gray-500 text-xs mt-1">{location}</p>
                    </div>
                    <div className="text-right">
                        <span className="block text-xl font-bold text-blue-400">
                            ${booking.priceEstimate}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${status === "CONFIRMED" ? "bg-blue-900 text-blue-300" :
                            status === "COMPLETED" ? "bg-green-900 text-green-300" :
                                status === "REJECTED" ? "bg-red-900 text-red-300" :
                                    status === "CANCELLED" ? "bg-gray-700 text-gray-300" :
                                        "bg-yellow-900 text-yellow-300"
                            }`}>
                            {status}
                        </span>
                    </div>
                </div>

                <div className="space-y-3 text-sm border-t border-slate-700 pt-4">
                    <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-lg">🚗</span>
                        <div className="flex flex-col">
                            <span className="capitalize font-medium">{booking.vehicleType} • {booking.packageType}</span>
                            {count > 1 && (
                                <span className="text-xs bg-brand text-white px-2 py-0.5 rounded-full w-fit mt-1">
                                    {count} Cars
                                </span>
                            )}
                        </div>
                    </div>

                    {/* CONDITIONAL DATE DISPLAY OR EDIT MODE */}
                    {!isRescheduling ? (
                        <div className="flex items-center gap-3 text-gray-300">
                            <span className="text-lg">📅</span>
                            <span>{newDate || booking.requestedDate} at {newTime || booking.requestedTime}</span>
                        </div>
                    ) : (
                        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 mt-2">
                            <label className="block text-xs text-gray-400 mb-1">New Date</label>
                            <input
                                type="date"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-600 rounded p-1 text-sm text-white mb-2"
                            />
                            <label className="block text-xs text-gray-400 mb-1">New Time</label>
                            <select
                                value={newTime}
                                onChange={(e) => setNewTime(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-600 rounded p-1 text-sm text-white"
                            >
                                <option value="08:00 AM">08:00 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="04:00 PM">04:00 PM</option>
                            </select>
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={handleReschedule}
                                    disabled={loading}
                                    className="flex-1 bg-green-600 hover:bg-green-500 py-1 rounded text-xs font-bold transition"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsRescheduling(false)}
                                    className="flex-1 bg-gray-600 hover:bg-gray-500 py-1 rounded text-xs font-bold transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ACTION BUTTONS (Hidden during reschedule) */}
            {!isRescheduling && (
                <div className="mt-auto pt-4">
                    {status === "PENDING" && (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleStatus("CONFIRMED")}
                                disabled={loading}
                                className="bg-brand hover:bg-brand-dark py-3 rounded-xl font-bold text-sm transition-colors text-white disabled:opacity-50"
                            >
                                ✔ Accept
                            </button>
                            <button
                                onClick={() => handleStatus("REJECTED")}
                                disabled={loading}
                                className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold text-sm transition-colors text-white disabled:opacity-50"
                            >
                                ✖ Reject
                            </button>
                            {/* Reschedule Button PENDING */}
                            <button
                                onClick={() => setIsRescheduling(true)}
                                disabled={loading}
                                className="col-span-2 bg-yellow-600 hover:bg-yellow-500 py-2 rounded-xl font-bold text-xs transition-colors text-white disabled:opacity-50"
                            >
                                📅 Reschedule
                            </button>
                        </div>
                    )}

                    {status === "CONFIRMED" && (
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={() => handleStatus("COMPLETED")}
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold text-sm transition-colors text-white disabled:opacity-50 shadow-lg shadow-green-900/20"
                            >
                                ✅ Mark Completed
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleStatus("CANCELLED")}
                                    disabled={loading}
                                    className="bg-slate-700 hover:bg-slate-600 py-2 rounded-xl font-bold text-xs transition-colors text-gray-300 disabled:opacity-50"
                                >
                                    ❌ Cancel
                                </button>
                                <button
                                    onClick={() => setIsRescheduling(true)}
                                    disabled={loading}
                                    className="bg-yellow-600 hover:bg-yellow-500 py-2 rounded-xl font-bold text-xs transition-colors text-white disabled:opacity-50"
                                >
                                    📅 Reschedule
                                </button>
                            </div>
                        </div>
                    )}

                    {status === "COMPLETED" && (
                        <div className="p-3 bg-green-900/20 border border-green-900/50 rounded-xl text-center text-green-400 text-sm font-medium">
                            ✨ Job Completed & Paid
                        </div>
                    )}

                    {(status === "REJECTED" || status === "CANCELLED") && (
                        <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-center text-gray-500 text-sm font-medium">
                            {status === "REJECTED" ? "Booking Rejected" : "Booking Cancelled"}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
