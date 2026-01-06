import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function BookingConfirmation() {
    return (
        <main className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md text-center">
                {/* Green Checkmark */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                    Booking Request Received!
                </h1>

                {/* Subtext */}
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Thank you. We have received your request. We will contact you shortly to confirm the details.
                </p>

                {/* Back to Home Button */}
                <Link href="/">
                    <button className="bg-brand hover:bg-brand-dark text-white font-bold px-8 py-3 rounded-lg transition-all shadow-md">
                        Return to Home
                    </button>
                </Link>
            </div>
        </main>
    );
}
