import BookingForm from "@/components/booking/BookingForm";
import Reviews from "@/components/sections/Reviews";
import Image from "next/image";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            {/* HERO SECTION (Restored Design) */}
            <section className="relative h-[85vh] w-full flex items-center overflow-hidden">

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2300&auto=format&fit=crop"
                        alt="Car Detailing Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                </div>

                {/* Text Content */}
                <div className="relative z-10 container mx-auto px-6 md:px-12 mt-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                            Precision Detailing for <br />
                            <span className="text-blue-300">Maximum Shine</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                            Restore your vehicle's showroom glory with our premium detailing services.
                            From ceramic coatings to deep interior cleans, we handle every detail.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#book" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition shadow-lg shadow-blue-900/50">
                                Get an Instant Quote
                            </a>
                            <a href="#services" className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 rounded-lg font-bold text-lg transition">
                                View Services
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOOKING FORM SECTION */}
            <section id="book" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Detail</h2>
                        <p className="text-gray-500">Select your vehicle size to get started.</p>
                    </div>
                    <BookingForm />
                </div>
            </section>

            {/* REVIEWS SECTION */}
            <Reviews />
        </main>
    );
}