"use client";

import { useState } from "react";
import { Fuel } from "lucide-react";
import Link from "next/link";

export default function FuelCalculator() {
    const [distance, setDistance] = useState("100");
    const [efficiency, setEfficiency] = useState("30"); // MPG
    const [price, setPrice] = useState("3.50"); // per gallon

    const dist = Number(distance);
    const eff = Number(efficiency);
    const p = Number(price);

    const total = (dist && eff) ? (dist / eff) * p : 0;

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Distance (miles/km)</label>
                                <input
                                    type="number" value={distance} onChange={e => setDistance(e.target.value)}
                                    className="input-field" placeholder="100"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Efficiency (MPG or km/L)</label>
                                <input
                                    type="number" value={efficiency} onChange={e => setEfficiency(e.target.value)}
                                    className="input-field" placeholder="30"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Fuel Price ($)</label>
                                <input
                                    type="number" value={price} onChange={e => setPrice(e.target.value)}
                                    className="input-field" placeholder="3.50"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                        </div>

                        <div style={{ padding: 40, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>Estimated Fuel Cost</div>
                            <div style={{ fontSize: 48, fontWeight: 700, color: '#fb923c' }}>${total.toFixed(2)}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
