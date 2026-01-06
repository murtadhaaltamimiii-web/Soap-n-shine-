import Link from "next/link";

export const metadata = {
    title: "Privacy Policy & Terms of Service | Soap n Shine",
    description: "Privacy Policy and Terms of Service for Soap n Shine Mobile Detailing",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white py-16 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy & Terms of Service</h1>
                    <p className="text-gray-500">Last updated: January 2026</p>
                </div>

                {/* Privacy Policy Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Privacy Policy</h2>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Information We Collect</h3>
                            <p>When you book a service with Soap n Shine, we collect the following information:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                <li>Full Name</li>
                                <li>Phone Number</li>
                                <li>Service Address</li>
                                <li>Vehicle Type and Details</li>
                                <li>Service Preferences and Notes</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">How We Use Your Information</h3>
                            <p>Your information is used exclusively for:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                <li>Scheduling and delivering our detailing services</li>
                                <li>Sending appointment confirmations and reminders via SMS or email</li>
                                <li>Communicating about service updates or changes</li>
                                <li>Improving our service quality</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-brand p-4 rounded-r-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">📱 SMS Consent</h3>
                            <p className="font-medium">
                                By providing your phone number, you agree to receive text messages regarding your appointment,
                                including confirmations, reminders, and service updates. Message and data rates may apply.
                            </p>
                            <p className="mt-2 text-gray-600">
                                <strong>To opt out:</strong> Reply STOP to any message to unsubscribe from future SMS communications.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Third-Party Services</h3>
                            <p>
                                We use Google Calendar to manage scheduling. Your appointment details (name, date, time, address)
                                are shared with Google for this purpose only. <strong>We never sell your personal information to third parties.</strong>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Security</h3>
                            <p>
                                We implement appropriate security measures to protect your personal information.
                                Your data is stored securely and is only accessible to authorized personnel.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Terms of Service Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Terms of Service</h2>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Requirements</h3>
                            <p>To ensure we can provide our services effectively:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                <li><strong>Water Access:</strong> Customer must provide access to a standard water spigot within 100 feet of the driveway.</li>
                                <li><strong>Electrical Outlet:</strong> Customer must provide access to an electrical outlet within 100 feet of the vehicle.</li>
                                <li><strong>Vehicle Access:</strong> The vehicle must be accessible and unlocked at the scheduled time.</li>
                            </ul>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">⚠️ Cancellation Policy</h3>
                            <p>
                                <strong>Cancellations made less than 24 hours in advance may be subject to a cancellation fee.</strong>
                                We understand that emergencies happen—please contact us as soon as possible if you need to reschedule.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Liability Disclaimer</h3>
                            <p>
                                Soap n Shine exercises the utmost care when servicing your vehicle. However, we are not responsible for:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                <li>Pre-existing damage, scratches, or imperfections</li>
                                <li>Damage caused by loose parts, decals, or aftermarket accessories</li>
                                <li>Items left inside the vehicle</li>
                                <li>Weather-related damage occurring after service completion</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment</h3>
                            <p>
                                Payment is due upon completion of service. We accept cash, credit/debit cards, and e-transfer.
                                Prices are subject to change based on vehicle condition and additional services requested.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Satisfaction Guarantee</h3>
                            <p>
                                Your satisfaction is our priority. If you're not happy with any aspect of our service,
                                please contact us within 24 hours and we'll make it right.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-gray-50 p-6 rounded-xl text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions?</h3>
                    <p className="text-gray-600 mb-4">
                        If you have any questions about our Privacy Policy or Terms of Service, please contact us.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-block bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-2 rounded-lg transition"
                    >
                        Contact Us
                    </Link>
                </section>

                {/* Back to Home */}
                <div className="mt-12 text-center">
                    <Link href="/" className="text-gray-500 hover:text-brand transition text-sm">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
