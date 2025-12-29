import twilio from "twilio";
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendBookingNotifications(name: string, phone: string, date: string, time: string, vehicle: string) {
    if (!process.env.TWILIO_ACCOUNT_SID) return;

    try {
        // 1. Real Text to Owner (Verified Number)
        if (process.env.OWNER_PHONE_NUMBER) {
            await client.messages.create({
                body: `🚀 JOB: ${name} (${vehicle}) on ${date} @ ${time}. Ph: ${phone}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: process.env.OWNER_PHONE_NUMBER
            });
            console.log(`✅ SMS Alert sent to Owner`);
        }

        // 2. Simulated Text to Customer (Prevents crash on Free Tier)
        console.log(`[SIMULATION] Sending Customer SMS to ${phone}:`);
        console.log(`"Hi ${name}, thanks for booking Soap N Shine! We received your request."`);
    } catch (e: any) {
        console.error("SMS Error:", e.message);
    }
}
