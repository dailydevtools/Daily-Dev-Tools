"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import CopyButton from "../../../components/ui/CopyButton";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import LiquidTabs from "../../../components/ui/LiquidTabs";

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
            <div className="relative z-10 pb-[60px] px-6 pt-6">
                <div className="max-w-[900px] mx-auto">
                    <ToolPageHeader
                        title={tTools('base64-encoder.name')}
                        description={tTools('base64-encoder.description')}
                        icon={<Lock size={28} className="text-[#fb923c]" />}
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
                                <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{mode === "encode" ? t('textToEncode') : t('base64ToDecode')}</span>
                            </div>
                            <span className="text-xs text-[var(--muted-text)] font-mono">{input.length} {tCommon('chars')}</span>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === "encode" ? t('enterText') : t('enterBase64')}
                            className="flex-1 w-full bg-transparent border-none p-5 font-mono text-[14px] text-[var(--foreground)] resize-none outline-none placeholder:text-[var(--muted-text)] leading-relaxed"
                            spellCheck={false}
                        />
                    </LiquidCard>

                    {/* Action Bar */}
                    <div className="flex justify-center mb-6">
                        <LiquidButton onClick={handleConvert} className="px-10 py-3 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            {mode === "encode" ? t('encodeAction') : t('decodeAction')}
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
                                <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{mode === "encode" ? t('base64Output') : t('decodedText')}</span>
                            </div>
                            {output && (
                                <CopyButton text={output} className="text-[var(--muted-text)] hover:text-[var(--foreground)] rounded-lg hover:bg-black/5 dark:hover:bg-white/10" />
                            )}
                        </div>

                        <div className="relative flex-1 flex flex-col">
                            <textarea
                                value={output}
                                readOnly
                                placeholder={t('resultPlaceholder')}
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
