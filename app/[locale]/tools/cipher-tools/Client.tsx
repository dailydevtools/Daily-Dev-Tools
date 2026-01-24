"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function CipherToolsClient() {
    const t = useTranslations('CipherTools');
    const [input, setInput] = useState("");
    const [shift, setShift] = useState(13); // Default ROT13
    const [output, setOutput] = useState("");

    const process = (s: number) => {
        // Caesar Cipher Logic
        const result = input.replace(/[a-zA-Z]/g, (char) => {
            const base = char <= 'Z' ? 65 : 97;
            // (codepoint - base + shift) % 26 + base
            // Handle negative shift
            return String.fromCharCode(((char.charCodeAt(0) - base + s) % 26 + 26) % 26 + base);
        });
        setOutput(result);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title="Cipher Tools"
                        description="Encrypt and decrypt text with simple shift ciphers (Caesar, ROT13)."
                        icon={<Lock size={28} className="text-[#fb923c]" />}
                    />

                    <div className="flex justify-center gap-3 mb-6">
                        <button
                            onClick={() => { setShift(13); process(13); }}
                            className={`inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] ${shift === 13 ? 'bg-orange-500/20 text-[#fb923c]' : ''}`}
                        >
                            {t('rot13')}
                        </button>
                        <button
                            onClick={() => { setShift(3); process(3); }}
                            className={`inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] ${shift === 3 ? 'bg-orange-500/20 text-[#fb923c]' : ''}`}
                        >
                            {t('caesar')}
                        </button>
                        <button
                            onClick={() => { setShift(1); process(1); }}
                            className={`inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] ${shift === 1 ? 'bg-orange-500/20 text-[#fb923c]' : ''}`}
                        >
                            {t('shift1')}
                        </button>
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 mb-6">
                        <div className="mb-5">
                            <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('shiftAmount')}</label>
                            <input
                                type="number" value={shift}
                                onChange={e => { setShift(Number(e.target.value)); process(Number(e.target.value)); }}
                                className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('inputText')}</label>
                                <textarea
                                    value={input}
                                    onChange={e => { setInput(e.target.value); setTimeout(() => process(shift), 0); }}
                                    placeholder="Hello World"
                                    className="w-full h-[200px] bg-black/30 border border-white/10 rounded-xl p-4 text-white resize-y"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('outputText')}</label>
                                <textarea
                                    readOnly
                                    value={output}
                                    placeholder="Uryyb Jbeyq"
                                    className="w-full h-[200px] bg-black/30 border border-white/10 rounded-xl p-4 text-[#fb923c] resize-y"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
