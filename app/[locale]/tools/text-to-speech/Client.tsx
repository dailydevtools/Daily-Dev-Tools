"use client";

import { useState, useEffect } from "react";
import { Volume2, Square } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import LiquidSelect from "../../../components/ui/LiquidSelect";

export default function TextToSpeechClient() {
    const t = useTranslations('TextToSpeech');
    const [text, setText] = useState("Hello, welcome to Daily Dev Tools.");
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState("");
    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
        const loadVoices = () => {
            const v = window.speechSynthesis.getVoices();
            setVoices(v);
            if (v.length > 0) setSelectedVoice(v[0].name);
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const speak = () => {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = rate;
        u.pitch = pitch;
        const v = voices.find(voice => voice.name === selectedVoice);
        if (v) u.voice = v;

        u.onend = () => setSpeaking(false);
        u.onstart = () => setSpeaking(true);

        window.speechSynthesis.speak(u);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="Text to Speech"
                        description="Convert text to natural sounding speech using browser APIs."
                        icon={<Volume2 size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">

                        <div className="mb-6">
                            <textarea
                                value={text} onChange={e => setText(e.target.value)}
                                className="input-field w-full h-[150px] p-4 rounded-xl bg-neutral-100 dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)] text-lg resize-y"
                                placeholder={t('placeholder')}
                            />
                        </div>

                        <div className="flex gap-6 mb-8 flex-wrap">
                            <div className="flex-2 min-w-[200px] relative z-20">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('voice')}</label>
                                <LiquidSelect
                                    value={selectedVoice}
                                    onChange={setSelectedVoice}
                                    options={voices.map(v => ({ value: v.name, label: `${v.name} (${v.lang})` }))}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex-1 min-w-[100px]">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('speed')} ({rate})</label>
                                <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full" />
                            </div>
                            <div className="flex-1 min-w-[100px]">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('pitch')} ({pitch})</label>
                                <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={e => setPitch(Number(e.target.value))} className="w-full" />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={speak} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] flex-1 p-4 flex items-center justify-center gap-2">
                                <Volume2 size={20} /> {t('speak')}
                            </button>
                            <button onClick={stop} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] w-[60px] flex items-center justify-center">
                                <Square size={20} />
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
