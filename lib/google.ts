import { google } from "googleapis";

// Load credentials from .env
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"); // Fix newline issues
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: SCOPES
});

const calendar = google.calendar({ version: "v3", auth });

export async function createCalendarEvent(booking: any) {
    if (!PRIVATE_KEY || !CLIENT_EMAIL) {
        console.error("Missing Google Credentials in .env");
        return false;
    }

    try {
        const startDateTime = new Date(`${booking.requestedDate}T${booking.requestedTime}:00`);
        const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

        await calendar.events.insert({
            calendarId: CALENDAR_ID || 'primary',
            requestBody: {
                summary: `Car Detail: ${booking.customerName} (${booking.vehicleType})`,
                description: `Phone: ${booking.customerPhone}\nPackage: ${booking.packageType}\nPrice: $${booking.priceEstimate}`,
                start: { dateTime: startDateTime.toISOString() },
                end: { dateTime: endDateTime.toISOString() },
            },
        });
        return true;
    } catch (error) {
        console.error("Google Calendar Error:", error);
        return false;
    }
}
