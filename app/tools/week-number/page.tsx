"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function WeekNumber() {
    const [date, setDate] = useState("");
    const [week, setWeek] = useState(0);
    const [yearProgress, setYearProgress] = useState(0);

    useEffect(() => {
        // Default to today
        const t = new Date();
        setDate(t.toISOString().split('T')[0]);
    }, []);

    useEffect(() => {
        if (!date) return;
        const d = new Date(date);
        const w = getWeek(d);
        setWeek(w);

        const start = new Date(d.getFullYear(), 0, 1);
        const end = new Date(d.getFullYear() + 1, 0, 1);
        const prog = ((d.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
        setYearProgress(prog);
    }, [date]);

    const getWeek = (d: Date) => {
        // ISO 8601 week number
        const target = new Date(d.valueOf());
        const dayNr = (d.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        const firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                        <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 12 }}>Check Week Number for Date</div>
                        <input
                            type="date"
                            value={date} onChange={e => setDate(e.target.value)}
                            className="input-field"
                            style={{ padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 16, marginBottom: 32 }}
                        />

                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: 32, borderRadius: 24, marginBottom: 32 }}>
                            <div style={{ fontSize: 16, color: '#9ca3af', marginBottom: 4 }}>Week Number</div>
                            <div style={{ fontSize: 80, fontWeight: 800, color: '#fb923c', lineHeight: 1 }}>{week}</div>
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#9ca3af' }}>
                                <span>Year Progress</span>
                                <span>{yearProgress.toFixed(1)}%</span>
                            </div>
                            <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${yearProgress}%`, background: '#22c55e' }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
