import { prisma } from "@/lib/db";
import { restoreBooking, permanentDelete } from "@/app/actions";
import { Booking } from "@/types";
export const dynamic = 'force-dynamic';

export default async function TrashPage() {
    const rawDeleted = await prisma.booking.findMany({
        where: { deletedAt: { not: null } },
        orderBy: { deletedAt: 'desc' }
    });
    const deletedBookings = rawDeleted as unknown as Booking[];

    return (
        <>
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-8 px-6 md:px-0">Trash Can</h1>

                <div className="space-y-4 px-6 md:px-0">
                    {deletedBookings.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                            <p className="text-gray-400">Trash is empty. No deleted bookings.</p>
                        </div>
                    ) : (
                        deletedBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-lg border border-red-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 opacity-75 hover:opacity-100 transition-opacity">
                                <div>
                                    <h3 className="font-medium text-lg text-gray-900 line-through decoration-red-500">{booking.customerName}</h3>
                                    <p className="text-sm text-gray-500">{booking.vehicleType} • {booking.requestedDate}</p>
                                    <p className="text-xs text-red-400 mt-1">Deleted: {booking.deletedAt ? new Date(booking.deletedAt).toLocaleDateString() : 'Unknown'}</p>
                                </div>

                                <div className="flex gap-3">
                                    {/* RESTORE */}
                                    <form action={async () => { "use server"; await restoreBooking(booking.id); }}>
                                        <button className="bg-white border border-green-200 text-green-700 hover:bg-green-50 px-4 py-2 rounded text-xs font-bold uppercase tracking-wide transition">
                                            Restore ♻️
                                        </button>
                                    </form>
                                    {/* PERMANENT DELETE */}
                                    <form action={async () => { "use server"; await permanentDelete(booking.id); }}>
                                        <button className="bg-red-600 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wide hover:bg-red-800 transition">
                                            Perma-Delete 🗑️
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
