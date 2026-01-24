"use client";

import { useState } from "react";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function URLEncoderClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const handleConvert = () => {
        try {
            if (mode === "encode") {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
            setError("");
        } catch (err) {
            setError(t('UrlEncoder.invalidInput', { mode: mode === "encode" ? t('UrlEncoder.encode') : t('UrlEncoder.decode') }));
            setOutput("");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const swapMode = () => {
        setMode(mode === "encode" ? "decode" : "encode");
        setInput(output);
        setOutput("");
        setError("");
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[900px] mx-auto">
                    <ToolPageHeader
                        title={tTools('url-encoder.name')}
                        description={tTools('url-encoder.description')}
                        icon={<span className="text-2xl font-bold">🔗</span>}
                    />

                    <div className="flex items-center gap-3 mb-6">
                        <button onClick={() => setMode("encode")} className={`py-2.5 px-6 rounded-xl transition-colors ${mode === "encode" ? "inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]" : "inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]"}`}>{t('UrlEncoder.encode')}</button>
                        <button onClick={swapMode} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2.5 px-3"><ArrowRightLeft size={16} /></button>
                        <button onClick={() => setMode("decode")} className={`py-2.5 px-6 rounded-xl transition-colors ${mode === "decode" ? "inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]" : "inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]"}`}>{t('UrlEncoder.decode')}</button>
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl mb-5 overflow-hidden">
                        <div className="p-4 px-5 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-medium text-[#9ca3af]">{mode === "encode" ? t('UrlEncoder.urlToEncode') : t('UrlEncoder.encodedUrlToDecode')}</span>
                            <span className="text-xs text-[#6b7280]">{input.length} {t('UrlEncoder.chars')}</span>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === "encode" ? t('UrlEncoder.enterUrlToEncode') : t('UrlEncoder.enterUrlToDecode')}
                            className="w-full h-[150px] bg-transparent border-none p-5 font-mono text-sm text-[#e5e7eb] resize-none outline-none"
                        />
                    </div>

                    <div className="text-center mb-5">
                        <button onClick={handleConvert} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-8">
                            {mode === "encode" ? t('UrlEncoder.encodeAction') : t('UrlEncoder.decodeAction')}
                        </button>
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden">
                        <div className="p-4 px-5 border-b border-white/5 flex items-center justify-between">
                            <span className="text-sm font-medium text-[#9ca3af]">{mode === "encode" ? t('UrlEncoder.encodedUrl') : t('UrlEncoder.decodedUrl')}</span>
                            {output && (
                                <button onClick={copyToClipboard} className={`p-2 bg-transparent border-none cursor-pointer ${copied ? 'text-[#22c55e]' : 'text-[#9ca3af]'}`}>
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            )}
                        </div>
                        <textarea
                            value={error || output}
                            readOnly
                            placeholder={t('UrlEncoder.resultPlaceholder')}
                            className={`w-full h-[150px] bg-transparent border-none p-5 font-mono text-sm resize-none outline-none ${error ? 'text-[#ef4444]' : 'text-[#4ade80]'}`}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
