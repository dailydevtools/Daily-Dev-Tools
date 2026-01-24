"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Flag, Timer } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function StopwatchClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
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
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">
                    <ToolPageHeader
                        title={tTools('stopwatch.name')}
                        description={tTools('stopwatch.description')}
                        icon={<Timer size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center">

                        <div className="text-8xl md:text-9xl font-bold text-white font-mono mb-10">
                            {format(time)}
                        </div>

                        <div className="flex justify-center gap-6 mb-10">
                            <button
                                onClick={() => setRunning(!running)}
                                className={`w-16 h-16 rounded-full flex items-center justify-center border-none cursor-pointer text-white transition-transform active:scale-95 ${running ? 'bg-[#ef4444]' : 'bg-[#22c55e]'}`}
                            >
                                {running ? <Pause size={24} /> : <Play size={24} />}
                            </button>

                            <button
                                onClick={lap} disabled={!running}
                                className={`w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center border-none transition-all ${running ? 'cursor-pointer opacity-100 hover:bg-white/20' : 'cursor-not-allowed opacity-50'}`}
                            >
                                <Flag size={24} />
                            </button>

                            <button
                                onClick={reset}
                                className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center border-none cursor-pointer hover:bg-white/20 transition-colors"
                            >
                                <RotateCcw size={24} />
                            </button>
                        </div>

                        {laps.length > 0 && (
                            <div className="text-left max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                <div className="text-[13px] text-[#9ca3af] mb-3">{t('Stopwatch.lap')}</div>
                                <div className="flex flex-col gap-2">
                                    {laps.map((l, i) => (
                                        <div key={i} className="flex justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                            <span className="text-[#9ca3af]">{t('Stopwatch.lap')} {laps.length - i}</span>
                                            <span className="text-white font-mono">{format(l)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
