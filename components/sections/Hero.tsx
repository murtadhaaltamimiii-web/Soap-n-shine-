"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-slate-950">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-950 z-10" />
                {/* Placeholder for Hero Image - In production, replace with a real car image */}
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
            </div>

            <div className="container relative z-20 mx-auto px-4">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
                            Precision Detailing for <span className="text-blue-500">Maximum Shine</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                            Restore your vehicle's showroom glory with our premium detailing services.
                            From ceramic coatings to deep interior cleans, we handle every detail.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/quote">
                                <Button size="lg" className="w-full sm:w-auto text-lg h-12 bg-blue-600 hover:bg-blue-700">
                                    Get an Instant Quote
                                </Button>
                            </Link>
                            <Link href="#services">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
                                    View Services
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
