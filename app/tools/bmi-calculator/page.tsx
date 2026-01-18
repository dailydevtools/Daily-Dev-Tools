"use client";

import { useState } from "react";
import { Activity } from "lucide-react";
import Link from "next/link";

export default function BMICalculator() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState<number | null>(null);

    const calculate = () => {
        let w = parseFloat(weight);
        let h = parseFloat(height);
        if (!w || !h) return;

        if (unit === "imperial") {
            // lbs -> kg (0.453592)
            // inches -> meters (0.0254)
            // Actually standard formula: 703 * weight(lbs) / height(in)^2
            setBmi((703 * w) / (h * h));
        } else {
            // kg / m^2
            // input is often cm
            h = h / 100;
            setBmi(w / (h * h));
        }
    };

    const getStatus = (b: number) => {
        if (b < 18.5) return { text: "Underweight", color: "#3b82f6" };
        if (b < 25) return { text: "Normal Weight", color: "#22c55e" };
        if (b < 30) return { text: "Overweight", color: "#eab308" };
        return { text: "Obese", color: "#ef4444" };
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 12, display: 'flex', gap: 4 }}>
                                <button onClick={() => { setUnit("metric"); setBmi(null); setHeight(""); setWeight(""); }} style={{ padding: '8px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', background: unit === 'metric' ? '#fb923c' : 'transparent', color: unit === 'metric' ? 'black' : '#9ca3af', fontWeight: 500 }}>Metric (kg/cm)</button>
                                <button onClick={() => { setUnit("imperial"); setBmi(null); setHeight(""); setWeight(""); }} style={{ padding: '8px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', background: unit === 'imperial' ? '#fb923c' : 'transparent', color: unit === 'imperial' ? 'black' : '#9ca3af', fontWeight: 500 }}>Imperial (lbs/in)</button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                            <div style={{ textAlign: 'left' }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                                <input
                                    type="number"
                                    value={weight} onChange={e => setWeight(e.target.value)}
                                    onKeyUp={e => e.key === 'Enter' && calculate()}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
                                <input
                                    type="number"
                                    value={height} onChange={e => setHeight(e.target.value)}
                                    onKeyUp={e => e.key === 'Enter' && calculate()}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                                />
                            </div>
                        </div>

                        <button onClick={calculate} className="btn-primary" style={{ width: '100%', padding: 16, fontSize: 16 }}>Calculate BMI</button>
                    </div>

                    {bmi !== null && (
                        <div style={{ marginTop: 24, padding: 32, borderRadius: 24, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
                            <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 8 }}>Your BMI Score</div>
                            <div style={{ fontSize: 48, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>{bmi.toFixed(1)}</div>
                            <div style={{ fontSize: 20, fontWeight: 600, color: getStatus(bmi).color, marginBottom: 24 }}>
                                {getStatus(bmi).text}
                            </div>

                            <div style={{ height: 8, width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', left: 0, width: '18.5%', height: '100%', background: '#3b82f6' }} title="Underweight" />
                                <div style={{ position: 'absolute', left: '18.5%', width: '25%', height: '100%', background: '#22c55e' }} title="Normal" />
                                <div style={{ position: 'absolute', left: '43.5%', width: '20%', height: '100%', background: '#eab308' }} title="Overweight" />
                                <div style={{ position: 'absolute', left: '63.5%', width: '36.5%', height: '100%', background: '#ef4444' }} title="Obese" />
                                <div style={{ position: 'absolute', left: `Math.min(100, Math.max(0, ${(bmi / 40) * 100}))%`, top: -4, bottom: -4, width: 4, background: 'white', borderRadius: 2, boxShadow: '0 0 10px white' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6b7280', marginTop: 8 }}>
                                <span>0</span>
                                <span>18.5</span>
                                <span>25</span>
                                <span>30</span>
                                <span>40+</span>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
