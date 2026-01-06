import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const reviews = [
    {
        name: "Hala Issa",
        date: "5 months ago",
        text: "My car looks incredible, inside and out! I'm so impressed with the two young men who came to my house to detail it. They were professional, punctual, and meticulous. They worked so hard and didn't miss a single spot. My car hasn't looked this good since I drove it off the lot.",
        stars: 5,
    },
    {
        name: "Ru",
        date: "3 months ago",
        text: "Would definitely recommend for anyone who is interested in a thorough detailing service. They went over and beyond... Especially for that price point? Absolutely incredible and definitely top notch stuff. My truck was used for construction... it was in dire need for a detailing service.",
        stars: 5,
    },
    {
        name: "Jahniya Castillo",
        date: "4 months ago",
        text: "Soap N Shine did an amazing job on my car! The attention to detail was unreal. every surface was spotless, and it looked better than when I bought it. Highly recommend for anyone who wants their car looking brand new",
        stars: 5,
    },
];

export default function Reviews() {
    // PASTE YOUR REAL GOOGLE MAPS LINK HERE
    const googleReviewLink = "https://g.page/r/CQs6MN717BKfEBM/review";

    return (
        <section id="reviews" className="py-20 sm:py-24 lg:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* HEADER WITH GOOGLE BADGE */}
                <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-3xl mx-auto space-y-4">
                    <div className="flex items-center gap-2 bg-brand-light px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-brand-light">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                            alt="Google"
                            width={20}
                            height={20}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <span className="text-xs sm:text-sm font-bold text-brand-dark">5.0 Star Customer Rating</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">The GTA&apos;s Most Trusted Detailers</h2>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                        Join hundreds of happy car owners in the GTA who trust Soap n Shine with their vehicles.
                    </p>
                </div>

                {/* REVIEWS GRID */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200">
                            <div className="flex items-center gap-1 mb-4 sm:mb-5 text-yellow-400">
                                {[...Array(review.stars)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-base leading-relaxed mb-6">&quot;{review.text}&quot;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-light rounded-full flex items-center justify-center text-brand-dark font-bold text-sm sm:text-base flex-shrink-0">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm sm:text-base font-bold text-gray-900">{review.name}</p>
                                    <p className="text-xs sm:text-sm text-gray-500">{review.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CALL TO ACTION */}
                <div className="text-center">
                    <Link
                        href={googleReviewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-brand transition-colors duration-200"
                    >
                        Read more reviews on Google Maps <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}