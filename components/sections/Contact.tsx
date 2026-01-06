import { Phone, Mail } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-20 sm:py-24 lg:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* SECTION HEADER */}
                <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        Get In Touch
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                        Ready to restore your vehicle's showroom shine? Contact us today for a free quote.
                    </p>
                </div>

                {/* CONTACT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                    {/* PHONE CARD */}
                    <a
                        href="tel:+12898856646"
                        className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-light transition-all duration-300 ease-out group text-center"
                    >
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-light transition-colors">
                            <Phone className="w-8 h-8 text-brand" />
                        </div>

                        {/* Label */}
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                            Call Us
                        </h3>

                        {/* Phone Number */}
                        <p className="text-2xl font-bold text-brand mb-2">
                            (289) 885-6646
                        </p>

                        {/* Subtext */}
                        <p className="text-sm text-slate-600">
                            Mon-Sat: 8am - 6pm EST
                        </p>
                    </a>

                    {/* EMAIL CARD */}
                    <a
                        href="mailto:soapnshinemobiledetailing@gmail.com"
                        className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-light transition-all duration-300 ease-out group text-center"
                    >
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-light transition-colors">
                            <Mail className="w-8 h-8 text-brand" />
                        </div>

                        {/* Label */}
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                            Email Us
                        </h3>

                        {/* Email */}
                        <p className="text-lg font-semibold text-brand mb-2 break-words">
                            soapnshinemobiledetailing@gmail.com
                        </p>

                        {/* Subtext */}
                        <p className="text-sm text-slate-600">
                            We'll respond within 24 hours
                        </p>
                    </a>
                </div>

                {/* ADDITIONAL INFO */}
                <div className="text-center mt-12 sm:mt-16">
                    <p className="text-sm text-slate-500 mb-4">
                        Proudly serving the Greater Toronto Area
                    </p>
                    <p className="text-xs text-slate-400">
                        Mobile detailing • We come to you • Fully insured
                    </p>
                </div>
            </div>
        </section>
    );
}
