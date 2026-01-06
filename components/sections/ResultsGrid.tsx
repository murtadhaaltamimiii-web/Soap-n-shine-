import Image from "next/image";

const results = [
    {
        image: "/gallery/Benz_After.JPG",
        caption: "Full Exterior Detail"
    },
    {
        image: "/gallery/Honda_1.JPG",
        caption: "Exterior Refresh"
    }
];

export default function ResultsGrid() {
    return (
        <section className="py-24 bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100 tracking-tight">
                        Finished Results
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {results.map((result, index) => (
                        <div key={index} className="group">
                            {/* Image Container */}
                            <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl mb-4">
                                <Image
                                    src={result.image}
                                    alt={result.caption}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Caption */}
                            <p className="text-lg font-semibold text-gray-300 text-center">
                                {result.caption}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
