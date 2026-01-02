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

// Environment variable type declarations
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Database
            DATABASE_URL: string;

            // Google Calendar API
            GOOGLE_PRIVATE_KEY?: string;
            GOOGLE_CLIENT_EMAIL?: string;
            GOOGLE_CALENDAR_ID?: string;

            // Twilio SMS
            TWILIO_ACCOUNT_SID?: string;
            TWILIO_AUTH_TOKEN?: string;
            TWILIO_PHONE_NUMBER?: string;
            OWNER_PHONE_NUMBER?: string;

            // Admin Authentication
            ADMIN_USERNAME?: string;
            ADMIN_PASSWORD?: string;
        }
    }
}

export { };
