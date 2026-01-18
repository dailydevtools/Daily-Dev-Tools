"use client";

import { useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import Link from "next/link";

interface DateResult {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalHours: number;
    totalWeeks: number;
}

export default function DateDiff() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [result, setResult] = useState<DateResult | null>(null);

    const calculate = () => {
        if (!start || !end) return;
        const d1 = new Date(start);
        const d2 = new Date(end);

        // Ensure d2 > d1
        const diff = Math.abs(d2.getTime() - d1.getTime());

        // Breakdown
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        // Y/M/D approx
        let tempD1 = new Date(d1 < d2 ? d1 : d2);
        let tempD2 = new Date(d1 < d2 ? d2 : d1);

        let years = tempD2.getFullYear() - tempD1.getFullYear();
        let months = tempD2.getMonth() - tempD1.getMonth();
        let dateDiff = tempD2.getDate() - tempD1.getDate();

        if (dateDiff < 0) {
            months--;
            dateDiff += new Date(tempD2.getFullYear(), tempD2.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        setResult({ years, months, days: dateDiff, totalDays: days, totalHours: hours, totalWeeks: weeks });
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center', marginBottom: 24 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Start Date</label>
                                <input type="date" value={start} onChange={e => setStart(e.target.value)} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 16 }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>End Date</label>
                                <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 16 }} />
                            </div>
                        </div>
                        <button onClick={calculate} className="btn-primary" style={{ padding: '12px 32px' }}>Calculate Difference</button>
                    </div>

                    {result && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div className="glass-card" style={{ padding: 32, gridColumn: 'span 2', textAlign: 'center', background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(250, 204, 21, 0.1) 100%)' }}>
                                <div style={{ fontSize: 13, color: '#fb923c', marginBottom: 4 }}>Duration</div>
                                <div style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>
                                    {result.years > 0 ? `${result.years} years, ` : ''}
                                    {result.months > 0 ? `${result.months} months, ` : ''}
                                    {result.days} days
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: 20, textAlign: 'center' }}>
                                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Total Days</div>
                                <div style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{result.totalDays.toLocaleString()}</div>
                            </div>
                            <div className="glass-card" style={{ padding: 20, textAlign: 'center' }}>
                                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Total Weeks</div>
                                <div style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{result.totalWeeks.toLocaleString()}</div>
                            </div>
                            <div className="glass-card" style={{ padding: 20, textAlign: 'center' }}>
                                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Total Hours</div>
                                <div style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{result.totalHours.toLocaleString()}</div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
