import { prisma } from "@/lib/db";
import { Booking } from "@/types";
import AdminGraph from "@/app/components/AdminGraph";
import Link from "next/link";
export const dynamic = 'force-dynamic';

export default async function ClientDatabasePage() {
    const rawBookings = await prisma.booking.findMany({
        where: { deletedAt: null }, // HIDE DELETED
        orderBy: { requestedDate: 'desc' }
    });
    const bookings = rawBookings as unknown as Booking[];

    // Helper defined inside component 
    const formatPhone = (str: string) => {
        const cleaned = str.replace(/\D/g, '').replace(/^1/, '');
        if (cleaned.length === 10) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        return str;
    };

    // Grouping Logic 
    const clientsMap = new Map();
    bookings.forEach((b) => {
        const phone = b.customerPhone || "Unknown";
        const key = phone.replace(/\D/g, '').replace(/^1/, '');
        if (!key) return;

        if (!clientsMap.has(key)) {
            clientsMap.set(key, {
                rawPhone: phone,
                displayPhone: formatPhone(phone),
                name: b.customerName,
                totalSpent: 0,
                visits: 0,
                lastVisit: b.requestedDate,
            });
        }
        const client = clientsMap.get(key);
        if (b.status === "COMPLETED") {
            client.totalSpent += (b.priceEstimate || 0);
            client.visits += 1;
        }
    });

    const clients = Array.from(clientsMap.values());
    const activeJobs = bookings.filter((b) => b.status === "CONFIRMED" || b.status === "APPROVED" || b.status === "COMPLETED");

    return (
        <>
            <section className="mb-12">
                <AdminGraph bookings={activeJobs} />
            </section>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Directory ({clients.length})</h2>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {clients.map((client, i) => (
                    <Link
                        key={client.rawPhone}
                        href={`/admin/clients/${encodeURIComponent(client.rawPhone)}`}
                        className={`flex justify-between items-center p-5 hover:bg-gray-50 transition group ${i !== clients.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                        <div className="flex gap-4 items-center">
                            <div className="h-10 w-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium border border-gray-200">
                                {client.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">{client.name}</h3>
                                <p className="text-xs text-gray-500 font-mono mt-0.5">{client.displayPhone}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">${client.totalSpent.toFixed(2)}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">{client.visits} Jobs</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
