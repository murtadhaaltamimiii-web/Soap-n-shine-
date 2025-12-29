export interface Booking {
    id: string;
    customerName: string;
    customerPhone: string;
    vehicleType: string;
    packageType: string;
    priceEstimate: number;
    requestedDate: string; // Stored as string in DB
    requestedTime: string;
    status: "PENDING" | "CONFIRMED" | "APPROVED" | "COMPLETED" | "CANCELLED";
    createdAt: Date;
}
