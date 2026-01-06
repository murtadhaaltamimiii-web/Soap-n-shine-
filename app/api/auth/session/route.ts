import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// ============================================================================
// RATE LIMITING: In-memory store for login attempts
// Prevents brute-force attacks (5 attempts per 15 minutes per IP)
// ============================================================================
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    return ip;
}

function isRateLimited(ip: string): { limited: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const record = loginAttempts.get(ip);

    if (!record || now > record.firstAttempt + RATE_LIMIT_WINDOW_MS) {
        // Window expired or no record, allow request
        return { limited: false, remaining: RATE_LIMIT_MAX, resetIn: 0 };
    }

    if (record.count >= RATE_LIMIT_MAX) {
        const resetIn = Math.ceil((record.firstAttempt + RATE_LIMIT_WINDOW_MS - now) / 1000);
        return { limited: true, remaining: 0, resetIn };
    }

    return { limited: false, remaining: RATE_LIMIT_MAX - record.count, resetIn: 0 };
}

function recordAttempt(ip: string): void {
    const now = Date.now();
    const record = loginAttempts.get(ip);

    if (!record || now > record.firstAttempt + RATE_LIMIT_WINDOW_MS) {
        // Start new window
        loginAttempts.set(ip, { count: 1, firstAttempt: now });
    } else {
        // Increment in current window
        record.count++;
    }
}

function clearAttempts(ip: string): void {
    loginAttempts.delete(ip);
}

// ============================================================================
// POST /api/auth/session - Create session cookie (with rate limiting)
// ============================================================================
export async function POST(request: Request) {
    const ip = getClientIP(request);

    // Check rate limit
    const { limited, remaining, resetIn } = isRateLimited(ip);
    if (limited) {
        return NextResponse.json(
            {
                success: false,
                error: `Too many login attempts. Please try again in ${resetIn} seconds.`
            },
            {
                status: 429,
                headers: {
                    'Retry-After': String(resetIn),
                    'X-RateLimit-Remaining': '0',
                }
            }
        );
    }

    // Record this attempt
    recordAttempt(ip);

    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Token required' },
                {
                    status: 400,
                    headers: { 'X-RateLimit-Remaining': String(remaining - 1) }
                }
            );
        }

        // Create response
        const response = NextResponse.json({ success: true });

        // Set httpOnly cookie with Firebase token
        response.cookies.set('__session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        // Success - clear rate limit for this IP
        clearAttempts(ip);

        return response;
    } catch (error) {
        console.error('Session creation error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create session' },
            {
                status: 500,
                headers: { 'X-RateLimit-Remaining': String(remaining - 1) }
            }
        );
    }
}

// ============================================================================
// DELETE /api/auth/session - Logout endpoint
// ============================================================================
export async function DELETE() {
    const response = NextResponse.json({ success: true });

    // Clear session cookie
    response.cookies.delete('__session');

    return response;
}
