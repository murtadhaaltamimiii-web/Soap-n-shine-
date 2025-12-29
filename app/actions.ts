"use server";

import { prisma } from "@/lib/db";
import { createCalendarEvent } from "@/lib/google"; // Import the real function
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. CREATE BOOKING
export async function createBooking(prevState: any, formData: FormData) {
    const rawData = {
        customerName: formData.get("name") as string,
        customerPhone: formData.get("phone") as string,
        vehicleType: formData.get("vehicleSize") as string,
        packageType: formData.get("package") as string,
        price: parseFloat(formData.get("price") as string),
        date: formData.get("date") as string,
        time: formData.get("time") as string,
    };

    try {
        await prisma.booking.create({
            data: {
                customerName: rawData.customerName,
                customerPhone: rawData.customerPhone,
                vehicleType: rawData.vehicleType,
                packageType: rawData.packageType,
                priceEstimate: rawData.price,
                requestedDate: rawData.date,
                requestedTime: rawData.time,
                status: "PENDING",
            },
        });
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to save booking" };
    }

    revalidatePath("/admin");
    redirect("/quote?success=true");
}

// 2. UPDATE STATUS (With Google Calendar Trigger)
export async function updateBookingStatus(id: string, status: string) {
    try {
        // Update DB
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: { status: status as any },
        });

        // Trigger Calendar if Confirmed
        if (status === "CONFIRMED") {
            console.log("Attempting to add to Google Calendar...");
            const success = await createCalendarEvent(updatedBooking);
            if (success) console.log("Added to Google Calendar!");
            else console.log("Failed to add to Google Calendar (Check .env keys)");
        }
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

// 4. TEST CONNECTION
export async function testCalendarConnection() {
    // Simulating a dummy booking to test the connection
    const dummyBooking = {
        customerName: "TEST CLIENT",
        customerPhone: "555-555-5555",
        vehicleType: "Test Car",
        packageType: "Test Package",
        priceEstimate: 0,
        requestedDate: new Date().toISOString().split('T')[0],
        requestedTime: "12:00"
    };

    const success = await createCalendarEvent(dummyBooking);
    if (success) return { success: true, message: "Calendar Test PASSED! Check your calendar." };
    return { success: false, message: "Calendar Test FAILED. Check server console for errors." };
}