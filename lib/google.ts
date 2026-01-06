import { google } from "googleapis";

// ============================================================================
// ROBUST PRIVATE KEY SANITIZER
// Handles various formats from Vercel/Netlify env var storage
// ============================================================================
function getCleanPrivateKey(): string {
    let key = process.env.GOOGLE_PRIVATE_KEY || "";

    // 1. Remove surrounding double quotes if the user added them in Vercel
    if (key.startsWith('"') && key.endsWith('"')) {
        key = key.slice(1, -1);
    }

    // 2. Remove surrounding single quotes too
    if (key.startsWith("'") && key.endsWith("'")) {
        key = key.slice(1, -1);
    }

    // 3. Fix newlines - handles literal "\n" strings stored by Vercel
    // This converts the escaped \n characters to actual line breaks
    key = key.replace(/\\n/g, '\n');

    return key;
}

// Load credentials from .env
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const PRIVATE_KEY = getCleanPrivateKey();
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

// Initialize auth with cleaned key
const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: SCOPES
});

const calendar = google.calendar({ version: "v3", auth });

export async function createCalendarEvent(booking: any) {
    if (!PRIVATE_KEY || !CLIENT_EMAIL) {
        console.error("❌ Missing Google Credentials in .env");
        return false;
    }

    try {
        const startDateTime = new Date(`${booking.requestedDate}T${booking.requestedTime}:00`);
        const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

        await calendar.events.insert({
            calendarId: CALENDAR_ID || 'primary',
            requestBody: {
                summary: `Soap n Shine: ${booking.customerName} - ${booking.vehicleType}`,
                description: `📞 Phone: ${booking.customerPhone}\n📦 Package: ${booking.packageType}\n💰 Price: $${booking.priceEstimate}\n📍 Address: ${booking.serviceAddress || booking.address || 'Not provided'}\n📝 Notes: ${booking.adminNotes || 'None'}`,
                location: booking.serviceAddress || booking.address || '',
                start: { dateTime: startDateTime.toISOString() },
                end: { dateTime: endDateTime.toISOString() },
            },
        });
        console.log(`✅ Calendar event created for ${booking.customerName}`);
        return true;
    } catch (error) {
        console.error("❌ Google Calendar Error:", error);
        return false;
    }
}

// Export the key sanitizer for use in test endpoint
export { getCleanPrivateKey };
