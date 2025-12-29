import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const reviews = [
    {
        name: "Sarah Jenkins",
        date: "2 weeks ago",
        text: "Absolutely incredible service. They came to my office in Milton and detailed my SUV while I worked. It looks brand new! Highly recommend for busy professionals.",
        stars: 5,
    },
    {
        name: "Michael Chen",
        date: "1 month ago",
        text: "I was skeptical about mobile detailing, but Soap n Shine blew me away. The clay bar treatment removed grit I didn't even know was there. Worth every penny.",
        stars: 5,
    },
    {
        name: "David Ross",
        date: "3 days ago",
        text: "Best detailer in the GTA. They brought their own water and power, cleaned my truck in the driveway, and left zero mess. A+ professionalism.",
        stars: 5,
    },
];

export default function Reviews() {
    // PASTE YOUR REAL GOOGLE MAPS LINK HERE
    const googleReviewLink = "https://www.google.com/maps";

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* HEADER WITH GOOGLE BADGE */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="flex items-center gap-2 mb-4 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                            alt="Google"
                            width={20}
                            height={20}
                        />
                        <span className="text-sm font-bold text-gray-700">5.0 Star Customer Rating</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Milton&apos;s Most Trusted Detailers</h2>
                    <p className="text-gray-500 max-w-2xl">
                        Join hundreds of happy car owners in the GTA who trust Soap n Shine with their vehicles.
                    </p>
                </div>

                {/* REVIEWS GRID */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-1 mb-4 text-yellow-400">
                                {[...Array(review.stars)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed mb-6">&quot;{review.text}&quot;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{review.name}</p>
                                    <p className="text-xs text-gray-400">{review.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CALL TO ACTION */}
                <div className="mt-16 text-center">
                    <Link
                        href={googleReviewLink}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition"
                    >
                        Read more reviews on Google Map <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}