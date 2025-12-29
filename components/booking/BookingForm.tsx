"use client";
import { useState } from "react";
import { createBooking } from "@/app/actions";

const PRICES: any = {
    sedan: { basic: 150, premium: 220, full: 300 },
    suv: { basic: 180, premium: 260, full: 340 },
    truck: { basic: 200, premium: 290, full: 380 },
};

const TIME_SLOTS = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

// Helper to calculate total price
const calculateTotal = (vehicles: any[]) => {
    return vehicles.reduce((sum, v) => {
        // @ts-ignore
        const p = PRICES[v.type]?.[v.package] || 0;
        return sum + p;
    }, 0);
};

export default function BookingForm() {
    // State for multiple vehicles
    const [vehicles, setVehicles] = useState([
        { id: 1, type: "sedan", package: "basic" }
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<any>(null);

    const totalPrice = calculateTotal(vehicles);

    // Handlers for adding/removing vehicles
    const addVehicle = () => {
        if (vehicles.length >= 3) return;
        setVehicles([...vehicles, { id: vehicles.length + 1, type: "sedan", package: "basic" }]);
    };

    const removeVehicle = (index: number) => {
        const newVehicles = vehicles.filter((_, i) => i !== index);
        setVehicles(newVehicles);
    };

    const updateVehicle = (index: number, field: string, value: string) => {
        const newVehicles = [...vehicles];
        // @ts-ignore
        newVehicles[index][field] = value;
        setVehicles(newVehicles);
    };

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        try {
            // Serialize vehicles to JSON strings for simpler backend handling
            // But actually, we need to map them to the form data format expected by the action
            // The action expects "vehicle", "package", "carCount"
            // We will combine them into strings: "sedan, suv" and "basic, full"

            const types = vehicles.map(v => v.type).join(" + ");
            const packages = vehicles.map(v => v.package).join(" + ");

            formData.append("vehicle", types);
            formData.append("package", packages);
            formData.append("carCount", vehicles.length.toString());
            formData.append("price", totalPrice.toString());

            // We add a hidden field for the raw detailed data if we want to parse it smarter later
            // But for now sticking to the plan: Flatten for DB compatibility

            const response = await createBooking(null, formData);
            setResult(response);
        } catch (e) {
            console.error(e);
            setResult({ success: false, error: "Submission failed." });
        }
        setIsSubmitting(false);
    }

    if (result?.success) {
        return (
            <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-gray-200 shadow-xl relative z-50 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">✅ Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6">Confirmation sent to your phone.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-blue-600 font-bold hover:underline"
                >
                    Book Another Vehicle
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-gray-200 shadow-xl relative z-50">
            {result?.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center font-bold">
                    ⚠ {result.error}
                </div>
            )}

            {/* VEHICLE LIST */}
            <div className="space-y-6 mb-8">
                {vehicles.map((v, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 p-6 rounded-xl relative">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-700 uppercase tracking-wider">Vehicle #{index + 1}</h3>
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeVehicle(index)}
                                    className="text-red-500 hover:text-red-700 font-bold text-sm"
                                >
                                    ✕ Remove
                                </button>
                            )}
                        </div>

                        {/* TYPE SELECTOR */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {['sedan', 'suv', 'truck'].map((type) => (
                                <div
                                    key={type}
                                    onClick={() => updateVehicle(index, 'type', type)}
                                    className={`p-3 rounded-lg border-2 font-bold capitalize text-center text-sm cursor-pointer transition-all ${v.type === type
                                            ? "bg-white border-blue-600 text-blue-600 shadow-sm"
                                            : "bg-gray-100 border-transparent text-gray-500 hover:bg-white hover:border-gray-300"
                                        }`}
                                >
                                    {type}
                                </div>
                            ))}
                        </div>

                        {/* PACKAGE SELECTOR */}
                        <div className="grid grid-cols-3 gap-3">
                            {['basic', 'premium', 'full'].map((pkg) => (
                                <div
                                    key={pkg}
                                    onClick={() => updateVehicle(index, 'package', pkg)}
                                    className={`p-3 rounded-lg border-2 font-bold capitalize text-center text-sm cursor-pointer transition-all ${v.package === pkg
                                            ? "bg-white border-blue-600 text-blue-600 shadow-sm"
                                            : "bg-gray-100 border-transparent text-gray-500 hover:bg-white hover:border-gray-300"
                                        }`}
                                >
                                    {pkg}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* ADD BUTTON */}
                {vehicles.length < 3 && (
                    <button
                        type="button"
                        onClick={addVehicle}
                        className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 font-bold rounded-xl hover:border-blue-500 hover:text-blue-600 transition"
                    >
                        + Add Another Vehicle
                    </button>
                )}
            </div>

            {/* INPUTS */}
            <form action={handleSubmit} className="space-y-4">
                {/* New Optional Address Field */}
                <input
                    name="address"
                    placeholder="Service Address (Optional)"
                    className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 outline-none text-gray-900 focus:border-blue-500 placeholder:text-gray-400 transition"
                />
                <div className="grid md:grid-cols-2 gap-4">
                    <input required name="date" type="date" className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 outline-none text-gray-900 focus:border-blue-500 transition" />
                    <select name="time" className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 outline-none text-gray-900 focus:border-blue-500 transition bg-white">
                        {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <input required name="name" placeholder="Full Name" className="bg-gray-50 p-4 rounded-xl border border-gray-200 outline-none text-gray-900 focus:border-blue-500 transition" />
                    <input required name="phone" placeholder="Phone Number" className="bg-gray-50 p-4 rounded-xl border border-gray-200 outline-none text-gray-900 focus:border-blue-500 transition" />
                </div>

                {/* FOOTER */}
                <div className="pt-6 border-t mt-6 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-4xl font-bold text-gray-900">${totalPrice}</span>
                        {vehicles.length > 1 && (
                            <span className="text-sm text-gray-500 font-medium">
                                {vehicles.length} cars configured
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400 transition shadow-lg"
                    >
                        {isSubmitting ? "Booking..." : "Book Now"}
                    </button>
                </div>
            </form>
        </div>
    );
}