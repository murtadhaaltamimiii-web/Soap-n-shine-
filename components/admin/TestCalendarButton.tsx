"use client";

import { useState } from "react";
import { testCalendarConnection } from "@/app/actions";

export default function TestCalendarButton() {
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const runTest = async () => {
        setLoading(true);
        const res = await testCalendarConnection();
        setMsg(res.success ? "✅ Success! Check Calendar." : "❌ Error: " + res.message);
        setLoading(false);
    };

    return (
        <div className="mb-8 p-6 bg-white rounded-xl shadow border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Integrations Check</h2>
            <div className="flex items-center gap-4">
                <button
                    onClick={runTest}
                    disabled={loading}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition disabled:opacity-50"
                >
                    {loading ? "Testing..." : "Test Calendar Connection"}
                </button>
                {msg && (
                    <span className={`font-medium ${msg.includes("Success") ? "text-green-600" : "text-red-600"}`}>
                        {msg}
                    </span>
                )}
            </div>
        </div>
    );
}
