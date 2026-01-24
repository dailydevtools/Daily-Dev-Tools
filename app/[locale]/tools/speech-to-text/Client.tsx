"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function SpeechToTextClient() {
    const t = useTranslations('SpeechToText');
    const [text, setText] = useState("");
    const [listening, setListening] = useState(false);
    const [supported, setSupported] = useState(true);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event: any) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    setText(prev => prev + (prev ? ' ' : '') + finalTranscript);
                }
            };

            recognition.onend = () => {
                setListening(false);
            };

            recognitionRef.current = recognition;
        } else {
            setSupported(false);
        }
    }, []);

    const toggle = () => {
        if (!recognitionRef.current) return;
        if (listening) {
            recognitionRef.current.stop();
            setListening(false);
        } else {
            recognitionRef.current.start();
            setListening(true);
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="Speech to Text"
                        description="Convert speech to text with the Web Speech API."
                        icon={<Mic size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">

                        {!supported && (
                            <div className="p-3 bg-red-500/10 text-[#ef4444] rounded-lg mb-6 text-center">
                                {t('notSupported')}
                            </div>
                        )}

                        <div className="mb-6 relative">
                            <textarea
                                value={text} onChange={e => setText(e.target.value)}
                                className="input-field w-full h-[200px] p-5 rounded-xl bg-black/30 border border-white/10 text-white text-lg resize-y"
                                placeholder={t('placeholder')}
                            />
                            <button onClick={() => navigator.clipboard.writeText(text)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] absolute top-3 right-3 p-2">
                                <Copy size={16} />
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={toggle} disabled={!supported}
                                className={`w-20 h-20 rounded-full text-white border-none flex items-center justify-center transition-all duration-300 ${listening ? 'bg-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-[#22c55e]'
                                    } ${supported ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            >
                                {listening ? <MicOff size={32} /> : <Mic size={32} />}
                            </button>
                        </div>

                        <div className="text-center mt-4 text-[#9ca3af] text-[13px]">
                            {listening ? t('listening') : t('start')}
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
