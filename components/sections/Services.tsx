import { SprayCan, Armchair, Sun, Disc, Droplets, ShieldCheck } from "lucide-react";

const services = [
    {
        icon: SprayCan,
        title: "Interior Steam Cleaning",
        description: "We steam clean vents & crevices to sanitize high-touch areas and lift deep grime."
    },
    {
        icon: Armchair,
        title: "Upholstery Extraction",
        description: "Deep extraction removes embedded dirt, stains, and odors from fabric and leather seats."
    },
    {
        icon: Sun,
        title: "UV Plastic Protection",
        description: "Restore and protect interior plastics from UV damage and fading with premium treatment."
    },
    {
        icon: Disc,
        title: "Wheel & Rim Decontamination",
        description: "We remove brake dust, tar, and road grime with professional-grade cleaners and techniques."
    },
    {
        icon: Droplets,
        title: "Hydrophobic Waxing",
        description: "Hand-applied sealant that repels water and provides a high-gloss, water-beading finish."
    },
    {
        icon: ShieldCheck,
        title: "Complete Disinfection",
        description: "Full interior sanitization to ensure a fresh, safe cabin environment."
    }
];

export default function Services() {
    return (
        <section id="services" className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* SECTION HEADER */}
                <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        What's Included in a Premium Detail
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                        Professional-grade tools and processes that protect your vehicle long-term.
                    </p>
                </div>

                {/* SERVICES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-light transition-all duration-300 ease-out group"
                            >
                                {/* Icon Container */}
                                <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center mb-6 group-hover:bg-brand-light transition-colors">
                                    <Icon className="w-6 h-6 text-brand" />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-slate-900 mb-3 min-h-[3.5rem] leading-tight">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* TRUST BADGE SECTION */}
                <div className="mt-16 sm:mt-20 text-center">
                    <p className="text-xs sm:text-sm font-semibold text-brand uppercase tracking-widest mb-6 sm:mb-8">
                        Professional Mobile Detailing Across the Greater Toronto Area
                    </p>
                    <div className="flex justify-center flex-wrap gap-6 sm:gap-8 lg:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 hover:text-brand transition-colors">Tesla</span>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 hover:text-brand transition-colors">BMW</span>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 hover:text-brand transition-colors">Mercedes-Benz</span>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 hover:text-brand transition-colors">Audi</span>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 hover:text-brand transition-colors">Porsche</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
