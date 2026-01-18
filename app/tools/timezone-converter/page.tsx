"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import Link from "next/link";

export default function TimezoneConverter() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        const now = new Date();
        setDate(now.toISOString().split('T')[0]);
        setTime(now.toTimeString().split(' ')[0].substring(0, 5));
    }, []);

    const getTimes = () => {
        if (!date || !time) return [];
        const d = new Date(`${date}T${time}:00`);

        const zones = [
            { name: "UTC", zone: "UTC" },
            { name: "New York (EST/EDT)", zone: "America/New_York" },
            { name: "Los Angeles (PST/PDT)", zone: "America/Los_Angeles" },
            { name: "London (GMT/BST)", zone: "Europe/London" },
            { name: "Paris (CET/CEST)", zone: "Europe/Paris" },
            { name: "Tokyo (JST)", zone: "Asia/Tokyo" },
            { name: "Sydney (AEST/AEDT)", zone: "Australia/Sydney" },
            { name: "Dubai (GST)", zone: "Asia/Dubai" },
            { name: "India (IST)", zone: "Asia/Kolkata" },
        ];

        return zones.map(z => {
            try {
                return {
                    name: z.name,
                    time: d.toLocaleString('en-US', { timeZone: z.zone, dateStyle: 'medium', timeStyle: 'short' })
                };
            } catch (e) { return { name: z.name, time: "Invalid" }; }
        });
    };

    const results = getTimes();

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>

                        <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Date</label>
                                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Time (Local)</label>
                                <input type="time" value={time} onChange={e => setTime(e.target.value)} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {results.map(r => (
                                <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', padding: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
                                    <span style={{ color: '#9ca3af' }}>{r.name}</span>
                                    <span style={{ color: 'white', fontWeight: 600 }}>{r.time}</span>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
