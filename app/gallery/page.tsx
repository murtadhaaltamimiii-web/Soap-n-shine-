import Image from "next/image";

export const metadata = {
    title: "Gallery | Soap N Shine",
    description: "Browse our gallery of transformed vehicles. From foam cannon washes to deep interior cleans, our work speaks for itself.",
};

export default function GalleryPage() {
    const galleryImages = [
        // --- PAIR 1: Mercedes Exterior (Before & After) ---
        {
            src: "/portfolio/IMG_8437.JPG",
            alt: "Mercedes A250 - Before (Road Grime)",
            category: "Exterior",
            // JUMP UP: Changed bottom from 22% to 42%
            blurPosition: "bottom-[42%] left-[40%] w-[22%] h-[12%]"
        },
        {
            src: "/portfolio/IMG_8436.JPG",
            alt: "Mercedes A250 - After (Showroom Shine)",
            category: "Exterior",
            // JUMP UP: Changed bottom from 22% to 42%
            blurPosition: "bottom-[42%] left-[40%] w-[22%] h-[12%]"
        },

        // --- PAIR 2: Tesla Wheels (Before & After) ---
        {
            src: "/portfolio/IMG_8433.JPG",
            alt: "Tesla Wheel - Brake Dust Removal",
            category: "Wheels"
        },
        {
            src: "/portfolio/IMG_8434.JPG",
            alt: "Tesla Wheel - Protected & Shined",
            category: "Wheels"
        },

        // --- The Rest ---
        // Note: Replaced missing IMG_8661 with IMG_8697 (Interior)
        {
            src: "/portfolio/IMG_8697.JPG",
            alt: "Interior Cockpit Deep Clean",
            category: "Interior"
        },
        {
            src: "/portfolio/IMG_8435.JPG",
            alt: "White Leather Seat Restoration",
            category: "Interior"
        },
        {
            src: "/portfolio/IMG_8916.JPG",
            alt: "Premium Foam Cannon Pre-Wash",
            category: "Exterior"
        },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Our Work Speaks for Itself
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
                    See the transformation. Professional detailing that brings back the showroom feeling.
                </p>
            </section>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {galleryImages.map((img, idx) => (
                        <div key={idx} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-lg bg-white mb-6">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* DYNAMIC PRIVACY BLUR OVERLAY */}
                            {img.blurPosition && (
                                <div
                                    className={`absolute ${img.blurPosition} bg-white/30 backdrop-blur-md rounded-sm pointer-events-none shadow-sm`}
                                    aria-hidden="true"
                                />
                            )}

                            {/* Hover Caption Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <div>
                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{img.category}</span>
                                    <h3 className="text-white font-bold text-lg mt-1">{img.alt}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
