"use client";

import { useState } from "react";
import { Smartphone } from "lucide-react";
import Link from "next/link";

export default function VibrationTester() {
    const [duration, setDuration] = useState(200);

    const vibrate = (pattern: number | number[]) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                        <div style={{ marginBottom: 24, padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
                            <Smartphone size={48} color="white" style={{ marginBottom: 16 }} />
                            <div style={{ color: '#9ca3af' }}>Works only on devices with vibration hardware (e.g. phones).</div>
                        </div>

                        <div style={{ marginBottom: 32 }}>
                            <label style={{ display: 'block', marginBottom: 12, color: '#9ca3af', fontSize: 13 }}>Duration (ms): {duration}</label>
                            <input type="range" min="50" max="2000" step="50" value={duration} onChange={e => setDuration(Number(e.target.value))} style={{ width: '100%' }} />
                        </div>

                        <div style={{ display: 'grid', gap: 16 }}>
                            <button onClick={() => vibrate(duration)} className="btn-primary" style={{ padding: 20 }}>
                                Vibrate Once
                            </button>
                            <button onClick={() => vibrate([200, 100, 200, 100, 200])} className="btn-secondary" style={{ padding: 20 }}>
                                Pulse Pattern
                            </button>
                            <button onClick={() => vibrate([500, 100, 500, 100, 1000])} className="btn-secondary" style={{ padding: 20 }}>
                                Long Pulse
                            </button>
                            <button onClick={() => vibrate(0)} style={{ padding: 20, borderRadius: 12, background: '#ef4444', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                                Stop
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
