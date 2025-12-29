"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

interface ComparisonSliderProps {
    beforeImage: string;
    afterImage: string;
    alt: string;
}

export default function ComparisonSlider({ beforeImage, afterImage, alt }: ComparisonSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((event: MouseEvent | TouchEvent) => {
        if (!isResizing || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setSliderPosition((x / rect.width) * 100);
    }, [isResizing]);

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
        <div
            ref={containerRef}
            // Adjusted aspect ratio to better fit typical wheel photos, can be tweaked
            className="relative w-full aspect-square max-w-3xl mx-auto overflow-hidden rounded-xl cursor-ew-resize select-none border border-gray-200 shadow-2xl"
            onMouseDown={() => setIsResizing(true)}
            onTouchStart={() => setIsResizing(true)}
        >
            {/* AFTER IMAGE (Clean - Background) */}
            <Image
                src={afterImage}
                alt={`Clean ${alt}`}
                fill
                className="object-cover pointer-events-none select-none"
                priority
            />

            {/* BEFORE IMAGE (Dirty - Foreground with Clip Path) */}
            <div
                className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none select-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <Image
                    src={beforeImage}
                    alt={`Dirty ${alt}`}
                    fill
                    className="object-cover select-none"
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
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest pointer-events-none z-10">
                Before SNS
            </div>
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest pointer-events-none z-10">
                After SNS
            </div>
        </div>
    );
}
