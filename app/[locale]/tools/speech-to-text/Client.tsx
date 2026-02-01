"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput, LiquidTextArea } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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

                    <LiquidCard className="p-10">

                        {!supported && (
                            <div className="p-3 bg-red-500/10 text-[#ef4444] rounded-lg mb-6 text-center">
                                {t('notSupported')}
                            </div>
                        )}

                        <div className="mb-6 relative">
                            <LiquidTextArea
                                value={text} onChange={e => setText(e.target.value)}
                                className="h-[200px]"
                                placeholder={t('placeholder')}
                            />
                            <LiquidButton
                                onClick={() => navigator.clipboard.writeText(text)}
                                variant="ghost"
                                className="absolute top-2 right-2 p-2 h-auto border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-gray-400 hover:bg-neutral-100 dark:hover:bg-white/10"
                            >
                                <Copy size={16} />
                            </LiquidButton>
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

                        <div className="text-center mt-4 text-[var(--muted-text)] text-[13px]">
                            {listening ? t('listening') : t('start')}
                        </div>

                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
