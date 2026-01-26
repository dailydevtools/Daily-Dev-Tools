"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Clock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

export default function PomodoroTimerClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Constants
    const MODES = {
        work: { label: t('PomodoroTimer.work'), minutes: 25, color: '#f97316' },
        short: { label: t('PomodoroTimer.shortBreak'), minutes: 5, color: '#22c55e' },
        long: { label: t('PomodoroTimer.longBreak'), minutes: 15, color: '#3b82f6' }
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
        <main className="relative min-h-screen transition-colors duration-500">
            {/* Ambient Backlight based on mode */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${MODES[mode].color}20 0%, transparent 60%)`,
                }}
            />

            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto text-center">

                    <ToolPageHeader
                        title={tTools('pomodoro-timer.name')}
                        description={tTools('pomodoro-timer.description')}
                        icon={<ToolIcon name="Timer" size={32} />}
                    />

                    <div className="flex justify-center gap-3 mb-10">
                        {(Object.keys(MODES) as Array<keyof typeof MODES>).map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`glass px-6 py-3 rounded-full border cursor-pointer font-semibold transition-colors duration-300 ${mode === m
                                    ? 'text-white'
                                    : 'border-white/10 text-gray-400 bg-transparent'
                                    }`}
                                style={mode === m ? {
                                    borderColor: MODES[m].color,
                                    backgroundColor: `${MODES[m].color}33`, // 20% opacity using hex alpha
                                } : {}}
                            >
                                {MODES[m].label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 py-16 px-5 relative overflow-hidden">
                        <div className="text-[120px] font-bold text-white font-mono leading-none tracking-tight">
                            {formatTime(timeLeft)}
                        </div>

                        <div className="mt-10 flex justify-center gap-5">
                            <button onClick={toggleTimer} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] w-[140px] h-14 text-lg flex items-center justify-center gap-2">
                                {isActive ? <Pause size={24} /> : <Play size={24} />}
                                {isActive ? t('PomodoroTimer.pause') : t('PomodoroTimer.start')}
                            </button>
                            <button onClick={resetTimer} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] w-14 h-14 p-0 flex items-center justify-center">
                                <RotateCcw size={24} />
                            </button>
                        </div>

                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="absolute top-5 right-5 bg-transparent border-none text-[#6b7280] cursor-pointer hover:text-white transition-colors"
                        >
                            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        </button>

                        {/* Progress Bar Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                            <div
                                style={{ width: `${progress}%`, background: MODES[mode].color }}
                                className="h-full transition-[width] duration-1000 linear"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
