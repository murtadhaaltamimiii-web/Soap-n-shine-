/**
 * Centralized Zod Validation Schemas
 * 
 * All input validation schemas for the application.
 * Import these schemas in API routes and Server Actions.
 */

import { z } from "zod";

// ============================================================================
// SANITIZATION HELPERS
// ============================================================================

/**
 * Strip HTML tags and dangerous characters to prevent XSS
 */
export function sanitizeInput(input: string): string {
    return input
        .replace(/<[^>]*>/g, "")           // Remove HTML tags
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/javascript:/gi, "")       // Remove javascript: URLs
        .replace(/on\w+\s*=/gi, "")         // Remove event handlers
        .trim();
}

/**
 * Sanitization transform for Zod schemas
 */
const sanitizedString = (maxLength: number = 500) =>
    z.string().max(maxLength).transform(sanitizeInput);

// ============================================================================
// VEHICLE TYPE ENUM
// ============================================================================
export const VehicleTypeEnum = z.enum(["sedan", "suv", "truck", "van"]);
export type VehicleType = z.infer<typeof VehicleTypeEnum>;

// ============================================================================
// ADD-ON IDS (matches lib/pricing.ts)
// ============================================================================
export const AddOnIdEnum = z.enum([
    "pet-hair",
    "engine-bay",
    "headlight",
    "steam-clean",
    "plastic-trim",
    "child-seat",
]);
export type AddOnId = z.infer<typeof AddOnIdEnum>;

// ============================================================================
// PHONE NUMBER VALIDATION
// ============================================================================
// Supports formats: +1 (555) 123-4567, 555-123-4567, 5551234567, etc.
const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;

// ============================================================================
// BOOKING FORM SCHEMA (Public Form Submission)
// ============================================================================
export const BookingFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long")
        .transform(sanitizeInput),

    phone: z
        .string()
        .min(7, "Phone number is too short")
        .max(20, "Phone number is too long")
        .regex(phoneRegex, "Invalid phone number format"),

    email: z
        .string()
        .email("Invalid email address")
        .max(254, "Email is too long")
        .optional()
        .or(z.literal("")),

    date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),

    time: z
        .string()
        .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),

    address: sanitizedString(500).optional().or(z.literal("")),

    notes: sanitizedString(500).optional().or(z.literal("")),

    vehicles: z
        .array(
            z.object({
                id: z.number(),
                type: VehicleTypeEnum,
                addOns: z.array(z.string()),
            })
        )
        .min(1, "At least one vehicle is required")
        .max(5, "Maximum 5 vehicles per booking"),
});

export type BookingFormInput = z.infer<typeof BookingFormSchema>;

// ============================================================================
// CONTACT FORM SCHEMA
// ============================================================================
export const ContactFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long")
        .transform(sanitizeInput),

    email: z
        .string()
        .email("Invalid email address")
        .max(254, "Email is too long"),

    phone: z
        .string()
        .regex(phoneRegex, "Invalid phone number")
        .optional()
        .or(z.literal("")),

    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message is too long")
        .transform(sanitizeInput),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// ============================================================================
// ADMIN INPUT SCHEMAS
// ============================================================================

export const BookingStatusSchema = z.enum([
    "PENDING",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
]);

export const UpdateBookingNoteSchema = z.object({
    id: z.string().uuid("Invalid booking ID"),
    note: sanitizedString(2000),
});

export const RescheduleBookingSchema = z.object({
    id: z.string().uuid("Invalid booking ID"),
    newDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    newTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
});

// ============================================================================
// UTILITY: Validate and return typed data or error
// ============================================================================
export function validateInput<T extends z.ZodSchema>(
    schema: T,
    data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: string } {
    const result = schema.safeParse(data);

    if (!result.success) {
        const firstError = result.error.errors[0];
        return {
            success: false,
            error: firstError?.message || "Invalid input",
        };
    }

    return { success: true, data: result.data };
}
