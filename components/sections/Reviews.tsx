"use client";

const REVIEWS = [
    {
        name: "Alex M.",
        role: "BMW M3 Owner",
        text: "Absolutely incredible work. My M3 looks better than the day I drove it off the lot. The ceramic coating is a game changer.",
        stars: 5,
    },
    {
        name: "Sarah T.",
        role: "Range Rover Owner",
        text: "I was skeptical about mobile detailing, but Soap N Shine blew me away. Professional, on time, and my interior is spotless.",
        stars: 5,
    },
    {
        name: "David K.",
        role: "Tesla Model Y Owner",
        text: "Convenience is key for me. They came to my office, did the job, and left my car looking brand new. Highly recommend.",
        stars: 5,
    },
];

export default function Reviews() {
    return (
        <section id="reviews" className="py-24 bg-neutral-900 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-white mb-16">
                    What Our Clients Say
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {REVIEWS.map((review, i) => (
                        <div
                            key={i}
                            className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700 hover:border-blue-500 transition-colors"
                        >
                            <div className="flex gap-1 text-yellow-400 mb-4">
                                {[...Array(review.stars)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                "{review.text}"
                            </p>
                            <div>
                                <p className="font-bold text-white">{review.name}</p>
                                <p className="text-sm text-blue-400">{review.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}