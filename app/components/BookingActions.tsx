"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBookingStatus, deleteBooking } from "@/app/actions";

interface BookingActionsProps {
    bookingId: string;
    status: string;
}

export default function BookingActions({ bookingId, status }: BookingActionsProps) {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);

    const handleStatusUpdate = async (newStatus: string) => {
        setLoading(newStatus);
        try {
            const result = await updateBookingStatus(bookingId, newStatus);
            if (result.success) {
                // Refresh the page to show updated data
                router.refresh();
            } else {
                alert(result.error || "Failed to update status");
            }
        } catch (error) {
            console.error("Status update error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Move this booking to trash?")) return;
        setLoading("DELETE");
        try {
            await deleteBooking(bookingId);
            router.refresh();
        } catch (error) {
            alert("Failed to delete booking");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="flex gap-2 items-center">
            {/* DELETE BUTTON */}
            <button
                onClick={handleDelete}
                disabled={loading !== null}
                className="text-gray-400 hover:text-red-600 p-2 rounded hover:bg-red-50 transition disabled:opacity-50"
                title="Move to trash"
            >
                🗑️
            </button>

            {/* PENDING STATUS ACTIONS */}
            {status === 'PENDING' && (
                <>
                    <button
                        onClick={() => handleStatusUpdate("CONFIRMED")}
                        disabled={loading !== null}
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded text-xs font-medium uppercase tracking-wide transition disabled:opacity-50 disabled:cursor-wait"
                    >
                        {loading === "CONFIRMED" ? "Updating..." : "Confirm"}
                    </button>
                    <button
                        onClick={() => handleStatusUpdate("CANCELLED")}
                        disabled={loading !== null}
                        className="bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-600 px-4 py-2 rounded text-xs font-medium uppercase tracking-wide transition disabled:opacity-50"
                    >
                        {loading === "CANCELLED" ? "..." : "Deny"}
                    </button>
                </>
            )}

            {/* CONFIRMED STATUS ACTIONS */}
            {(status === 'CONFIRMED' || status === 'APPROVED') && (
                <>
                    <button
                        onClick={() => handleStatusUpdate("COMPLETED")}
                        disabled={loading !== null}
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded text-xs font-medium uppercase tracking-wide transition disabled:opacity-50 disabled:cursor-wait"
                    >
                        {loading === "COMPLETED" ? "Updating..." : "Job Done"}
                    </button>
                    <button
                        onClick={() => handleStatusUpdate("CANCELLED")}
                        disabled={loading !== null}
                        className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded text-xs font-medium uppercase tracking-wide transition disabled:opacity-50"
                    >
                        {loading === "CANCELLED" ? "..." : "Cancel"}
                    </button>
                </>
            )}
        </div>
    );
}
