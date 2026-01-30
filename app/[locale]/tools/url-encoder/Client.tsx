"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import LiquidTabs from "../../../components/ui/LiquidTabs";

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
            <div className="relative z-10 pb-[60px] px-6 pt-6">
                <div className="max-w-[900px] mx-auto">
                    <ToolPageHeader
                        title={tTools('url-encoder.name')}
                        description={tTools('url-encoder.description')}
                        icon={<ToolIcon name="Link" size={32} />}
                    />

                    <LiquidTabs
                        tabs={['encode', 'decode']}
                        activeTab={mode}
                        onChange={(val) => setMode(val as "encode" | "decode")}
                        onSwap={swapMode}
                    />

                    {/* Input Area */}
                    <LiquidCard className="p-0 mb-6 overflow-hidden flex flex-col h-[250px] group focus-within:ring-2 ring-orange-500/20 transition-all">
                        <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5 opacity-60">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                                <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{mode === "encode" ? t('UrlEncoder.urlToEncode') : t('UrlEncoder.encodedUrlToDecode')}</span>
                            </div>
                            <span className="text-xs text-[var(--muted-text)] font-mono">{input.length} {t('UrlEncoder.chars')}</span>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === "encode" ? t('UrlEncoder.enterUrlToEncode') : t('UrlEncoder.enterUrlToDecode')}
                            className="flex-1 w-full bg-transparent border-none p-5 font-mono text-[14px] text-[var(--foreground)] resize-none outline-none placeholder:text-[var(--muted-text)] leading-relaxed"
                            spellCheck={false}
                        />
                    </LiquidCard>

                    {/* Action Bar */}
                    <div className="flex justify-center mb-6">
                        <LiquidButton onClick={handleConvert} className="px-10 py-3 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            {mode === "encode" ? t('UrlEncoder.encodeAction') : t('UrlEncoder.decodeAction')}
                        </LiquidButton>
                    </div>

                    {/* Output Area */}
                    <LiquidCard className="p-0 overflow-hidden flex flex-col h-[250px] group focus-within:ring-2 ring-green-500/20 transition-all relative">
                        <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5 opacity-60">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                                <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{mode === "encode" ? t('UrlEncoder.encodedUrl') : t('UrlEncoder.decodedUrl')}</span>
                            </div>
                            {output && (
                                <LiquidButton onClick={copyToClipboard} variant="ghost" className={`h-8 w-8 p-0 rounded-lg transition-colors ${copied ? 'text-green-500 hover:text-green-600' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}>
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </LiquidButton>
                            )}
                        </div>

                        <div className="relative flex-1 flex flex-col">
                            <textarea
                                value={output}
                                readOnly
                                placeholder={t('UrlEncoder.resultPlaceholder')}
                                className={`flex-1 w-full bg-transparent border-none p-5 font-mono text-[14px] resize-none outline-none leading-relaxed ${error ? 'text-red-500' : 'text-green-600 dark:text-green-400 placeholder:text-[var(--muted-text)]'}`}
                                spellCheck={false}
                            />
                            {error && (
                                <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-20 animate-in fade-in duration-200">
                                    <div className="bg-white dark:bg-[#111] border border-red-200 dark:border-red-900/50 shadow-2xl rounded-2xl p-6 text-center">
                                        <div className="text-3xl mb-2">⚠️</div>
                                        <p className="text-red-500 font-medium">{error}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </LiquidCard>
                </div>
            </div>
        </main>
    );
}
