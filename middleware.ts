import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect admin routes with Firebase Authentication
 * Redirects unauthenticated users to the login page
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

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
    matcher: '/admin/:path*',
};
