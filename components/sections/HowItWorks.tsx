"use client";

import { Calendar, Truck, CreditCard } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            icon: Calendar,
            title: "Book in 60 Seconds",
            description: "Choose your package and time online instantly."
        },
        {
            icon: Truck,
            title: "We Come to You",
            description: "Our fully equipped van arrives at your home or office. We simply need access to a water connection and a power outlet."
        },
        {
            icon: CreditCard,
            title: "Pay After Service",
            description: "Inspect the results first, then pay securely via card or transfer."
        }
    ];

    return (
        <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
                    <h2 className="text-xs sm:text-sm font-bold text-brand uppercase tracking-widest mb-3">How It Works</h2>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">Simple. Professional. Convenient.</h3>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="text-center">
                            {/* Icon Circle */}
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-brand text-white rounded-full mb-6 shadow-lg">
                                <step.icon className="w-8 h-8 sm:w-10 sm:h-10" />
                            </div>
                            {/* Title */}
                            <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{step.title}</h4>
                            {/* Description */}
                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-sm mx-auto">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
