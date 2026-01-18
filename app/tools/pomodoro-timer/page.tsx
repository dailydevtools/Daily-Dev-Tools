"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";

export default function PomodoroTimer() {
    const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Constants
    const MODES = {
        work: { label: 'Focus Time', minutes: 25, color: '#f97316' },
        short: { label: 'Short Break', minutes: 5, color: '#22c55e' },
        long: { label: 'Long Break', minutes: 15, color: '#3b82f6' }
    };

    useEffect(() => {
        setTimeLeft(MODES[mode].minutes * 60);
        setIsActive(false);
    }, [mode]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (soundEnabled) playBeep();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, soundEnabled]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(MODES[mode].minutes * 60);
    };

    const playBeep = () => {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = ((MODES[mode].minutes * 60 - timeLeft) / (MODES[mode].minutes * 60)) * 100;

    return (
        <div style={{ position: 'relative', minHeight: '100vh', transition: 'background 0.5s' }}>
            {/* Ambient Backlight based on mode */}
            <div style={{
                position: 'fixed', inset: 0,
                background: `radial-gradient(circle at 50% 50%, ${MODES[mode].color}20 0%, transparent 60%)`,
                pointerEvents: 'none', zIndex: 0
            }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40 }}>
                        {(Object.keys(MODES) as Array<keyof typeof MODES>).map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className="glass"
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: 100,
                                    border: `1px solid ${mode === m ? MODES[m].color : 'rgba(255,255,255,0.1)'}`,
                                    color: mode === m ? 'white' : '#9ca3af',
                                    background: mode === m ? `${MODES[m].color}20` : 'transparent',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                {MODES[m].label}
                            </button>
                        ))}
                    </div>

                    <div className="glass-card" style={{ padding: '60px 20px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ fontSize: '120px', fontWeight: 'bold', color: 'white', fontFamily: 'monospace', lineHeight: 1 }}>
                            {formatTime(timeLeft)}
                        </div>

                        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 20 }}>
                            <button onClick={toggleTimer} className="btn-primary" style={{ width: 140, height: 56, fontSize: 18 }}>
                                {isActive ? <Pause /> : <Play />}
                                {isActive ? 'Pause' : 'Start'}
                            </button>
                            <button onClick={resetTimer} className="btn-secondary" style={{ width: 56, height: 56, padding: 0 }}>
                                <RotateCcw />
                            </button>
                        </div>

                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}
                        >
                            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        </button>

                        {/* Progress Bar Bottom */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'rgba(255,255,255,0.1)' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: MODES[mode].color, transition: 'width 1s linear' }} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
