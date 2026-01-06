import Image from "next/image";
import Link from "next/link";

export default function HeroLight() {
    return (
        <section className="relative bg-brand py-20 sm:py-32 lg:py-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center space-y-8">
                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
                        Our Work Speaks for Itself
                    </h1>

                    {/* Subtext */}
                    <p className="text-xl sm:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                        Professional mobile detailing with showroom-level results across the Greater Toronto Area.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link
                            href="/gallery"
                            className="bg-white hover:bg-gray-100 text-brand px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg text-center"
                        >
                            View Gallery
                        </Link>
                        <Link
                            href="/#contact"
                            className="border-2 border-white hover:bg-white hover:text-brand text-white px-8 py-4 rounded-lg font-semibold transition-all text-center"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
