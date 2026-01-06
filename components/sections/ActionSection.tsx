import Image from "next/image";

export default function ActionSection() {
    return (
        <section className="py-24 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100 tracking-tight mb-4">
                        In Action
                    </h2>
                    <p className="text-lg text-gray-300">
                        Attention to detail at every step.
                    </p>
                </div>

                {/* Centered Image */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative h-[400px] sm:h-[500px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/gallery/Me.JPG"
                            alt="Professional detailing in action"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
