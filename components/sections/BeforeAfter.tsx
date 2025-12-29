import ComparisonSlider from "@/components/ui/ComparisonSlider";

export default function BeforeAfter() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Real Results</h2>
                    <h3 className="text-3xl font-semibold text-gray-900 tracking-tight">See The Difference</h3>
                    <p className="text-gray-500 mt-4 text-sm leading-relaxed max-w-2xl mx-auto">
                        Drag the slider to see how we transform vehicles from dirty to showroom ready.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Points to the images saved in Step 1 */}
                    <ComparisonSlider
                        beforeImage="/mercedes-before.jpg"
                        afterImage="/mercedes-after.jpg"
                        alt="Wheel Transformation"
                    />
                </div>
            </div>
        </section>
    );
}
