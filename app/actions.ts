"use server";
import { prisma } from "@/lib/db";
import { createCalendarEvent } from "@/lib/google";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. CREATE BOOKING
export async function createBooking(formData: FormData) {
    // Parse vehicles data from form
    const vehiclesData = JSON.parse(formData.get("vehicles") as string);

    // Create summary string for database
    const vehiclesSummary = vehiclesData.map((v: any, idx: number) => {
        const addOnsText = v.addOns.length > 0 ? ` (${v.addOns.join(", ")})` : "";
        return `Vehicle ${idx + 1}: ${v.type}${addOnsText}`;
    }).join(" | ");

    try {
        await prisma.booking.create({
            data: {
                customerName: formData.get("name") as string,
                customerPhone: formData.get("phone") as string,
                vehicleType: vehiclesSummary,
                packageType: `${vehiclesData.length} vehicle(s)`,
                priceEstimate: parseFloat(formData.get("price") as string),
                requestedDate: formData.get("date") as string,
                requestedTime: formData.get("time") as string,
                address: formData.get("address") as string || "", // Fixed: Now saves address
                serviceAddress: formData.get("address") as string || "", // Redundancy for compatibility
                status: "PENDING",
            },
        });
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to save booking" };
    }

    revalidatePath("/admin");
    redirect("/booking-confirmation");
}

// 2. UPDATE STATUS
export async function updateBookingStatus(id: string, status: string) {
    try {
        const updated = await prisma.booking.update({
            where: { id },
            data: { status: status as any },
        });
        if (status === "CONFIRMED") await createCalendarEvent(updated);
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 3. RESCHEDULE
export async function rescheduleBooking(id: string, newDate: string, newTime: string) {
    try {
        await prisma.booking.update({
            where: { id },
            data: { requestedDate: newDate, requestedTime: newTime },
        });
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 4. UPDATE NOTE
export async function updateBookingNote(id: string, note: string) {
    try {
        await prisma.booking.update({
            where: { id },
            data: { adminNotes: note },
        });
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 5. SOFT DELETE (TRASH)
export async function deleteBooking(id: string) {
    try {
        await prisma.booking.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        revalidatePath("/admin");
        revalidatePath("/admin/trash");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 6. RESTORE
export async function restoreBooking(id: string) {
    try {
        await prisma.booking.update({
            where: { id },
            data: { deletedAt: null },
        });
        revalidatePath("/admin/trash");
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 7. PERMANENT DELETE
export async function permanentDelete(id: string) {
    try {
        await prisma.booking.delete({ where: { id } });
        revalidatePath("/admin/trash");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// 8. TEST CONNECTION
export async function testCalendarConnection() {
    return { success: true, message: "Connected" };
}

// 9. DELETE CLIENT
export async function deleteClient(phone: string) {
    try {
        await prisma.booking.deleteMany({
            where: { customerPhone: phone }
        });
        revalidatePath("/admin");
        revalidatePath("/admin/clients");
    } catch (error: any) {
        console.error("Delete client error:", error);
        return { success: false, error: error.message };
    }
    redirect("/admin/clients");
}