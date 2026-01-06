import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ============================================================================
// RATE LIMITING: In-memory store (resets on server restart)
// For production, use Redis or similar persistent store
// ============================================================================
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 3; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

function getRateLimitKey(request: NextRequest): string {
    // Use forwarded IP for Vercel/proxied requests, fallback to 'unknown'
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    return ip;
}

function isRateLimited(key: string): boolean {
    const now = Date.now();
    const record = rateLimitStore.get(key);

    if (!record || now > record.resetTime) {
        // Reset or create new record
        rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (record.count >= RATE_LIMIT_MAX) {
        return true;
    }

    record.count++;
    return false;
}

// ============================================================================
// INPUT VALIDATION: Zod schema with XSS sanitization
// ============================================================================
const ContactSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name too long')
        .transform(val => sanitizeHtml(val)),
    email: z.string()
        .email('Invalid email address')
        .max(254, 'Email too long'),
    phone: z.string()
        .regex(/^[\d\s\-+()]{7,20}$/, 'Invalid phone number')
        .optional(),
    message: z.string()
        .min(10, 'Message must be at least 10 characters')
        .max(2000, 'Message too long')
        .transform(val => sanitizeHtml(val)),
});

// Strip HTML tags to prevent XSS
function sanitizeHtml(input: string): string {
    return input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .trim();
}

// ============================================================================
// POST /api/contact - Rate-limited contact form submission
// ============================================================================
export async function POST(request: NextRequest) {
    try {
        // 1. Rate Limiting Check
        const rateLimitKey = getRateLimitKey(request);
        if (isRateLimited(rateLimitKey)) {
            return NextResponse.json(
                { success: false, error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // 2. Parse and Validate Input
        const body = await request.json();
        const validation = ContactSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { success: false, error: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        const { name, email, phone, message } = validation.data;

        // 3. Process the contact request
        // TODO: Send email notification, save to database, etc.
        console.log('Contact form submission:', { name, email, phone, message });

        // 4. Return success response
        return NextResponse.json(
            { success: true, message: 'Thank you for contacting us! We\'ll get back to you soon.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            { success: false, error: 'An error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
