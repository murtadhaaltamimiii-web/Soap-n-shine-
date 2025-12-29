export interface Booking {
    id: string;
    customerName: string;
    customerPhone: string;
    address?: string | null;
    serviceAddress?: string | null;
    vehicleType: string;
    packageType: string;
    carCount: number;
    priceEstimate: number;
    requestedDate: string;
    requestedTime: string;
    status: "PENDING" | "CONFIRMED" | "APPROVED" | "COMPLETED" | "CANCELLED";
    adminNotes?: string | null;
    deletedAt?: Date | null; // Added
    createdAt: Date;
}
