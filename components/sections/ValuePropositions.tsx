import { Truck, Shield, Sparkles } from "lucide-react";

const valueProps = [
    {
        icon: Truck,
        title: "Mobile Convenience",
        description: "We bring the shop to you. No need to leave your home or office.",
    },
    {
        icon: Shield,
        title: "Paint-Safe Process",
        description: "Professional-grade products and techniques that protect your vehicle's finish.",
    },
    {
        icon: Sparkles,
        title: "Showroom Finish",
        description: "Every detail matters. We deliver results that exceed expectations.",
    },
];

export default function ValuePropositions() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
                        {valueProps.map((prop, index) => {
                            const Icon = prop.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center space-y-3 bg-brand-light/30 border border-brand-light rounded-lg p-6 sm:p-8"
                                >
                                    <div className="flex justify-center mb-1">
                                        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-brand-light text-brand">
                                            <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        {prop.title}
                                    </h3>
                                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xs mx-auto">
                                        {prop.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

