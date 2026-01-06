import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                Could not find the requested resource.
            </p>
            <Link
                href="/"
                className="bg-brand hover:bg-brand-dark text-white font-bold py-3 px-6 rounded-xl transition"
            >
                Return Home
            </Link>
        </div>
    );
}
