import Image from "next/image";

export const metadata = {
    title: "Gallery | Soap N Shine",
    description: "Browse our gallery of transformed vehicles. From foam cannon washes to deep interior cleans, our work speaks for itself.",
};

export default function GalleryPage() {
    // PRIVACY NOTE: License plates should be manually blurred before upload
    const galleryPairs = [
        // --- PAIR 1: Mercedes Exterior (Before & After) ---
        {
            before: {
                src: "/portfolio/IMG_8437.JPG",
                alt: "Mercedes A250 - Before Detail",
                blurPosition: "bottom-[42%] left-[40%] w-[22%] h-[12%]"
            },
            after: {
                src: "/portfolio/IMG_8436.JPG",
                alt: "Mercedes A250 - After Detail",
                blurPosition: "bottom-[42%] left-[40%] w-[22%] h-[12%]"
            },
            category: "Exterior Detailing"
        },
        // --- PAIR 2: Tesla Wheels (Before & After) ---
        {
            before: {
                src: "/portfolio/IMG_8433.JPG",
                alt: "Tesla Wheel - Before (Brake Dust)",
            },
            after: {
                src: "/portfolio/IMG_8434.JPG",
                alt: "Tesla Wheel - After (Protected & Shined)",
            },
            category: "Wheel Restoration"
        },
        // --- PAIR 3: Interior (Before & After) ---
        {
            before: {
                src: "/portfolio/IMG_8697.JPG",
                alt: "Interior - Before Deep Clean",
            },
            after: {
                src: "/portfolio/IMG_8435.JPG",
                alt: "White Leather Seat - After Restoration",
            },
            category: "Interior Detailing"
        },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Our Work Speaks for Itself
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl mx-auto">
                    See the transformation. Professional detailing that brings back the showroom feeling.
                </p>
            </section>

            {/* Before/After Grid */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {galleryPairs.map((pair, idx) => (
                        <>
                            {/* Before Image */}
                            <div key={`before-${idx}`} className="relative group rounded-xl overflow-hidden shadow-lg bg-white aspect-video">
                                <Image
                                    src={pair.before.src}
                                    alt={pair.before.alt}
                                    fill
                                    className="object-cover"
                                />
                                {/* License Plate Blur */}
                                {pair.before.blurPosition && (
                                    <div
                                        className={`absolute ${pair.before.blurPosition} bg-white/30 backdrop-blur-md rounded-sm pointer-events-none`}
                                        aria-hidden="true"
                                    />
                                )}
                                {/* Before Label */}
                                <span className="absolute top-4 left-4 bg-slate-900/90 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                                    Before
                                </span>
                                {/* Category on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">{pair.category}</span>
                                </div>
                            </div>

                            {/* After Image */}
                            <div key={`after-${idx}`} className="relative group rounded-xl overflow-hidden shadow-lg bg-white aspect-video">
                                <Image
                                    src={pair.after.src}
                                    alt={pair.after.alt}
                                    fill
                                    className="object-cover"
                                />
                                {/* License Plate Blur */}
                                {pair.after.blurPosition && (
                                    <div
                                        className={`absolute ${pair.after.blurPosition} bg-white/30 backdrop-blur-md rounded-sm pointer-events-none`}
                                        aria-hidden="true"
                                    />
                                )}
                                {/* After Label */}
                                <span className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                                    After
                                </span>
                                {/* Category on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">{pair.category}</span>
                                </div>
                            </div>
                        </>
                    ))}
                </div>

                {/* Privacy Note */}
                <div className="text-center py-8 mt-12 border-t border-gray-200">
                    <p className="text-sm text-slate-500 italic">
                        Note: For privacy, license plates are blurred in our gallery images.
                    </p>
                </div>
            </div>
        </main>
    );
}
