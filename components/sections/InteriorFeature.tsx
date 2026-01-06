import Image from "next/image";
import { Check } from "lucide-react";

const features = [
    "Leather cleaned & conditioned",
    "Interior vacuum & extraction",
    "Trim protection applied"
];

export default function InteriorFeature() {
    return (
        <section className="py-24 bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* LEFT: Image */}
                    <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/gallery/Tesla_interior.JPG"
                            alt="Tesla interior detailing"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* RIGHT: Content */}
                    <div className="space-y-8">
                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100 leading-tight">
                            Interior Detailing & Leather Care
                        </h2>

                        {/* Description */}
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Deep interior cleaning with professional leather conditioning to restore softness,
                            protect surfaces, and eliminate odors.
                        </p>

                        {/* Checklist */}
                        <ul className="space-y-4">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-200 text-lg">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
