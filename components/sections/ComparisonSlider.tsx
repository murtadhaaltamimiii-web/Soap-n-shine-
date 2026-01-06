"use client";

import Image from "next/image";
import { useState } from "react";

export default function ComparisonSlider() {
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
        <section className="py-24 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100 tracking-tight mb-4">
                        Detail Makes the Difference
                    </h2>
                </div>

                {/* Slider Container */}
                <div className="max-w-4xl mx-auto">
                    <div
                        className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
                        onMouseMove={handleMove}
                        onTouchMove={handleMove}
                    >
                        {/* Before Image (Full) */}
                        <div className="absolute inset-0">
                            <Image
                                src="/gallery/Tesla_before.JPG"
                                alt="Tesla wheel before detailing"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded text-white text-sm font-semibold">
                                Before
                            </div>
                        </div>

                        {/* After Image (Clipped) */}
                        <div
                            className="absolute inset-0"
                            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                        >
                            <Image
                                src="/gallery/Tesla_after.JPG"
                                alt="Tesla wheel after detailing"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded text-white text-sm font-semibold">
                                After
                            </div>
                        </div>

                        {/* Slider Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                                <div className="flex gap-0.5">
                                    <div className="w-0.5 h-4 bg-gray-900"></div>
                                    <div className="w-0.5 h-4 bg-gray-900"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Caption */}
                    <p className="text-center text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
                        Deep wheel cleaning and decontamination restores factory finish.
                    </p>
                </div>
            </div>
        </section>
    );
}
