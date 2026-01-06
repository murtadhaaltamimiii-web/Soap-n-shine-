import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Token required' },
                { status: 400 }
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

        return response;
    } catch (error) {
        console.error('Session creation error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create session' },
            { status: 500 }
        );
    }
}

// Logout endpoint
export async function DELETE() {
    const response = NextResponse.json({ success: true });

    // Clear session cookie
    response.cookies.delete('__session');

    return response;
}
