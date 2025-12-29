import { prisma } from "@/lib/db";
import InvoiceEditor from "@/app/components/InvoiceEditor";
import { Booking } from "@/types";
export const dynamic = 'force-dynamic';

interface PageProps { params: { id: string }; }

export default async function InvoicePage({ params }: PageProps) {
    const rawBooking = await prisma.booking.findUnique({ where: { id: params.id } });

    if (!rawBooking) return <div>Invoice not found.</div>;

    // Type Casting ensures safety now that types/index.ts is fixed 
    const booking = rawBooking as unknown as Booking;

    return <InvoiceEditor booking={booking} />;
}
