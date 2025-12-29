import { prisma } from "@/lib/db";
import { updateBookingStatus, rescheduleBooking, testCalendarConnection } from "@/app/actions";
import { Booking } from "@/types";
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const rawBookings = await prisma.booking.findMany({
        orderBy: { requestedDate: 'asc' },
    });
    const bookings = rawBookings as unknown as Booking[];

    // HELPER: Normalize Status (Handle "APPROVED" vs "CONFIRMED") 
    const isActive = (b: any) => b.status === "CONFIRMED" || b.status === "APPROVED" || b.status === "COMPLETED";

    const isCompleted = (b: any) => b.status === "COMPLETED";

    // 1. STATS 
    const completedJobs = bookings.filter(isCompleted);
    const activeJobs = bookings.filter(isActive);

    const totalRevenue = completedJobs.reduce((sum, b) => sum + (b.priceEstimate || 0), 0);

    // Pending Revenue = Active but not yet Completed 
    const pendingRevenue = bookings
        .filter((b) => (b.status === "CONFIRMED" || b.status === "APPROVED"))
        .reduce((sum, b) => sum + (b.priceEstimate || 0), 0);

    // 2. GRAPH DATA 
    const revenuePerDay: Record<string, number> = {};
    activeJobs.forEach((b) => {
        // Ensure we have a valid date string 
        const date = b.requestedDate ? String(b.requestedDate).split('T')[0] : 'Unknown';
        revenuePerDay[date] = (revenuePerDay[date] || 0) + (b.priceEstimate || 0);
    });
    const sortedDays = Object.keys(revenuePerDay).sort().slice(-7);

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            {/* HEADER */}
            <header className="mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800 capitalize">Admin Dashboard</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <p className="text-gray-500 capitalize">Overview</p>
                        <form action={async () => {
                            "use server";
                            await testCalendarConnection();
                        }}>
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded font-bold transition uppercase">
                                Test Calendar Connection
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 min-w-[150px]">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Total Revenue</p>
                        <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 min-w-[150px]">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Pending Income</p>
                        <p className="text-3xl font-bold text-blue-600">${pendingRevenue.toFixed(2)}</p>
                    </div>
                </div>
            </header>

            {/* GRAPH SECTION */}
            <section className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-800 capitalize">Revenue Trends (Active Jobs)</h2>

                {/* Graph Container */}
                <div className="flex items-end gap-4 h-48 border-b border-gray-300 pb-2 w-full">
                    {sortedDays.length === 0 ? (
                        <div className="w-full text-center py-10 text-gray-400 italic">
                            No active jobs to display on graph yet.
                        </div>
                    ) : (
                        sortedDays.map((day) => {
                            const amount = revenuePerDay[day];
                            // Calculate height: Max 100%, Min 10% (so it's always visible)
                            const percentage = Math.max(10, Math.min((amount / 500) * 100, 100));

                            return (
                                <div key={day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                                    <div
                                        className="w-full max-w-[50px] rounded-t transition-all relative group shadow-md"
                                        style={{
                                            height: `${percentage}%`,
                                            backgroundColor: '#22c55e', // Hardcoded Green to ensure visibility
                                            minHeight: '20px'
                                        }}
                                    >
                                        {/* Tooltip */}
                                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            ${amount.toFixed(2)}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-600 font-medium w-full text-center">
                                        {day.slice(5)}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>

            {/* BOOKINGS LIST */}
            <h2 className="text-xl font-bold mb-4 text-gray-800 capitalize">Bookings Management</h2>
            <div className="space-y-4">
                {bookings.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">No bookings found.</p>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">

                            {/* Info Row */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg text-gray-900 capitalize">{booking.customerName}</h3>
                                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 uppercase">
                                            {booking.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mt-1 capitalize">
                                        {booking.vehicleType} • {booking.packageType}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">{booking.customerPhone}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-800">${booking.priceEstimate}</p>
                                    <p className="text-sm text-gray-500">
                                        📅 {booking.requestedDate} <span className="text-gray-300">|</span> ⏰ {booking.requestedTime}
                                    </p>
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                                <form className="flex gap-2">

                                    {/* PENDING ACTIONS */}
                                    {booking.status === 'PENDING' && (
                                        <>
                                            <button formAction={updateBookingStatus.bind(null, booking.id, "CONFIRMED") as any} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-bold capitalize transition">Confirm</button>
                                            <button formAction={updateBookingStatus.bind(null, booking.id, "CANCELLED") as any} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-sm text-sm font-bold capitalize transition">Deny</button>
                                        </>
                                    )}
                                    {/* CONFIRMED / APPROVED ACTIONS */}
                                    {(booking.status === 'CONFIRMED' || booking.status === 'APPROVED') && (
                                        <>
                                            <button formAction={updateBookingStatus.bind(null, booking.id, "COMPLETED") as any} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm text-sm font-bold capitalize transition">Job Done</button>
                                            <button formAction={updateBookingStatus.bind(null, booking.id, "CANCELLED") as any} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow-sm text-sm font-bold capitalize transition">Job Canceled</button>
                                        </>
                                    )}
                                </form>
                                {/* RESCHEDULE (Always visible for active jobs) */}
                                {(booking.status === 'PENDING' || booking.status === 'CONFIRMED' || booking.status === 'APPROVED') && (
                                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500 font-bold uppercase mr-2">Reschedule:</p>
                                        <form
                                            action={async (formData) => {
                                                "use server";
                                                const d = formData.get('newDate') as string;
                                                const t = formData.get('newTime') as string;
                                                if (d && t) await rescheduleBooking(booking.id, d, t);
                                            }}
                                            className="flex gap-2"
                                        >
                                            <input type="date" name="newDate" required className="bg-white text-gray-800 text-xs p-1 rounded border border-gray-300" />
                                            <input type="time" name="newTime" required className="bg-white text-gray-800 text-xs p-1 rounded border border-gray-300" />
                                            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow-sm text-xs font-bold uppercase">Move</button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}