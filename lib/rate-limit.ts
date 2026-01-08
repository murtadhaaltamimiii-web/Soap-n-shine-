/**
 * Rate Limiting Utility
 * 
 * PRODUCTION: Uses Upstash Redis (distributed, persistent)
 * FALLBACK: In-memory Map when env vars are missing
 * 
 * Analytics enabled - view attack logs in Upstash dashboard
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ============================================================================
// CONFIGURATION
// ============================================================================
export const RATE_LIMITS = {
    api: { requests: 10, window: "10 s" as const },     // 10 req per 10 sec for API routes
    booking: { requests: 20, window: "60 s" as const }, // 20 req per minute for booking
    contact: { requests: 5, window: "60 s" as const },  // 5 req per minute for contact
} as const;

// ============================================================================
// IN-MEMORY FALLBACK (for development / when Redis not configured)
// ============================================================================
const inMemoryStore = new Map<string, { count: number; resetTime: number }>();

function inMemoryRateLimit(
    identifier: string,
    maxRequests: number,
    windowMs: number
): { success: boolean; remaining: number } {
    const now = Date.now();
    const record = inMemoryStore.get(identifier);

    // Cleanup expired entries periodically
    if (inMemoryStore.size > 1000) {
        const entries = Array.from(inMemoryStore.entries());
        for (const [key, val] of entries) {
            if (now > val.resetTime) inMemoryStore.delete(key);
        }
    }

    if (!record || now > record.resetTime) {
        inMemoryStore.set(identifier, { count: 1, resetTime: now + windowMs });
        return { success: true, remaining: maxRequests - 1 };
    }

    if (record.count >= maxRequests) {
        return { success: false, remaining: 0 };
    }

    record.count++;
    return { success: true, remaining: maxRequests - record.count };
}

// ============================================================================
// REDIS RATE LIMITER (Upstash)
// ============================================================================
let redisClient: Redis | null = null;
let apiRateLimiter: Ratelimit | null = null;
let bookingRateLimiter: Ratelimit | null = null;
let contactRateLimiter: Ratelimit | null = null;

// Check if Upstash is configured
const UPSTASH_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

if (UPSTASH_URL && UPSTASH_TOKEN) {
    redisClient = new Redis({
        url: UPSTASH_URL,
        token: UPSTASH_TOKEN,
    });

    apiRateLimiter = new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(RATE_LIMITS.api.requests, RATE_LIMITS.api.window),
        prefix: "ratelimit:api",
        analytics: true,  // Enable analytics for Upstash dashboard
    });

    bookingRateLimiter = new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(RATE_LIMITS.booking.requests, RATE_LIMITS.booking.window),
        prefix: "ratelimit:booking",
        analytics: true,
    });

    contactRateLimiter = new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(RATE_LIMITS.contact.requests, RATE_LIMITS.contact.window),
        prefix: "ratelimit:contact",
        analytics: true,
    });

    console.log("✅ Rate limiting: Using Upstash Redis");
} else {
    console.warn("⚠️ Rate limiting: Upstash not configured, using in-memory fallback");
}

// ============================================================================
// UNIFIED RATE LIMIT FUNCTION
// ============================================================================
export type RateLimitType = "api" | "booking" | "contact";

export async function rateLimit(
    identifier: string,
    type: RateLimitType = "api"
): Promise<{ success: boolean; remaining: number }> {
    const config = RATE_LIMITS[type];

    // Use Redis if available
    if (redisClient) {
        let limiter: Ratelimit;
        switch (type) {
            case "booking":
                limiter = bookingRateLimiter!;
                break;
            case "contact":
                limiter = contactRateLimiter!;
                break;
            default:
                limiter = apiRateLimiter!;
        }

        const result = await limiter.limit(identifier);
        return { success: result.success, remaining: result.remaining };
    }

    // Fallback to in-memory
    const windowMs = parseInt(config.window) * 1000;
    return inMemoryRateLimit(`${type}:${identifier}`, config.requests, windowMs);
}

// ============================================================================
// HELPER: Extract IP from Request
// ============================================================================
export function getClientIP(request: Request): string {
    // Try various headers used by proxies/CDNs
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    const realIP = request.headers.get("x-real-ip");
    if (realIP) {
        return realIP.trim();
    }

    // Vercel-specific
    const vercelIP = request.headers.get("x-vercel-forwarded-for");
    if (vercelIP) {
        return vercelIP.split(",")[0].trim();
    }

    return "unknown";
}
