"use client";

import Image from "next/image";
import { useState } from "react";

export default function ComparisonSliderLight() {
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
        <section className="py-20 sm:py-24 lg:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                        See the Difference
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Drag the slider to see the transformation
                    </p>
                </div>

                {/* Slider Container */}
                <div className="max-w-4xl mx-auto">
                    <div
                        className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl cursor-ew-resize select-none bg-white"
                        onMouseMove={handleMove}
                        onTouchMove={handleMove}
                    >
                        {/* Before Image */}
                        <div className="absolute inset-0">
                            <Image
                                src="/gallery/Tesla_before.JPG"
                                alt="Before detailing"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-gray-900 text-sm font-semibold shadow">
                                Before
                            </div>
                        </div>

                        {/* After Image */}
                        <div
                            className="absolute inset-0"
                            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                        >
                            <Image
                                src="/gallery/Tesla_after.JPG"
                                alt="After detailing"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-gray-900 text-sm font-semibold shadow">
                                After
                            </div>
                        </div>

                        {/* Slider Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-brand cursor-ew-resize"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-brand rounded-full shadow-lg flex items-center justify-center">
                                <div className="flex gap-0.5">
                                    <div className="w-0.5 h-4 bg-white"></div>
                                    <div className="w-0.5 h-4 bg-white"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Caption */}
                    <p className="text-center text-gray-600 text-base mt-6">
                        Professional wheel cleaning and decontamination
                    </p>
                </div>
            </div>
        </section>
    );
}
