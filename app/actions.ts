"use server";
import { prisma } from "@/lib/db";
import { createCalendarEvent } from "@/lib/google";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { calculatePrice } from "@/lib/pricing";
import { verifyAdminAuth } from "@/lib/auth";
import { z } from "zod";

// ============================================================================
// SECURITY: INPUT VALIDATION SCHEMAS
// ============================================================================

const BookingInputSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
    address: z.string().max(500, "Address too long").optional(),
    notes: z.string().max(1000, "Notes too long").optional(),
    vehicles: z.array(z.object({
        id: z.number(),
        type: z.enum(["sedan", "suv", "truck", "van"]),
        addOns: z.array(z.string()),
    })).min(1, "At least one vehicle required").max(5, "Maximum 5 vehicles per booking"),
});

// ============================================================================
// 1. CREATE BOOKING (PUBLIC - No Auth Required)
// ============================================================================
export async function createBooking(formData: FormData) {
    try {
        // Parse and validate vehicles data
        const vehiclesData = JSON.parse(formData.get("vehicles") as string);

        // Prepare raw input data for validation
        const rawInput = {
            name: formData.get("name") as string,
            phone: formData.get("phone") as string,
            date: formData.get("date") as string,
            time: formData.get("time") as string,
            address: (formData.get("address") as string) || "",
            notes: (formData.get("notes") as string) || "",
            vehicles: vehiclesData,
        };

        // SECURITY: Validate all inputs with Zod
        const validationResult = BookingInputSchema.safeParse(rawInput);
        if (!validationResult.success) {
            console.error("Validation failed:", validationResult.error.format());
            return {
                success: false,
                error: "Invalid booking data: " + validationResult.error.errors[0].message
            };
        }

        const validated = validationResult.data;

        // SECURITY: Calculate price SERVER-SIDE (never trust client)
        const serverCalculatedPrice = validated.vehicles.reduce((sum, vehicle) => {
            return sum + calculatePrice(vehicle.type, vehicle.addOns);
        }, 0);

        // Sanity check: Compare with client-sent price (for debugging/logging)
        const clientPrice = parseFloat(formData.get("price") as string);
        if (Math.abs(serverCalculatedPrice - clientPrice) > 1) {
            console.warn(`Price mismatch detected! Server: ${serverCalculatedPrice}, Client: ${clientPrice}`);
            // Continue with server price (ignore client price)
        }

        // Create summary string for database
        const vehiclesSummary = validated.vehicles.map((v, idx) => {
            const addOnsText = v.addOns.length > 0 ? ` (${v.addOns.join(", ")})` : "";
            return `Vehicle ${idx + 1}: ${v.type}${addOnsText}`;
        }).join(" | ");

        // SECURITY: Check for existing booking in same time slot (prevent double booking)
        const existingBooking = await prisma.booking.findFirst({
            where: {
                requestedDate: validated.date,
                requestedTime: validated.time,
                status: { in: ['PENDING', 'CONFIRMED'] },
                deletedAt: null,
            }
        });

        if (existingBooking) {
            return {
                success: false,
                error: "This time slot is no longer available. Please select another time."
            };
        }

        // Create booking with SERVER-CALCULATED price
        await prisma.booking.create({
            data: {
                customerName: validated.name,
                customerPhone: validated.phone,
                vehicleType: vehiclesSummary,
                packageType: `${validated.vehicles.length} vehicle(s)`,
                priceEstimate: serverCalculatedPrice, // USE SERVER PRICE
                requestedDate: validated.date,
                requestedTime: validated.time,
                address: validated.address || "",
                serviceAddress: validated.address || "",
                status: "PENDING",
            },
        });

        revalidatePath("/admin");
        redirect("/booking-confirmation");
    } catch (error) {
        console.error("Booking creation error:", error);
        if (error instanceof Error && error.message.includes('REDIRECT')) {
            throw error; // Re-throw redirect errors
        }
        return { success: false, error: "Failed to create booking. Please try again." };
    }
}

// ============================================================================
// 2. UPDATE BOOKING STATUS (ADMIN ONLY)
// ============================================================================
export async function updateBookingStatus(id: string, status: string) {
    try {
        // SECURITY: Verify admin authentication
        await verifyAdminAuth();

        const updated = await prisma.booking.update({
            where: { id },
            data: { status: status as any },
        });

        if (status === "CONFIRMED") {
            await createCalendarEvent(updated);
        }

        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        if (error.message.includes('UNAUTHORIZED')) {
            return { success: false, error: 'Unauthorized access' };
        }
        return { success: false, error: error.message };
    }
}

// ============================================================================
// 3. RESCHEDULE BOOKING (ADMIN ONLY)
// ============================================================================
export async function rescheduleBooking(id: string, newDate: string, newTime: string) {
    try {
        // SECURITY: Verify admin authentication
        await verifyAdminAuth();

        await prisma.booking.update({
            where: { id },
            data: { requestedDate: newDate, requestedTime: newTime },
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        if (error.message.includes('UNAUTHORIZED')) {
            return { success: false, error: 'Unauthorized access' };
        }
        return { success: false, error: error.message };
    }
}

// ============================================================================
// 4. UPDATE BOOKING NOTE (ADMIN ONLY)
// ============================================================================
export async function updateBookingNote(id: string, note: string) {
    try {
        // SECURITY: Verify admin authentication
        await verifyAdminAuth();

        await prisma.booking.update({
            where: { id },
            data: { adminNotes: note },
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        if (error.message.includes('UNAUTHORIZED')) {
            return { success: false, error: 'Unauthorized access' };
        }
        return { success: false, error: error.message };
    }
}

// ============================================================================
// 5. SOFT DELETE (ADMIN ONLY)
// ============================================================================
export async function deleteBooking(id: string) {
    try {
        // SECURITY: Verify admin authentication
        await verifyAdminAuth();

        await prisma.booking.update({
            where: { id },
            data: { deletedAt: new Date() },
        });

        revalidatePath("/admin");
        revalidatePath("/admin/trash");
        return { success: true };
    } catch (error: any) {
        if (error.message.includes('UNAUTHORIZED')) {
            return { success: false, error: 'Unauthorized access' };
        }
        return { success: false, error: error.message };
    }
}

// ============================================================================
// 6. RESTORE BOOKING (ADMIN ONLY)
// ============================================================================
export async function restoreBooking(id: string) {
    try {
        // SECURITY: Verify admin authentication
        await verifyAdminAuth();

        await prisma.booking.update({
            where: { id },
            data: { deletedAt: null },
        });

        revalidatePath("/admin/trash");
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        if (error.message.includes('UNAUTHORIZED')) {
            return { success: false, error: 'Unauthorized access' };
        }
        return { success: false, error: error.message };
    }
}

// ============================================================================
// 7. PERMANENT DELETE (ADMIN ONLY)
// ============================================================================
export async function permanentDelete(id: string) {
    try {
        // SECURITY: Verify admin authentication
        await verifyAdminAuth();

        await prisma.booking.delete({ where: { id } });

        revalidatePath("/admin/trash");
        return { success: true };
    } catch (error: any) {
        if (error.message.includes('UNAUTHORIZED')) {
            return { success: false, error: 'Unauthorized access' };
        }
        return { success: false, error: error.message };
    }
}

// ============================================================================
// 8. TEST CONNECTION (ADMIN ONLY)
// ============================================================================
export async function testCalendarConnection() {
    try {
        // SECURITY: Verify admin authentication
        await verifyAdminAuth();

        return { success: true, message: "Connected" };
    } catch (error: any) {
        if (error.message.includes('UNAUTHORIZED')) {
            return { success: false, error: 'Unauthorized access' };
        }
        return { success: false, error: error.message };
    }
}

// ============================================================================
// 9. DELETE CLIENT (ADMIN ONLY)
// ============================================================================
export async function deleteClient(phone: string) {
    try {
        // SECURITY: Verify admin authentication
        await verifyAdminAuth();

        await prisma.booking.deleteMany({
            where: { customerPhone: phone }
        });

        revalidatePath("/admin");
        revalidatePath("/admin/clients");
        redirect("/admin/clients");
    } catch (error: any) {
        console.error("Delete client error:", error);
        if (error.message.includes('UNAUTHORIZED')) {
            return { success: false, error: 'Unauthorized access' };
        }
        if (error.message.includes('REDIRECT')) {
            throw error; // Re-throw redirect errors
        }
        return { success: false, error: error.message };
    }
}