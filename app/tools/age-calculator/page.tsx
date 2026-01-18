"use client";

import { useState } from "react";
import { Calendar, Cake } from "lucide-react";
import Link from "next/link";

export default function AgeCalculator() {
    const [dob, setDob] = useState("");

    const calc = () => {
        if (!dob) return null;
        const start = new Date(dob);
        const now = new Date();

        if (isNaN(start.getTime())) return null;

        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        let days = now.getDate() - start.getDate();

        if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Next Bday
        const nextBday = new Date(now.getFullYear(), start.getMonth(), start.getDate());
        if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
        const diffTime = Math.abs(nextBday.getTime() - now.getTime());
        const daysToBday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return { years, months, days, daysToBday };
    };

    const res = calc();

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>


            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                        <div style={{ marginBottom: 32 }}>
                            <label style={{ display: 'block', marginBottom: 12, color: '#9ca3af', fontSize: 13 }}>Date of Birth</label>
                            <input
                                type="date" value={dob} onChange={e => setDob(e.target.value)}
                                className="input-field"
                                style={{ width: '100%', padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18, textAlign: 'center' }}
                            />
                        </div>

                        {res && (
                            <div style={{ display: 'grid', gap: 24 }}>
                                <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16 }}>
                                    <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Age</div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 12 }}>
                                        <span style={{ fontSize: 48, fontWeight: 700, color: 'white' }}>{res.years}</span>
                                        <span style={{ fontSize: 16, color: '#9ca3af' }}>years</span>
                                    </div>
                                    <div style={{ color: '#9ca3af', marginTop: 8 }}>
                                        {res.months} months, {res.days} days
                                    </div>
                                </div>

                                <div style={{ padding: 24, background: 'rgba(251, 146, 60, 0.1)', borderRadius: 16, border: '1px solid rgba(251, 146, 60, 0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: '#fb923c', marginBottom: 8 }}>
                                        <Cake size={20} /> Next Birthday
                                    </div>
                                    <div style={{ fontSize: 24, fontWeight: 700, color: '#fb923c' }}>
                                        {res.daysToBday} days
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
