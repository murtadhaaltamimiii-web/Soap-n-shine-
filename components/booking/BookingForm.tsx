"use client";
import { useState, useEffect } from "react";
import { createBooking } from "@/app/actions";
import { calculatePrice, ADD_ONS } from "@/lib/pricing";
import { Car, CheckCircle } from "lucide-react";

export default function BookingForm() {
    const [vehicle, setVehicle] = useState("sedan");
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPrice(calculatePrice(vehicle, selectedAddOns));
    }, [vehicle, selectedAddOns]);

    const toggleAddOn = (id: string) => {
        setSelectedAddOns(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 max-w-4xl mx-auto overflow-hidden">
            {/* HEADER */}
            <div className="bg-blue-600 p-6 text-center">
                <p className="text-blue-100 font-medium uppercase tracking-widest text-xs mb-1">Total Estimate</p>
                <div className="flex justify-center items-baseline gap-1 text-white">
                    <span className="text-5xl font-bold">${price}</span>
                </div>
            </div>

            <form action={async (formData) => { await createBooking(formData); }} onSubmit={() => setLoading(true)} className="p-8 md:p-12 space-y-10">

                {/* 1. VEHICLE TYPE */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">1. Select Vehicle Size</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['sedan', 'suv', 'truck', 'van'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setVehicle(type)}
                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${vehicle === type
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-gray-100 bg-white text-gray-500 hover:border-blue-200"
                                    }`}
                            >
                                <Car size={24} />
                                <span className="capitalize font-bold text-sm">{type}</span>
                            </button>
                        ))}
                    </div>
                    <input type="hidden" name="vehicleSize" value={vehicle} />
                    <input type="hidden" name="price" value={price} />
                    <input type="hidden" name="package" value="Standard + Addons" />
                </div>

                {/* 2. ADD-ONS */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">2. Customize & Add-Ons</label>
                    <div className="grid md:grid-cols-2 gap-3">
                        {ADD_ONS.map((addon) => (
                            <div
                                key={addon.id}
                                onClick={() => toggleAddOn(addon.id)}
                                className={`cursor-pointer flex justify-between items-center p-4 rounded-lg border transition-all ${selectedAddOns.includes(addon.id)
                                    ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                                    : "border-gray-200 hover:border-blue-300"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedAddOns.includes(addon.id) ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white"
                                        }`}>
                                        {selectedAddOns.includes(addon.id) && <CheckCircle size={14} className="text-white" />}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{addon.label}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">+${addon.price}</span>
                            </div>
                        ))}
                    </div>
                    <input type="hidden" name="addons" value={selectedAddOns.join(",")} />
                </div>

                {/* 3. DETAILS & NOTES */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">3. Your Details</label>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <input name="name" required placeholder="Full Name" className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition" />
                        <input name="phone" required placeholder="Phone Number" className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <input name="date" type="date" required className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition" />
                        <input name="time" type="time" required className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition" />
                    </div>

                    {/* NOTES FIELD */}
                    <textarea
                        name="notes"
                        rows={3}
                        placeholder="Any special notes about the car? (e.g. Gate code, specific stains, pets...)"
                        className="w-full p-3 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition resize-none"
                    />
                    {/* Include the hidden address field so it's not null */}
                    <input type="hidden" name="address" value="Provided via Phone/Text" />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg flex justify-center items-center"
                >
                    {loading ? "Processing..." : "Confirm Booking"}
                </button>
            </form>
        </div>
    );
}