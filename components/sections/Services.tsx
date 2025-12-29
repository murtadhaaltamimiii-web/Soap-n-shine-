export default function Services() {
    return (
        <section id="services" className="py-20 sm:py-24 lg:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* TRUST BADGE */}
                <div className="text-center">
                    <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-widest mb-6 sm:mb-8">Professional Mobile Detailing Across the Greater Toronto Area</p>
                    <div className="flex justify-center flex-wrap gap-6 sm:gap-8 lg:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simple Text Logos for Classy Look */}
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 hover:text-blue-600 transition-colors">Tesla</span>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 hover:text-blue-600 transition-colors">BMW</span>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 hover:text-blue-600 transition-colors">Mercedes-Benz</span>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 hover:text-blue-600 transition-colors">Audi</span>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 hover:text-blue-600 transition-colors">Porsche</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
