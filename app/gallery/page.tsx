"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function GalleryPage() {
    const [sliderPosition, setSliderPosition] = useState(50);

    const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();

        let x: number;
        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left;
        } else {
            x = e.clientX - rect.left;
        }

        const percentage = (x / rect.width) * 100;
        setSliderPosition(Math.min(Math.max(percentage, 0), 100));
    };

    return (
        <main className="min-h-screen bg-white">
            {/* PAGE HEADER */}
            <section className="bg-brand py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Our Work
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Real results from professional mobile detailing across the GTA
                    </p>
                </div>
            </section>

            {/* FINISHED RESULTS SECTION */}
            <section className="py-20 sm:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Finished Results
                        </h2>
                        <p className="text-lg text-gray-600">
                            Showroom-quality detailing delivered to your location
                        </p>
                    </div>

                    {/* Grid of 2 Images */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* BMW */}
                        <div>
                            <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-4">
                                <Image
                                    src="/portfolio/BMW.JPG"
                                    alt="BMW Full Detail"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Honda */}
                        <div>
                            <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-4">
                                <Image
                                    src="/portfolio/Honda_1.JPG"
                                    alt="Honda Exterior Detail"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Shared Caption */}
                    <p className="text-center text-gray-700 font-semibold text-lg max-w-6xl mx-auto mt-6">
                        Showroom Finish
                    </p>
                </div>
            </section>

            {/* TRANSFORMATION SECTION - SLIDER (Redesigned) */}
            <section className="py-20 sm:py-24 bg-slate-50">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            Tesla Wheel Deep Clean
                        </h2>
                        <p className="text-base text-gray-500 max-w-2xl mx-auto">
                            Brake dust removal, tire restoration, and ceramic-safe finish
                        </p>
                    </div>

                    {/* Interactive Slider Container */}
                    <div className="relative max-w-[1100px] mx-auto group">
                        <div
                            className="relative h-[300px] sm:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none bg-gray-200 ring-1 ring-black/5 touch-none"
                            onMouseMove={handleMove}
                            onTouchMove={handleMove}
                            onClick={handleMove}
                            role="slider"
                            aria-label="Comparison slider: Left is Before, Right is After"
                            aria-valuenow={sliderPosition}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'ArrowLeft') setSliderPosition(p => Math.max(0, p - 2));
                                if (e.key === 'ArrowRight') setSliderPosition(p => Math.min(100, p + 2));
                            }}
                        >
                            {/* BASE IMAGE: BEFORE (Dirty) - Base Layer */}
                            <div className="absolute inset-0 select-none pointer-events-none">
                                <Image
                                    src="/portfolio/Tesla_before.JPG"
                                    alt="Tesla wheel before detailing"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 1100px"
                                    priority
                                />
                                {/* Label: BEFORE (Top-Left) - Adjusted to standard expectation */}
                                <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg z-10">
                                    Before
                                </div>
                            </div>

                            {/* OVERLAY IMAGE: AFTER (Clean) - Reveals from Left */}
                            <div
                                className="absolute inset-0 select-none pointer-events-none"
                                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                            >
                                <div className="absolute inset-0 bg-gray-200">
                                    <Image
                                        src="/portfolio/Tesla_after.JPG"
                                        alt="Tesla wheel after detailing"
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 1100px"
                                    />
                                </div>
                                {/* Label: AFTER (Top-Right) */}
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg z-10 border border-gray-100">
                                    After
                                </div>
                            </div>

                            {/* SLIDER HANDLE LINE */}
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                                style={{ left: `${sliderPosition}%` }}
                            >
                                {/* KNOB */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                                    {/* Empty clean knob */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-10 relative z-30">
                        <Link
                            href="/#book"
                            className="inline-flex items-center justify-center bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            Book a Detail
                        </Link>
                    </div>
                </div>
            </section>

            {/* INTERIOR CRAFT SECTION */}
            <section className="py-20 sm:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        {/* Image */}
                        <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/portfolio/Tesla_interior.JPG"
                                alt="Tesla interior detailing"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                Interior Craft
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Professional interior detailing with specialized leather conditioning to restore
                                and protect your vehicle's cabin. We deep clean every surface, eliminate odors,
                                and apply protective treatments for long-lasting results.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Leather cleaning and conditioning</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Deep carpet and upholstery extraction</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Dashboard and trim protection</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* IN ACTION SECTION */}
            <section className="py-20 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            In Action
                        </h2>
                        <p className="text-lg text-gray-600">
                            Professional detailing at your location
                        </p>
                    </div>

                    {/* Action Image */}
                    <div className="max-w-5xl mx-auto">
                        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/portfolio/Me.JPG"
                                alt="Professional detailing in action"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-20 bg-brand">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Vehicle?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Book your professional mobile detailing service today
                    </p>
                    <a
                        href="/#contact"
                        className="inline-block bg-white hover:bg-gray-100 text-brand px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg text-lg"
                    >
                        Get in Touch
                    </a>
                </div>
            </section>
        </main>
    );
}
