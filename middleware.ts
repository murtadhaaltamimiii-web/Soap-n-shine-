import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit, getClientIP, RateLimitType } from '@/lib/rate-limit';

/**
 * Middleware: Authentication + Rate Limiting
 * 
 * 1. Protects admin routes with Firebase Authentication
 * 2. Rate limits API routes and public forms
 */
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // =========================================================================
    // RATE LIMITING
    // =========================================================================
    const ip = getClientIP(request);

    // Determine rate limit type based on route
    let rateLimitType: RateLimitType | null = null;

    if (pathname.startsWith('/api/contact')) {
        rateLimitType = 'contact';
    } else if (pathname.startsWith('/api/')) {
        rateLimitType = 'api';
    } else if (pathname === '/book' || pathname === '/booking') {
        rateLimitType = 'booking';
    }

    // Apply rate limiting if applicable
    if (rateLimitType) {
        try {
            const result = await rateLimit(ip, rateLimitType);

            if (!result.success) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Too many requests. Please try again later.',
                        retryAfter: 60
                    },
                    {
                        status: 429,
                        headers: {
                            'Retry-After': '60',
                            'X-RateLimit-Remaining': '0',
                        }
                    }
                );
            }
        } catch (error) {
            // Rate limiting failed - log but don't block request
            console.error('Rate limiting error:', error);
        }
    }

    // =========================================================================
    // ADMIN AUTHENTICATION
    // =========================================================================
    // Protect all /admin routes EXCEPT /admin/login
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        // Check for Firebase session cookie
        const session = request.cookies.get('__session');

        if (!session || !session.value) {
            // No session found - redirect to login page
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        // Session exists - allow request to proceed
        // Note: Token verification happens in Server Actions via verifyAdminAuth()
        return NextResponse.next();
    }

    // Allow all other routes to proceed
    return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
    matcher: [
        // Admin routes
        '/admin/:path*',
        // API routes (for rate limiting)
        '/api/:path*',
        // Booking page (for rate limiting)
        '/book',
        '/booking',
    ],
};
