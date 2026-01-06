import { prisma } from "@/lib/db";
import { updateBookingStatus, rescheduleBooking, updateBookingNote, deleteBooking, testCalendarConnection } from "@/app/actions";
import { Booking } from "@/types";
import AdminGraph from "@/app/components/AdminGraph";
import LogoutButton from "./LogoutButton";
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    // PERFORMANCE FIX: Parallel Queries 
    const [graphData, recentBookings] = await Promise.all([
        // 1. Lightweight Data for Graph (Fast) 
        prisma.booking.findMany({
            where: { deletedAt: null },
            select: { id: true, status: true, priceEstimate: true, requestedDate: true },
            orderBy: { requestedDate: 'asc' },
        }),
        // 2. Full Data for List (Limited to 50) 
        prisma.booking.findMany({
            where: { deletedAt: null },
            take: 50,
            orderBy: { requestedDate: 'desc' },
        })
    ]);

    // Funnel Math 
    const leads = graphData.filter(b => b.status === "PENDING").length;
    const confirmed = graphData.filter(b => b.status === "CONFIRMED" || b.status === "APPROVED").length;
    const completed = graphData.filter(b => b.status === "COMPLETED").length;
    const maxVal = Math.max(leads, confirmed, completed, 10);

    return (
        <>
            {/* HEADER */}
            <div className="mb-8 flex justify-between items-start gap-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 capitalize tracking-tight">Dashboard</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <p className="text-gray-500 capitalize text-sm">Overview</p>
                        <form action={async () => {
                            "use server";
                            await testCalendarConnection();
                        }}>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] px-3 py-1 rounded font-bold transition uppercase tracking-wider">
                                Test Calendar Connection
                            </button>
                        </form>
                    </div>
                </div>
                <LogoutButton />
            </div>

            {/* INTERACTIVE GRAPH */}
            <section className="mb-12">
                <AdminGraph bookings={graphData as unknown as Booking[]} />
            </section>

            {/* SALES FUNNEL */}
            <section className="mb-12 bg-white p-8 rounded-lg border border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-8">Sales Funnel</h2>
                <div className="flex items-end justify-around h-24 border-b border-gray-100 pb-2 px-10">
                    <div className="flex flex-col items-center gap-3 w-1/4 group">
                        <div className="w-full max-w-[60px] bg-brand-light rounded-sm relative" style={{ height: `${(leads / maxVal) * 100}%`, minHeight: '4px' }}></div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Leads: {leads}</p>
                    </div>
                    <div className="flex flex-col items-center gap-3 w-1/4 group">
                        <div className="w-full max-w-[60px] bg-yellow-100 rounded-sm relative" style={{ height: `${(confirmed / maxVal) * 100}%`, minHeight: '4px' }}></div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confirmed: {confirmed}</p>
                    </div>
                    <div className="flex flex-col items-center gap-3 w-1/4 group">
                        <div className="w-full max-w-[60px] bg-green-100 rounded-sm relative" style={{ height: `${(completed / maxVal) * 100}%`, minHeight: '4px' }}></div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Done: {completed}</p>
                    </div>
                </div>
            </section>

            {/* RECENT ACTIVITY LIST */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Recent Activity (Last 50)</h2>
            </div>
            <div className="space-y-4">
                {(recentBookings as unknown as Booking[]).map((booking) => (
                    <div key={booking.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors group">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="font-medium text-lg text-gray-900 capitalize">{booking.customerName}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${booking.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-100' : booking.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>{booking.status}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1 capitalize">{booking.vehicleType} • {booking.packageType}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-medium text-gray-900">${booking.priceEstimate}</p>
                                <p className="text-xs text-gray-400 font-mono mt-1">{booking.requestedDate}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded border border-gray-100 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">🔒 Private Note</p>
                            </div>
                            <form action={async (formData) => { "use server"; await updateBookingNote(booking.id, formData.get("note") as string); }} className="flex gap-2">
                                <textarea name="note" defaultValue={booking.adminNotes || ""} placeholder="Add details..." className="w-full text-sm p-2 bg-white border border-gray-200 rounded focus:outline-none focus:border-gray-400 h-9 focus:h-20 transition-all resize-none placeholder:text-gray-300" />
                                <button type="submit" className="bg-white border border-gray-200 hover:bg-gray-100 text-gray-900 text-xs px-4 rounded font-medium h-9 self-start transition-colors">Save</button>
                            </form>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center pt-4 border-t border-gray-100">
                            <div className="flex gap-2 items-center">
                                {/* DELETE BUTTON */}
                                <form action={async () => { "use server"; await deleteBooking(booking.id); }}>
                                    <button className="text-gray-400 hover:text-red-600 p-2 rounded hover:bg-red-50 transition" title="Delete this specific activity">🗑️</button>
                                </form>
                                <form className="flex gap-2">
                                    {booking.status === 'PENDING' && (
                                        <>
                                            <button formAction={updateBookingStatus.bind(null, booking.id, "CONFIRMED") as any} className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded text-xs font-medium uppercase tracking-wide transition">Confirm</button>
                                            <button formAction={updateBookingStatus.bind(null, booking.id, "CANCELLED") as any} className="bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-600 px-4 py-2 rounded text-xs font-medium uppercase tracking-wide transition">Deny</button>
                                        </>
                                    )}
                                    {(booking.status === 'CONFIRMED' || booking.status === 'APPROVED') && (
                                        <>
                                            <button formAction={updateBookingStatus.bind(null, booking.id, "COMPLETED") as any} className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded text-xs font-medium uppercase tracking-wide transition">Job Done</button>
                                            <button formAction={updateBookingStatus.bind(null, booking.id, "CANCELLED") as any} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded text-xs font-medium uppercase tracking-wide transition">Cancel</button>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}