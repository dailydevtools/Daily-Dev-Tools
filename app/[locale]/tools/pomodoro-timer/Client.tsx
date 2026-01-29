"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Clock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto text-center">

                    <ToolPageHeader
                        title={tTools('pomodoro-timer.name')}
                        description={tTools('pomodoro-timer.description')}
                        icon={<ToolIcon name="Timer" size={32} />}
                    />

                    <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-2">
                        {(Object.keys(MODES) as Array<keyof typeof MODES>).map((m) => (
                            <LiquidButton
                                key={m}
                                onClick={() => setMode(m)}
                                variant={mode === m ? "primary" : "ghost"}
                                className={`rounded-full h-11 px-6 transition-all ${mode === m ? '' : 'border border-[var(--border-color)] text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                                style={mode === m ? { backgroundColor: MODES[m].color, borderColor: MODES[m].color } : {}}
                            >
                                {MODES[m].label}
                            </LiquidButton>
                        ))}
                    </div>

                    <LiquidCard className="py-16 px-5 relative overflow-hidden text-center">
                        <div className="text-[clamp(60px,15vw,120px)] font-bold text-[var(--foreground)] font-mono leading-none tracking-tight transition-colors" style={{ color: isActive ? MODES[mode].color : 'var(--foreground)' }}>
                            {formatTime(timeLeft)}
                        </div>

                        <div className="mt-10 flex justify-center gap-5">
                            <LiquidButton onClick={toggleTimer} className="w-[140px] h-14 text-lg gap-3" style={isActive ? { backgroundColor: MODES[mode].color, borderColor: MODES[mode].color } : {}}>
                                {isActive ? <Pause size={24} /> : <Play size={24} />}
                                {isActive ? t('PomodoroTimer.pause') : t('PomodoroTimer.start')}
                            </LiquidButton>
                            <LiquidButton onClick={resetTimer} variant="ghost" className="w-14 h-14 p-0 rounded-xl border border-[var(--border-color)] text-[var(--muted-text)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]">
                                <RotateCcw size={24} />
                            </LiquidButton>
                        </div>

                        <LiquidButton
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            variant="ghost"
                            className="absolute top-5 right-5 h-auto w-auto p-2 text-[var(--muted-text)] hover:text-[var(--foreground)]"
                        >
                            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        </LiquidButton>

                        {/* Progress Bar Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-100 dark:bg-white/5">
                            <div
                                style={{ width: `${progress}%`, background: MODES[mode].color }}
                                className="h-full transition-[width] duration-1000 linear"
                            />
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
