"use client";

import { useState } from "react";
import { ArrowRightLeft, Lock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import CopyButton from "../../../components/ui/CopyButton";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidTextArea } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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
                    <div className="flex justify-center mb-8">
                        <div className="dark:bg-neutral-800 p-1 rounded-xl flex gap-1 border border-neutral-200 dark:border-white/5">
                            <button
                                onClick={() => setMode("encode")}
                                className={`py-2 px-6 rounded-lg text-sm font-medium transition-all ${mode === "encode" ? 'bg-white dark:bg-neutral-700 shadow-sm text-orange-500' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                            >
                                {t('encode')}
                            </button>
                            <button
                                onClick={swapMode}
                                className="py-2 px-3 rounded-lg text-sm text-neutral-500 hover:text-orange-500 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 transition-all"
                            >
                                <ArrowRightLeft size={16} />
                            </button>
                            <button
                                onClick={() => setMode("decode")}
                                className={`py-2 px-6 rounded-lg text-sm font-medium transition-all ${mode === "decode" ? 'bg-white dark:bg-neutral-700 shadow-sm text-orange-500' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                            >
                                {t('decode')}
                            </button>
                        </div>
                    </div>

                    {/* Input */}
                    <LiquidCard className="p-0 mb-5 overflow-hidden">
                        <div className="px-5 py-4 border-b border-[var(--border-color)] bg-neutral-50/50 dark:bg-white/5 flex items-center justify-between">
                            <span className="text-sm font-medium text-[var(--muted-text)]">{mode === "encode" ? t('textToEncode') : t('base64ToDecode')}</span>
                            <span className="text-xs text-[var(--muted-text)] font-mono">{input.length} {tCommon('chars')}</span>
                        </div>
                        <LiquidTextArea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === "encode" ? t('enterText') : t('enterBase64')}
                            className="w-full h-[180px] bg-transparent border-none rounded-none focus:ring-0 text-base p-6 resize-none"
                        />
                    </LiquidCard>

                    {/* Convert Button */}
                    <div className="text-center mb-8">
                        <LiquidButton onClick={handleConvert} className="px-10 py-3 text-base shadow-lg hover:shadow-xl">
                            {mode === "encode" ? t('encodeAction') : t('decodeAction')}
                        </LiquidButton>
                    </div>

                    {/* Output */}
                    <LiquidCard className="p-0 overflow-hidden">
                        <div className="px-5 py-4 border-b border-[var(--border-color)] bg-neutral-50/50 dark:bg-white/5 flex items-center justify-between">
                            <span className="text-sm font-medium text-[var(--muted-text)]">{mode === "encode" ? t('base64Output') : t('decodedText')}</span>
                            {output && (
                                <CopyButton text={output} className="text-[var(--muted-text)] hover:text-orange-500" />
                            )}
                        </div>
                        <LiquidTextArea
                            value={error || output}
                            readOnly
                            placeholder={t('resultPlaceholder')}
                            className={`w-full h-[180px] bg-transparent border-none rounded-none focus:ring-0 text-base p-6 resize-none ${error ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}
                        />
                    </LiquidCard>
                </div>
            </div>
        </main>
    );
}
