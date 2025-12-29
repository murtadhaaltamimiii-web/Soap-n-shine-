import BookingForm from "@/components/booking/BookingForm";
import Reviews from "@/components/sections/Reviews";
import Services from "@/components/sections/Services";
import FAQ from "@/components/sections/FAQ";
import BeforeAfter from "@/components/sections/BeforeAfter";

import Hero from "@/components/sections/Hero";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <Hero />

            {/* OMITTED: Process Component (Does not exist) */}

            {/* NEW BEFORE/AFTER SLIDER SECTION */}
            <BeforeAfter />

            {/* SERVICES SECTION */}
            <Services />

            {/* BOOKING FORM SECTION */}
            <section id="book" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Book Your Detail</h2>
                        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mb-4">Configure Your Package</h2>
                        <p className="text-gray-500 text-sm">Select your vehicle size and add-ons.</p>
                    </div>
                    <BookingForm />
                </div>
            </section>

            {/* FAQ SECTION */}
            <FAQ />

            {/* REVIEWS SECTION */}
            <Reviews />
        </main>
    );
}