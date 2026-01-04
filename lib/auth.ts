import { headers } from 'next/headers';

/**
 * CRITICAL SECURITY: Authorization Helper
 * Verifies that the request has valid admin credentials via Basic Auth
 * This MUST be called at the start of every admin Server Action
 */
export async function verifyAdminAuth(): Promise<void> {
    const headersList = headers();
    const authHeader = headersList.get('authorization');

    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';

    // Check if authorization header exists
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        throw new Error('UNAUTHORIZED: Admin authentication required');
    }

    try {
        // Parse Basic Auth header
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');

        // Verify credentials
        if (username !== adminUsername || password !== adminPassword) {
            throw new Error('UNAUTHORIZED: Invalid admin credentials');
        }
    } catch (error) {
        throw new Error('UNAUTHORIZED: Invalid authentication format');
    }
}
