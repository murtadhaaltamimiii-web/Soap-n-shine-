import Image from "next/image";
import Link from "next/link";

const gallery = [
    { image: "/gallery/BMW.JPG", caption: "BMW Full Detail" },
    { image: "/gallery/Benz_After.JPG", caption: "Mercedes Exterior" },
    { image: "/gallery/Honda_1.JPG", caption: "Honda Refresh" },
    { image: "/gallery/Tesla_interior.JPG", caption: "Tesla Interior" }
];

export default function GalleryGrid() {
    return (
        <section className="py-20 sm:py-24 lg:py-28 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                        Recent Work
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Professional detailing results from real clients across the GTA
                    </p>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {gallery.map((item, index) => (
                        <div key={index} className="group">
                            {/* Image Card */}
                            <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
                                <Image
                                    src={item.image}
                                    alt={item.caption}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Caption */}
                            <p className="text-center text-gray-700 font-medium mt-3">
                                {item.caption}
                            </p>
                        </div>
                    ))}
                </div>

                {/* View More CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-semibold transition-colors"
                    >
                        View Full Gallery →
                    </Link>
                </div>
            </div>
        </section>
    );
}
