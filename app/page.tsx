import BookingForm from "@/components/booking/BookingForm";
import Reviews from "@/components/sections/Reviews";
import Services from "@/components/sections/Services";
import FAQ from "@/components/sections/FAQ";

import Hero from "@/components/sections/Hero";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <Hero />

            {/* SERVICES SECTION */}
            <Services />

            {/* BOOKING FORM SECTION */}
            <section id="book" className="py-20 sm:py-24 lg:py-28 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
                        <h2 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Book Your Detail</h2>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">Configure Your Package</h2>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">Select your vehicle size and add-ons to get started.</p>
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