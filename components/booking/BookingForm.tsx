"use client";
import { useState, useEffect } from "react";
import { createBooking } from "@/app/actions";
import { calculatePrice, ADD_ONS } from "@/lib/pricing";
import { Car, CheckCircle, X } from "lucide-react";

interface Vehicle {
    id: number;
    type: string;
    addOns: string[];
}

export default function BookingForm() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([
        { id: Date.now(), type: "sedan", addOns: [] }
    ]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    // Calculate total price from all vehicles
    useEffect(() => {
        const total = vehicles.reduce((sum, vehicle) => {
            return sum + calculatePrice(vehicle.type, vehicle.addOns);
        }, 0);
        setTotalPrice(total);
    }, [vehicles]);

    // Add a new vehicle (max 5)
    const addVehicle = () => {
        if (vehicles.length < 5) {
            setVehicles([...vehicles, {
                id: Date.now(),
                type: "sedan",
                addOns: []
            }]);
        }
    };

    // Remove a vehicle by id
    const removeVehicle = (id: number) => {
        setVehicles(vehicles.filter(v => v.id !== id));
    };

    // Update vehicle type
    const updateVehicleType = (id: number, type: string) => {
        setVehicles(vehicles.map(v =>
            v.id === id ? { ...v, type } : v
        ));
    };

    // Toggle add-on for specific vehicle
    const toggleVehicleAddOn = (vehicleId: number, addonId: string) => {
        setVehicles(vehicles.map(v => {
            if (v.id === vehicleId) {
                const newAddOns = v.addOns.includes(addonId)
                    ? v.addOns.filter(a => a !== addonId)
                    : [...v.addOns, addonId];
                return { ...v, addOns: newAddOns };
            }
            return v;
        }));
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 max-w-4xl mx-auto overflow-hidden">
            {/* HEADER */}
            <div className="bg-brand p-6 text-center">
                <p className="text-blue-100 font-medium uppercase tracking-widest text-xs mb-1">Total Estimate</p>
                <div className="flex justify-center items-baseline gap-1 text-white">
                    {totalPrice === 0 ? (
                        <span className="text-2xl font-medium text-blue-200 italic">Select options below</span>
                    ) : (
                        <span className="text-5xl font-bold">${totalPrice}</span>
                    )}
                </div>
                {vehicles.length > 1 && totalPrice > 0 && (
                    <p className="text-blue-100 text-sm mt-2">{vehicles.length} vehicles</p>
                )}
            </div>

            <form action={async (formData) => { await createBooking(formData); }} onSubmit={() => setLoading(true)} className="p-8 md:p-12 space-y-10">

                {/* VEHICLES SECTION */}
                <div>
                    {/* Section Header with Add Button */}
                    <div className="flex items-center justify-between mb-6">
                        <label className="block text-base font-bold text-gray-900 uppercase tracking-wide">1. Configure Your Vehicle(s)</label>
                        {vehicles.length < 5 && (
                            <button
                                type="button"
                                onClick={addVehicle}
                                className="text-sm font-semibold text-brand hover:text-brand-dark border border-brand hover:border-brand-dark px-3 py-1.5 rounded-lg transition-colors"
                            >
                                + Add Car
                            </button>
                        )}
                    </div>

                    {vehicles.map((vehicle, idx) => (
                        <div key={vehicle.id} className="border-2 border-brand-light rounded-xl p-6 mb-6 relative">
                            {/* Vehicle Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900 text-lg">Vehicle {idx + 1}</h3>
                                {idx > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeVehicle(vehicle.id)}
                                        className="flex items-center gap-1 text-red-600 text-sm font-semibold hover:text-red-700 transition-colors"
                                    >
                                        <X size={16} /> Remove
                                    </button>
                                )}
                            </div>

                            {/* Vehicle Type Selection */}
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Vehicle Size</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                {['sedan', 'suv', 'truck', 'van'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => updateVehicleType(vehicle.id, type)}
                                        className={`p-5 rounded-xl border-2 transition-all flex flex-col items-center gap-2 min-h-[100px] ${vehicle.type === type
                                            ? "border-brand bg-brand-light text-brand-dark"
                                            : "border-gray-100 bg-white text-gray-500 hover:border-brand-light"
                                            }`}
                                    >
                                        <Car size={28} />
                                        <span className="capitalize font-bold text-lg">{type}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Add-Ons for this vehicle */}
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Add-Ons</label>
                            <div className="grid md:grid-cols-2 gap-3">
                                {ADD_ONS.map((addon) => (
                                    <div
                                        key={addon.id}
                                        onClick={() => toggleVehicleAddOn(vehicle.id, addon.id)}
                                        className={`cursor-pointer flex justify-between items-center p-4 rounded-lg border transition-all ${vehicle.addOns.includes(addon.id)
                                            ? "border-brand bg-brand-light"
                                            : "border-gray-200 hover:border-blue-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${vehicle.addOns.includes(addon.id) ? "bg-brand border-brand" : "border-gray-300 bg-white"
                                                }`}>
                                                {vehicle.addOns.includes(addon.id) && <CheckCircle size={14} className="text-white" />}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{addon.label}</span>
                                        </div>
                                        <span className="text-sm font-bold text-gray-900">+${addon.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Hidden input with vehicles data */}
                    <input type="hidden" name="vehicles" value={JSON.stringify(vehicles)} />
                    <input type="hidden" name="price" value={totalPrice} />
                </div>

                {/* 2. DETAILS & NOTES */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">2. Your Details</label>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <input name="name" required placeholder="Full Name" className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none transition" />
                        <input name="phone" required placeholder="Phone Number" className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none transition" />
                    </div>

                    {/* Service Address Field */}
                    <div className="mb-6">
                        <input
                            name="address"
                            required
                            placeholder="Service Address (e.g. 123 Maple Street, Driveway)"
                            className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none transition"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <input name="date" type="date" required className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none transition" />

                        {/* Time Dropdown - 30 minute intervals */}
                        <select
                            name="time"
                            required
                            className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none transition"
                            defaultValue=""
                        >
                            <option value="" disabled>Select Time</option>
                            <option value="08:00">8:00 AM</option>
                            <option value="08:30">8:30 AM</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="09:30">9:30 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="10:30">10:30 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="11:30">11:30 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="12:30">12:30 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="13:30">1:30 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="14:30">2:30 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="15:30">3:30 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="16:30">4:30 PM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="17:30">5:30 PM</option>
                            <option value="18:00">6:00 PM</option>
                        </select>
                    </div>

                    {/* NOTES FIELD */}
                    <textarea
                        name="notes"
                        rows={3}
                        placeholder="Any special notes about the car(s)? (e.g. Gate code, specific stains, pets...)"
                        className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none transition resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Processing..." : `Confirm Booking${vehicles.length > 1 ? ` (${vehicles.length} Vehicles)` : ""}`}
                </button>
            </form>
        </div>
    );
}