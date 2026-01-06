import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getCleanPrivateKey } from '@/lib/google';

/**
 * Google Calendar Diagnostic Endpoint
 * 
 * GET /api/test-calendar
 * 
 * Tests the Google Calendar credentials by creating a test event.
 * Use this to diagnose authentication or permission issues.
 */
export async function GET() {
    // Load credentials
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = getCleanPrivateKey(); // Use the robust cleaner
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    // Check for missing credentials
    if (!clientEmail || !privateKey) {
        return NextResponse.json({
            status: 'error',
            message: 'Missing Google credentials',
            details: {
                GOOGLE_CLIENT_EMAIL: clientEmail ? '✅ Set' : '❌ Missing',
                GOOGLE_PRIVATE_KEY: privateKey ? '✅ Set' : '❌ Missing',
                GOOGLE_CALENDAR_ID: calendarId ? `✅ ${calendarId}` : '⚠️ Using "primary"',
            }
        }, { status: 400 });
    }

    try {
        // Initialize JWT auth with cleaned key
        const auth = new google.auth.JWT({
            email: clientEmail,
            key: privateKey,
            scopes: ['https://www.googleapis.com/auth/calendar'],
        });

        // Initialize Calendar API
        const calendar = google.calendar({ version: 'v3', auth });

        // Create test event (1 hour from now)
        const now = new Date();
        const startTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 2 hours from now

        const event = await calendar.events.insert({
            calendarId: calendarId,
            requestBody: {
                summary: '🧪 TEST EVENT - Delete Me',
                description: 'This is a test event created by the Soap n Shine calendar diagnostic endpoint. You can safely delete this event.',
                start: { dateTime: startTime.toISOString() },
                end: { dateTime: endTime.toISOString() },
            },
        });

        return NextResponse.json({
            status: 'success',
            message: 'Test event created successfully!',
            event: {
                id: event.data.id,
                summary: event.data.summary,
                link: event.data.htmlLink,
                start: event.data.start?.dateTime,
                end: event.data.end?.dateTime,
            },
            instructions: 'Check your Google Calendar. Delete this test event after verifying.'
        });

    } catch (error: any) {
        console.error('Calendar test error:', error);

        // Parse common error messages
        let friendlyMessage = error.message;
        if (error.message?.includes('invalid_grant')) {
            friendlyMessage = 'Invalid credentials. The private key format is incorrect or the service account is disabled.';
        } else if (error.message?.includes('Invalid JWT Signature')) {
            friendlyMessage = 'Invalid JWT Signature. The private key is malformed. Try re-copying it from Google Cloud Console.';
        } else if (error.message?.includes('Not Found')) {
            friendlyMessage = 'Calendar not found. Check GOOGLE_CALENDAR_ID or share your calendar with the service account.';
        } else if (error.message?.includes('forbidden')) {
            friendlyMessage = 'Permission denied. Share your Google Calendar with the service account email.';
        }

        return NextResponse.json({
            status: 'error',
            message: friendlyMessage,
            originalError: error.message,
            hint: 'Make sure the calendar is shared with: ' + clientEmail,
            keyDebug: {
                startsWithDash: privateKey.startsWith('-----'),
                endsWithDash: privateKey.endsWith('-----\n') || privateKey.endsWith('-----'),
                hasLineBreaks: privateKey.includes('\n'),
                length: privateKey.length,
            },
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        }, { status: 500 });
    }
}
