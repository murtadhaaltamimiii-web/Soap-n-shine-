import BookingForm from "@/components/booking/BookingForm";
import Reviews from "@/components/sections/Reviews"; // Import the new component

export default function Home() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white">

            {/* HERO SECTION */}
            <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-blue-900/20 to-neutral-950">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    SOAP <span className="text-blue-600">N</span> SHINE
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mb-8">
                    Premium Mobile Detailing. We come to you.
                </p>
            </section>

            {/* BOOKING SECTION */}
            <section className="max-w-4xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Book Your Detail</h2>
                    <p className="text-gray-400">Select your vehicle and package to get an instant estimate.</p>
                </div>
                <BookingForm />
            </section>

            {/* REVIEWS SECTION */}
            <Reviews />

        </main>
    );
}