import { NextRequest, NextResponse } from 'next/server';
import { ContactFormSchema, validateInput } from '@/lib/schemas';

// ============================================================================
// POST /api/contact - Contact form submission
// Rate limiting is now handled by middleware.ts
// ============================================================================
export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate input with centralized schema
        const validation = validateInput(ContactFormSchema, body);

        if (!validation.success) {
            return NextResponse.json(
                { success: false, error: validation.error },
                { status: 400 }
            );
        }

        const { name, email, phone, message } = validation.data;

        // Process the contact request
        // TODO: Send email notification, save to database, etc.
        console.log('Contact form submission:', { name, email, phone, message });

        // Return success response
        return NextResponse.json(
            { success: true, message: 'Thank you for contacting us! We\'ll get back to you soon.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact API error:', error);

        // Handle JSON parsing errors
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { success: false, error: 'Invalid request body' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'An error occurred. Please try again.' },
            { status: 500 }
        );
    }
}

