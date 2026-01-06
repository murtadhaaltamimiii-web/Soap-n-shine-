"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past hero (800px)
            setIsVisible(window.scrollY > 800);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-lg block md:hidden">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Pricing */}
                <div>
                    <p className="text-xs text-slate-500 font-medium">Starting from</p>
                    <p className="text-2xl font-bold text-slate-900">$199</p>
                </div>
                {/* CTA Button */}
                <Link href="/quote">
                    <button className="bg-brand hover:bg-brand-dark text-white font-bold px-8 py-3 rounded-lg transition-all shadow-md active:scale-95">
                        Book Now
                    </button>
                </Link>
            </div>
        </div>
    );
}
