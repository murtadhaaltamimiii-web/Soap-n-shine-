import { prisma } from "@/lib/db";
import { updateBookingNote, deleteClient, deleteBooking } from "@/app/actions";
import { verifyAdminAuth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';

interface PageProps { params: { phone: string }; }

export default async function ClientProfilePage({ params }: PageProps) {
    // SECURITY: Verify admin authentication (IDOR Protection)
    try {
        await verifyAdminAuth();
    } catch (error) {
        // Not authorized - redirect to admin login
        redirect('/admin');
    }

    const decodedPhone = decodeURIComponent(params.phone);

    const formatPhone = (str: string) => {
        const cleaned = str.replace(/\D/g, '').replace(/^1/, '');
        if (cleaned.length === 10) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        return str;
    };

    const formattedPhone = formatPhone(decodedPhone);
    const bookings: any[] = await prisma.booking.findMany({
        where: { customerPhone: decodedPhone },
        orderBy: { requestedDate: 'desc' }
    });

    if (bookings.length === 0) return <div>Client not found. <Link href="/admin/clients" className="underline text-blue-600">Go Back</Link></div>;

    const clientName = bookings[0].customerName;
    const serviceAddress = bookings.find(b => b.serviceAddress)?.serviceAddress || "No address recorded";

    const totalSpent = bookings
        .filter(b => b.status === "COMPLETED")
        .reduce((sum, b) => sum + (b.priceEstimate || 0), 0);

    return (
        <div>
            <div className="bg-white rounded-lg p-8 border border-gray-200 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-medium">{clientName.charAt(0).toUpperCase()}</div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight capitalize">{clientName}</h1>
                        <p className="text-lg text-gray-500 font-medium tracking-tight mt-0.5">{formattedPhone}</p>
                        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded border border-gray-100 w-fit"><span>📍 {serviceAddress}</span></div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Lifetime Value</p>
                    <p className="text-3xl font-semibold text-gray-900 tracking-tight">${totalSpent.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 font-medium mt-1">{bookings.length} Total Visits</p>
                </div>
            </div>
            {/* HISTORY */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">History & Notes</h2>
            </div>

            <div className="space-y-6">
                {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
                        <div className="bg-gray-50/50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-600 font-mono">{booking.requestedDate}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${booking.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-100 text-gray-800'}`}>{booking.status}</span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <Link href={`/admin/invoices/${booking.id}`} target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition">View Invoice ↗</Link>
                                {/* DELETE SINGLE BOOKING */}
                                <form action={async () => { "use server"; await deleteBooking(booking.id); }}>
                                    <button className="text-gray-300 hover:text-red-600 transition" title="Delete this record">🗑️</button>
                                </form>
                            </div>
                        </div>
                        {/* ... Details & Notes Section ... */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Service Details</p>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-2"><span className="text-sm text-gray-500">Vehicle</span><span className="text-sm font-medium text-gray-900 capitalize">{booking.vehicleType}</span></div>
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-2 pt-2"><span className="text-sm text-gray-500">Package</span><span className="text-sm font-medium text-gray-900 capitalize">{booking.packageType}</span></div>
                                    <div className="flex justify-between items-center pt-2"><span className="text-sm text-gray-500">Price</span><span className="text-sm font-medium text-gray-900">${booking.priceEstimate}</span></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-3"><p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">🔒 Private Admin Note</p></div>
                                <form action={async (formData) => { "use server"; await updateBookingNote(booking.id, formData.get("note") as string); }}>
                                    <textarea name="note" defaultValue={booking.adminNotes || ""} placeholder="Add private details here..." className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-400 focus:bg-white h-24 transition-all resize-none placeholder:text-gray-400" />
                                    <div className="mt-2 text-right"><button type="submit" className="text-xs font-semibold text-gray-500 hover:text-black transition uppercase tracking-wide">Save Note</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* DANGER ZONE: DELETE CLIENT */}
            <div className="mt-20 border-t border-red-100 pt-10">
                <div className="flex justify-between items-center bg-red-50 p-6 rounded-lg border border-red-100">
                    <div>
                        <h3 className="text-sm font-bold text-red-900 uppercase tracking-wide">Danger Zone</h3>
                        <p className="text-xs text-red-700 mt-1">Deleting this client will permanently remove all {bookings.length} bookings and history.</p>
                    </div>
                    <form action={async () => {
                        "use server";
                        await deleteClient(decodedPhone);
                    }}>
                        <button className="bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white px-6 py-2 rounded text-xs font-bold uppercase tracking-wide transition shadow-sm">
                            Delete Client Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
