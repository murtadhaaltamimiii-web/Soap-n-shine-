import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect admin routes with Basic Authentication
 * Only authenticated users can access routes starting with /admin
 */
export function middleware(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const authHeader = request.headers.get('authorization');

        // Get credentials from environment variables
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';

        // Check if authorization header exists
        if (!authHeader) {
            return new NextResponse('Authentication required', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Admin Dashboard"',
                },
            });
        }

        // Parse Basic Auth header
        const [scheme, encoded] = authHeader.split(' ');

        if (scheme !== 'Basic') {
            return new NextResponse('Invalid authentication scheme', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Admin Dashboard"',
                },
            });
        }

        // Decode credentials
        const buffer = Buffer.from(encoded, 'base64');
        const [username, password] = buffer.toString('utf-8').split(':');

        // Verify credentials
        if (username === adminUsername && password === adminPassword) {
            // Authentication successful, allow the request to proceed
            return NextResponse.next();
        }

        // Invalid credentials
        return new NextResponse('Invalid credentials', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Admin Dashboard"',
            },
        });
    }

    // Allow all other routes to proceed
    return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
    matcher: '/admin/:path*',
};
