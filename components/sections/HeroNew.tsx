import Image from "next/image";
import Link from "next/link";

export default function HeroNew() {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* LEFT: Content */}
                    <div className="space-y-8">
                        {/* Eyebrow */}
                        <p className="text-sm uppercase tracking-widest text-gray-400 font-semibold">
                            Real Results. Real Cars.
                        </p>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-100 leading-tight">
                            Precision Auto Detailing, Done Right.
                        </h1>

                        {/* Subtext */}
                        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
                            Professional mobile detailing with showroom-level results.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/gallery"
                                className="bg-brand hover:bg-brand-dark text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg text-center"
                            >
                                View Our Work
                            </Link>
                            <Link
                                href="/#contact"
                                className="border-2 border-gray-100 hover:bg-gray-100 hover:text-gray-900 text-gray-100 px-8 py-4 rounded-lg font-semibold transition-all text-center"
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: Image */}
                    <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/gallery/BMW.JPG"
                            alt="Professional BMW detailing result"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
