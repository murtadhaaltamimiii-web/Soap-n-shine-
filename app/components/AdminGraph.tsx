"use client";
import { useState, useMemo } from "react";
import { Booking } from "@/types";

interface GraphProps {
    bookings: Partial<Booking>[];
}

export default function AdminGraph({ bookings }: GraphProps) {
    const [view, setView] = useState<"week" | "month" | "year">("week");
    const [focusedDate, setFocusedDate] = useState(new Date());

    // DATE HELPERS 
    const getStartOfWeek = (d: Date) => {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    // GENERATE BUCKETS 
    const getDataPoints = () => {
        const points = [];
        if (view === "week") {
            const start = getStartOfWeek(focusedDate);
            for (let i = 0; i < 7; i++) {
                const d = new Date(start);
                d.setDate(start.getDate() + i);
                points.push({ date: d, label: d.toLocaleDateString('en-US', { weekday: 'short' }) });
            }
        } else if (view === "month") {
            const year = focusedDate.getFullYear();
            const month = focusedDate.getMonth();
            const date = new Date(year, month, 1);
            while (date.getMonth() === month) {
                points.push({ date: new Date(date), label: date.getDate().toString() });
                date.setDate(date.getDate() + 1);
            }
        } else {
            const year = focusedDate.getFullYear();
            for (let i = 0; i < 12; i++) {
                const d = new Date(year, i, 1);
                points.push({ date: d, label: d.toLocaleDateString('en-US', { month: 'short' }), isMonth: true });
            }
        }
        return points;
    };

    // NAVIGATION 
    const handlePrev = () => {
        const newDate = new Date(focusedDate);
        if (view === "week") newDate.setDate(focusedDate.getDate() - 7);
        else if (view === "month") newDate.setMonth(focusedDate.getMonth() - 1);
        else newDate.setFullYear(focusedDate.getFullYear() - 1);
        setFocusedDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(focusedDate);
        if (view === "week") newDate.setDate(focusedDate.getDate() + 7);
        else if (view === "month") newDate.setMonth(focusedDate.getMonth() + 1);
        else newDate.setFullYear(focusedDate.getFullYear() + 1);
        setFocusedDate(newDate);
    };

    // DATA PROCESSING 
    const points = getDataPoints();

    const relevantBookings = useMemo(() => {
        const currentYear = focusedDate.getFullYear();
        const currentMonth = focusedDate.getMonth();

        return bookings.filter(b => {
            if (!b.requestedDate) return false;
            const [y, m, d] = b.requestedDate.split('-').map(Number);
            const bDate = new Date(y, m - 1, d);

            if (view === 'year') return bDate.getFullYear() === currentYear;
            if (view === 'month') return bDate.getMonth() === currentMonth && bDate.getFullYear() === currentYear;
            return true;
        });
    }, [bookings, view, focusedDate]);

    // STATS 
    const viewRevenue = relevantBookings
        .filter(b => b.status === "COMPLETED")
        .reduce((sum, b) => sum + (b.priceEstimate || 0), 0);

    const chartData = points.map((p) => {
        let total = 0;
        if (p.isMonth) {
            total = relevantBookings
                .filter(b => {
                    const [y, m] = (b.requestedDate || "").split('-').map(Number);
                    return (m - 1) === p.date.getMonth() && b.status === "COMPLETED";
                })
                .reduce((sum, b) => sum + (b.priceEstimate || 0), 0);
        } else {
            const y = p.date.getFullYear();
            const m = String(p.date.getMonth() + 1).padStart(2, '0');
            const d = String(p.date.getDate()).padStart(2, '0');
            const dateStr = `${y}-${m}-${d}`;
            total = bookings
                .filter(b => b.requestedDate === dateStr && b.status === "COMPLETED")
                .reduce((sum, b) => sum + (b.priceEstimate || 0), 0);
        }
        return { label: p.label, total };
    });

    const maxVal = Math.max(...chartData.map(d => d.total), 500);

    return (
        <div className="w-full">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">
                        {view}ly Overview
                    </h2>
                    <p className="text-3xl font-light text-gray-900 mt-2">
                        {focusedDate.toLocaleString('default', { month: view === 'year' ? undefined : 'long', year: 'numeric' })}
                    </p>
                </div>
                {/* STATS */}
                <div className="flex gap-8 text-right">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</p>
                        <p className="text-xl font-medium text-gray-900">${viewRevenue.toLocaleString()}</p>
                    </div>
                </div>
                {/* CONTROLS */}
                <div className="flex flex-col items-end gap-3">
                    <div className="flex bg-gray-100 p-1 rounded-md">
                        {(['week', 'month', 'year'] as const).map((v) => (
                            <button
                                key={v}
                                onClick={() => setView(v)}
                                className={`px-4 py-1.5 rounded-sm text-xs font-semibold transition-all capitalize ${view === v ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-1">
                        <button onClick={handlePrev} className="h-7 w-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs transition">←</button>
                        <button onClick={handleNext} className="h-7 w-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs transition">→</button>
                    </div>
                </div>
            </div>
            {/* CHART */}
            <div className="flex items-end gap-2 h-64 w-full">
                {chartData.map((data, i) => {
                    const height = Math.max(0, (data.total / maxVal) * 100);
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                            <div
                                className="w-full rounded-sm transition-all relative group"
                                style={{
                                    height: `${height}%`,
                                    backgroundColor: data.total > 0 ? '#111827' : '#f3f4f6',
                                    minHeight: '2px'
                                }}
                            >
                                {data.total > 0 && (
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg">
                                        ${data.total}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium tracking-tight">
                                {data.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
