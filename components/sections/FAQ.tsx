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
        <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Common Questions</h2>
                    <h3 className="text-3xl font-semibold text-gray-900 tracking-tight">Everything You Need to Know</h3>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:border-blue-200">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex justify-between items-center p-6 text-left"
                            >
                                <span className="font-semibold text-gray-900">{faq.q}</span>
                                {openIndex === i ? <Minus className="text-blue-600 w-5 h-5" /> : <Plus className="text-gray-400 w-5 h-5" />}
                            </button>

                            <div className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
