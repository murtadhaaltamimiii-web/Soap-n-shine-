import Link from "next/link";
import { Check } from "lucide-react";

const packages = [
    {
        name: "Express Detail",
        price: "From $90",
        description: "Perfect for regular maintenance to keep your car looking sharp.",
        features: ["Exterior Hand Wash & Dry", "Wheel & Tire Cleaning", "Interior Vacuum (Light)", "Window Cleaning", "Tire Shine"],
        highlight: false,
    },
    {
        name: "Deep Clean",
        price: "From $180",
        description: "Our most popular package. A reset button for your vehicle.",
        features: ["Everything in Express", "Deep Interior Vacuum", "Leather/Cloth Shampoo", "Steam Cleaning & Sanitization", "Dashboard & Console Detail", "Door Jam Cleaning"],
        highlight: true, // This one pops with Blue 
    },
    {
        name: "Signature Ceramic",
        price: "From $350",
        description: "Showroom finish with long-term ceramic protection.",
        features: ["Everything in Deep Clean", "Clay Bar Treatment", "1-Step Paint Polish", "6-Month Ceramic Sealant", "Engine Bay Detail", "Premium Air Freshener"],
        highlight: false,
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-gray-50/50">
            <div className="text-center max-w-2xl mx-auto mb-16 px-4">
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Our Expertise</h2>
                <h3 className="text-3xl font-semibold text-gray-900 tracking-tight">Professional Detailing Packages</h3>
                <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                    We bring the shop to you. Choose the level of care your vehicle needs, from a quick refresh to a complete showroom transformation.
                </p>
            </div>

            {/* PRICING GRID */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {packages.map((pkg) => (
                    <div
                        key={pkg.name}
                        className={`relative p-8 rounded-2xl border transition-all duration-300 ${pkg.highlight
                                ? "bg-white border-blue-200 shadow-xl scale-105 z-10"
                                : "bg-white border-gray-200 shadow-sm hover:border-blue-100 hover:shadow-md"
                            }`}
                    >
                        {pkg.highlight && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                Most Popular
                            </div>
                        )}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-900">{pkg.name}</h4>
                            <p className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">{pkg.price}</p>
                            <p className="text-xs text-gray-500 mt-2 font-medium">{pkg.description}</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {pkg.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <div className="mt-0.5 min-w-[16px]">
                                        <Check className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-gray-600 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="#book"
                            className={`block w-full text-center py-3 rounded-lg text-sm font-bold transition-all ${pkg.highlight
                                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                                    : "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200"
                                }`}
                        >
                            Book Now
                        </Link>
                    </div>
                ))}
            </div>

            {/* TRUST BADGE */}
            <div className="mt-20 text-center border-t border-gray-200 pt-10 px-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Trusted by car owners in Milton & Halton Hills</p>
                <div className="flex justify-center flex-wrap gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Simple Text Logos for Classy Look */}
                    <span className="text-xl font-bold text-gray-400">Tesla</span>
                    <span className="text-xl font-bold text-gray-400">BMW</span>
                    <span className="text-xl font-bold text-gray-400">Mercedes-Benz</span>
                    <span className="text-xl font-bold text-gray-400">Audi</span>
                    <span className="text-xl font-bold text-gray-400">Porsche</span>
                </div>
            </div>
        </section>
    );
}
