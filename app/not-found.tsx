import Link from "next/link";
import { Car } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white text-center p-6">
            {/* Icon */}
            <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center mb-8">
                <Car className="w-12 h-12 text-brand" />
            </div>

            {/* 404 Header */}
            <h1 className="text-8xl font-bold text-brand mb-2">404</h1>

            {/* Branded Message */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Wrong Turn?
            </h2>
            <p className="text-gray-600 mb-8 max-w-md text-lg">
                Looks like this page took a detour. Let's get you back to the garage.
            </p>

            {/* CTA Button */}
            <Link
                href="/"
                className="bg-brand hover:bg-brand-dark text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
                Return to Home
            </Link>

            {/* Footer */}
            <p className="mt-12 text-sm text-gray-400">
                Need help? <a href="tel:+12898856646" className="text-brand hover:underline">Call us</a>
            </p>
        </div>
    );
}
