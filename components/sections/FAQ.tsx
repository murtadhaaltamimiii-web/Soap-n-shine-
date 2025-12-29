"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        q: "Do I need to provide water or power?",
        a: "Yes. To keep our prices competitive, we require access to a standard water spigot and an electrical outlet within 100 feet of the driveway.",
    },
    {
        q: "How long does a detail take?",
        a: "It depends on the package, but typically a full detail takes between 2 to 4 hours. We focus on quality, not rushing.",
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, debit, cash, and Interac e-Transfer upon completion of the job.",
    },
    {
        q: "Do you service my area?",
        a: "We proudly serve the entire Greater Toronto Area (GTA), including Milton, Halton Hills, and surrounding regions. If you're unsure, just give us a call!",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 sm:py-24 lg:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="text-center mb-12 sm:mb-16 space-y-4">
                    <h2 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest">Common Questions</h2>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">Everything You Need to Know</h3>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:border-blue-300 hover:shadow-sm">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex justify-between items-center p-6 sm:p-7 text-left gap-4"
                            >
                                <span className="font-semibold text-gray-900 text-base sm:text-lg leading-relaxed pr-4">{faq.q}</span>
                                <div className="flex-shrink-0">
                                    {openIndex === i ? <Minus className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" /> : <Plus className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />}
                                </div>
                            </button>

                            <div className={`px-6 sm:px-7 overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96 pb-6 sm:pb-7 opacity-100" : "max-h-0 opacity-0"}`}>
                                <p className="text-gray-600 text-base leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
