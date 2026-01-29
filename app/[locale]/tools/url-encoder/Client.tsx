"use client";

import { useState } from "react";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidTextArea } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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
                        icon={<ToolIcon name="Link" size={32} />}
                    />

                    <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
                        <LiquidButton
                            onClick={() => setMode("encode")}
                            variant={mode === "encode" ? "primary" : "ghost"}
                            className="rounded-full h-11 px-8"
                        >
                            {t('UrlEncoder.encode')}
                        </LiquidButton>

                        <LiquidButton
                            onClick={swapMode}
                            variant="ghost"
                            className="rounded-full h-11 w-11 p-0 border border-[var(--border-color)] text-[var(--muted-text)] hover:text-orange-500"
                        >
                            <ArrowRightLeft size={18} />
                        </LiquidButton>

                        <LiquidButton
                            onClick={() => setMode("decode")}
                            variant={mode === "decode" ? "primary" : "ghost"}
                            className="rounded-full h-11 px-8"
                        >
                            {t('UrlEncoder.decode')}
                        </LiquidButton>
                    </div>

                    <LiquidCard className="p-0 mb-5 overflow-hidden">
                        <div className="p-4 px-6 border-b border-[var(--border-color)] bg-neutral-50/50 dark:bg-white/5 flex items-center justify-between">
                            <span className="text-sm font-medium text-[var(--muted-text)]">{mode === "encode" ? t('UrlEncoder.urlToEncode') : t('UrlEncoder.encodedUrlToDecode')}</span>
                            <span className="text-xs text-[var(--muted-text)] font-mono">{input.length} {t('UrlEncoder.chars')}</span>
                        </div>
                        <LiquidTextArea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === "encode" ? t('UrlEncoder.enterUrlToEncode') : t('UrlEncoder.enterUrlToDecode')}
                            className="w-full h-[150px] bg-transparent border-none rounded-none focus:ring-0 text-base p-6 resize-none"
                        />
                    </LiquidCard>

                    <div className="text-center mb-8">
                        <LiquidButton onClick={handleConvert} className="h-11 px-8 text-base shadow-lg hover:shadow-xl">
                            {mode === "encode" ? t('UrlEncoder.encodeAction') : t('UrlEncoder.decodeAction')}
                        </LiquidButton>
                    </div>

                    <LiquidCard className="p-0 overflow-hidden">
                        <div className="p-4 px-6 border-b border-[var(--border-color)] bg-neutral-50/50 dark:bg-white/5 flex items-center justify-between">
                            <span className="text-sm font-medium text-[var(--muted-text)]">{mode === "encode" ? t('UrlEncoder.encodedUrl') : t('UrlEncoder.decodedUrl')}</span>
                            {output && (
                                <LiquidButton onClick={copyToClipboard} variant="ghost" className={`h-8 w-8 p-0 rounded-lg transition-colors ${copied ? 'text-green-500 hover:text-green-600' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}>
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </LiquidButton>
                            )}
                        </div>
                        <LiquidTextArea
                            value={error || output}
                            readOnly
                            placeholder={t('UrlEncoder.resultPlaceholder')}
                            className={`w-full h-[150px] bg-transparent border-none rounded-none focus:ring-0 text-base p-6 resize-none ${error ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}
                        />
                    </LiquidCard>
                </div>
            </div>
        </main>
    );
}
