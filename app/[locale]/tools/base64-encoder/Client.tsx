"use client";

import { useState } from "react";
import { ArrowRightLeft, Lock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import CopyButton from "../../../components/ui/CopyButton";

export default function Base64EncoderClient() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [error, setError] = useState("");
    const t = useTranslations('ToolPage.Base64Encoder');
    const tCommon = useTranslations('ToolPage.common');
    const tTools = useTranslations('Tools');

    const handleConvert = () => {
        try {
            if (mode === "encode") {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
            setError("");
        } catch (err) {
            setError(t('invalidInput', { mode: mode === "encode" ? t('encode') : t('decode') }));
            setOutput("");
        }
    };



    const swapMode = () => {
        setMode(mode === "encode" ? "decode" : "encode");
        setInput(output);
        setOutput("");
        setError("");
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pb-16 px-6 pt-6">
                <div className="max-w-[900px] mx-auto">

                    <ToolPageHeader
                        title={tTools('base64-encoder.name')}
                        description={tTools('base64-encoder.description')}
                        icon={<Lock size={28} className="text-[#fb923c]" />}
                    />

                    {/* Mode Toggle */}
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => setMode("encode")}
                            className={`py-2.5 px-6 ${mode === "encode" ? "inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]" : "inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]"}`}
                        >
                            {t('encode')}
                        </button>
                        <button onClick={swapMode} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2.5 px-3">
                            <ArrowRightLeft size={16} />
                        </button>
                        <button
                            onClick={() => setMode("decode")}
                            className={`py-2.5 px-6 ${mode === "decode" ? "inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]" : "inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]"}`}
                        >
                            {t('decode')}
                        </button>
                    </div>

                    {/* Input */}
                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl mb-5 overflow-hidden">
                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-medium text-[#9ca3af]">{mode === "encode" ? t('textToEncode') : t('base64ToDecode')}</span>
                            <span className="text-xs text-[#6b7280]">{input.length} {tCommon('chars')}</span>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === "encode" ? t('enterText') : t('enterBase64')}
                            className="w-full h-[180px] bg-transparent border-none p-5 font-mono text-sm text-[#e5e7eb] resize-none outline-none"
                        />
                    </div>

                    {/* Convert Button */}
                    <div className="text-center mb-5">
                        <button onClick={handleConvert} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-8">
                            {mode === "encode" ? t('encodeAction') : t('decodeAction')}
                        </button>
                    </div>

                    {/* Output */}
                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-medium text-[#9ca3af]">{mode === "encode" ? t('base64Output') : t('decodedText')}</span>
                            {output && (
                                <CopyButton text={output} className="text-[#9ca3af] hover:text-[#fb923c]" />
                            )}
                        </div>
                        <textarea
                            value={error || output}
                            readOnly
                            placeholder={t('resultPlaceholder')}
                            className={`w-full h-[180px] bg-transparent border-none p-5 font-mono text-sm resize-none outline-none ${error ? 'text-[#ef4444]' : 'text-[#4ade80]'}`}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
