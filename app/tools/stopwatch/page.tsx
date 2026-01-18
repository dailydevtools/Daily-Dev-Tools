"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";
import Link from "next/link";

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const timer = useRef<any>(null);

    useEffect(() => {
        if (running) {
            timer.current = setInterval(() => {
                setTime(t => t + 10);
            }, 10);
        } else {
            clearInterval(timer.current);
        }
        return () => clearInterval(timer.current);
    }, [running]);

    const format = (ms: number) => {
        const m = Math.floor(ms / 60000);
        const s = Math.floor((ms % 60000) / 1000);
        const cs = Math.floor((ms % 1000) / 10);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
    };

    const lap = () => {
        setLaps([time, ...laps]);
    };

    const reset = () => {
        setRunning(false);
        setTime(0);
        setLaps([]);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>

                        <div style={{ fontSize: 96, fontWeight: 800, color: 'white', fontFamily: 'monospace', marginBottom: 40 }}>
                            {format(time)}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 40 }}>
                            <button
                                onClick={() => setRunning(!running)}
                                style={{
                                    width: 64, height: 64, borderRadius: 32,
                                    background: running ? '#ef4444' : '#22c55e', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'
                                }}
                            >
                                {running ? <Pause size={24} /> : <Play size={24} />}
                            </button>

                            <button
                                onClick={lap} disabled={!running}
                                style={{
                                    width: 64, height: 64, borderRadius: 32,
                                    background: 'rgba(255,255,255,0.1)', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: running ? 'pointer' : 'not-allowed', opacity: running ? 1 : 0.5
                                }}
                            >
                                <Flag size={24} />
                            </button>

                            <button
                                onClick={reset}
                                style={{
                                    width: 64, height: 64, borderRadius: 32,
                                    background: 'rgba(255,255,255,0.1)', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'
                                }}
                            >
                                <RotateCcw size={24} />
                            </button>
                        </div>

                        {laps.length > 0 && (
                            <div style={{ textAlign: 'left', maxHeight: 300, overflowY: 'auto' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 12 }}>Laps</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {laps.map((l, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                                            <span style={{ color: '#9ca3af' }}>Lap {laps.length - i}</span>
                                            <span style={{ color: 'white', fontFamily: 'monospace' }}>{format(l)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
