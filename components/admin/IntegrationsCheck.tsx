"use client";
import { useState } from "react";
import { testCalendarConnection } from "@/app/actions";

export default function IntegrationsCheck() {
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const runTest = async () => {
        setLoading(true);
        const res = await testCalendarConnection();
        setMsg(res.success ? "✅ Connection Successful!" : "❌ " + res.message);
        setLoading(false);
    };

    return (
        <div className="mb-8 p-6 bg-white rounded-xl shadow border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Integrations</h2>
                <p className="text-gray-500 text-sm">Check connection to Google Calendar</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                {msg && (
                    <span className={`font-medium px-4 py-2 rounded-lg text-sm ${msg.includes("Success") || msg.includes("Online")
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                        {msg}
                    </span>
                )}
                <button
                    onClick={runTest}
                    disabled={loading}
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition disabled:opacity-50 shadow-sm"
                >
                    {loading ? "Testing..." : "Test Calendar Connection"}
                </button>
            </div>
        </div>
    );
}
