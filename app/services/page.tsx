import Link from "next/link";

export const metadata = {
    title: "Professional Services | Soap N Shine",
    description: "Explore our premium mobile detailing services including interior steam cleaning, upholstery extraction, and ceramic waxing.",
};

export default function ServicesPage() {
    const services = [
        {
            icon: "🚗",
            title: "Interior Steam & Sanitize",
            description: "We steam clean vents, cup holders, and crevices to kill bacteria and remove grime that regular wiping misses.",
        },
        {
            icon: "💺",
            title: "Upholstery Extraction",
            description: "Deep hot-water extraction for cloth seats to lift stubborn stains, spills, and odors.",
        },
        {
            icon: "✨",
            title: "UV Plastic Protection",
            description: "Application of premium non-greasy dressings to protect your dashboard and door panels from sun fading and cracking.",
        },
        {
            icon: "🧼",
            title: "Wheel & Rim Decontamination",
            description: "Chemical removal of baked-on brake dust and road grime, followed by a high-gloss tire shine.",
        },
        {
            icon: "🛡️",
            title: "Hydrophobic Waxing",
            description: "Hand-applied wax sealant that repels water, protects clear coat, and provides a mirror-like finish.",
        },
        {
            icon: "🦠",
            title: "Complete Disinfection",
            description: "Full interior sanitization to ensure a safe, healthy environment for you and your passengers.",
        },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Professional Mobile Detailing Services
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 font-light">
                    We bring the showroom shine to your driveway.
                </p>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-start"
                        >
                            <div className="text-5xl mb-6 bg-blue-50 w-20 h-20 flex items-center justify-center rounded-2xl">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gray-900 text-white py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Shine?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Book your professional detailing service today and experience the difference.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full text-lg transition-transform hover:scale-105 shadow-lg"
                >
                    Book Now
                </Link>
            </section>
        </main>
    );
}
