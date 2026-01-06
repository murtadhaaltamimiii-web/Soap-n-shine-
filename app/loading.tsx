'use client';

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            {/* Spinning Tire Animation */}
            <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand animate-spin"></div>
                {/* Center hub */}
                <div className="absolute inset-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-brand rounded-full"></div>
                </div>
            </div>

            {/* Loading Text */}
            <p className="text-gray-500 font-medium text-sm tracking-wide uppercase animate-pulse">
                Loading...
            </p>
        </div>
    );
}
