"use client";

import { useState, useEffect } from "react";
import { Volume2, Square } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import LiquidSelect from "../../../components/ui/LiquidSelect";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput, LiquidTextArea } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidSlider } from "../../../components/ui/LiquidSlider";

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

                    <LiquidCard className="p-10">

                        <div className="mb-6">
                            <LiquidTextArea
                                value={text} onChange={e => setText(e.target.value)}
                                className="h-[150px]"
                                placeholder={t('placeholder')}
                            />
                        </div>

                        <div className="flex gap-6 mb-8 flex-wrap">
                            <div className="flex-2 min-w-[200px] relative z-20">
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('voice')}</label>
                                <LiquidSelect
                                    value={selectedVoice}
                                    onChange={setSelectedVoice}
                                    options={voices.map(v => ({ value: v.name, label: `${v.name} (${v.lang})` }))}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex-1 min-w-[100px]">
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('speed')} ({rate})</label>
                                <LiquidSlider min={0.5} max={2} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} />
                            </div>
                            <div className="flex-1 min-w-[100px]">
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('pitch')} ({pitch})</label>
                                <LiquidSlider min={0} max={2} step={0.1} value={pitch} onChange={e => setPitch(Number(e.target.value))} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <LiquidButton onClick={speak} className="flex-1 gap-2">
                                <Volume2 size={20} /> {t('speak')}
                            </LiquidButton>
                            <LiquidButton onClick={stop} variant="ghost" className="w-auto px-6 flex items-center justify-center gap-2 border border-neutral-300 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-orange-500 hover:border-orange-500 hover:bg-orange-500/10 transition-all">
                                <Square size={20} /> Stop
                            </LiquidButton>
                        </div>

                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
