"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-brand-light to-white">
            {/* Background Image with Lighter Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2600&auto=format&fit=crop')"
                    }}
                />
                {/* Subtle overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
            </div>

            {/* Content Container - Left Aligned */}
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-6 sm:space-y-8"
                    >
                        {/* Trust Badge / Service Descriptor */}
                        <div className="inline-flex items-center gap-2 bg-brand-light border border-brand-light rounded-full px-4 py-2 text-sm font-medium text-brand-dark">
                            <CheckCircle className="w-4 h-4 text-blue-400" />
                            <span>Premium Mobile Detailing Service</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                            We Bring the Showroom to <span className="text-brand">Your Driveway</span>
                        </h1>

                        {/* Supporting Sentence */}
                        <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-xl">
                            Premium mobile detailing across the GTA. Just provide water and power access—we handle the rest.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Link href="/quote">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto bg-brand hover:bg-brand-dark text-white font-semibold text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    Get an Instant Quote
                                </Button>
                            </Link>
                            <Link href="#book">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 rounded-lg bg-white text-brand border-2 border-brand hover:bg-brand-light transition-all duration-200 font-semibold"
                                >
                                    Book Now
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicator */}
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-semibold">
                            <Shield className="w-5 h-5 text-brand" />
                            <span>Fully Insured & 5-Star Rated on Google</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
