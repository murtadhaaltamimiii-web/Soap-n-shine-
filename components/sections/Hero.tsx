"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronsLeftRight } from "lucide-react";

export default function Hero() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (!isResizing || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            setSliderPosition((x / rect.width) * 100);
        },
        [isResizing]
    );

    const handleMouseUp = useCallback(() => setIsResizing(false), []);

    useEffect(() => {
        const handleGlobalMove = (e: any) => handleMove(e);
        const handleGlobalUp = () => handleMouseUp();

        document.addEventListener("mousemove", handleGlobalMove);
        document.addEventListener("mouseup", handleGlobalUp);
        document.addEventListener("touchmove", handleGlobalMove);
        document.addEventListener("touchend", handleGlobalUp);
        return () => {
            document.removeEventListener("mousemove", handleGlobalMove);
            document.removeEventListener("mouseup", handleGlobalUp);
            document.removeEventListener("touchmove", handleGlobalMove);
            document.removeEventListener("touchend", handleGlobalUp);
        };
    }, [handleMove, handleMouseUp]);

    return (
        <section className="relative min-h-screen py-20 flex items-center overflow-hidden bg-slate-950">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-950 z-10" />
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
            </div>

            <div className="container relative z-20 mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
                                Precision Detailing for <span className="text-blue-500">Maximum Shine</span>
                            </h1>
                            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                                Restore your vehicle&apos;s showroom glory with our premium detailing services. From ceramic coatings to deep interior cleans, we handle every detail.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/quote">
                                    <Button size="lg" className="w-full sm:w-auto text-lg h-12 bg-blue-600 hover:bg-blue-700">
                                        Get an Instant Quote
                                    </Button>
                                </Link>
                                <Link href="#services">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-auto text-lg h-12 bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
                                    >
                                        View Services
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Slider Component */}
                    <div className="w-full lg:w-1/2">
                        <div
                            ref={containerRef}
                            className="relative w-full max-w-3xl aspect-square mx-auto overflow-hidden rounded-xl shadow-2xl cursor-ew-resize select-none border border-white/10"
                            onMouseDown={() => setIsResizing(true)}
                            onTouchStart={() => setIsResizing(true)}
                        >
                            {/* AFTER IMAGE (Clean - Background) */}
                            <Image
                                src="/mercedes-after.jpg"
                                alt="Clean Mercedes Wheel"
                                fill
                                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                                priority
                            />

                            {/* BEFORE IMAGE (Dirty - Foreground with Clip Path) */}
                            <div
                                className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none select-none"
                                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                            >
                                <Image
                                    src="/mercedes-before.jpg"
                                    alt="Dirty Mercedes Wheel"
                                    fill
                                    className="absolute inset-0 w-full h-full object-cover select-none"
                                    priority
                                />
                            </div>

                            {/* SLIDER HANDLE */}
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                                style={{ left: `${sliderPosition}%` }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg text-blue-600 border border-gray-100">
                                    <ChevronsLeftRight size={20} />
                                </div>
                            </div>

                            {/* LABELS */}
                            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1.5 rounded text-sm font-bold uppercase tracking-widest pointer-events-none z-10 backdrop-blur-sm">
                                Before
                            </div>
                            <div className="absolute top-4 right-4 bg-blue-600/80 text-white px-3 py-1.5 rounded text-sm font-bold uppercase tracking-widest pointer-events-none z-10 backdrop-blur-sm">
                                After
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
