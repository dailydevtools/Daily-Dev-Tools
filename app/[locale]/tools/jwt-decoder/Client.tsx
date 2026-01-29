"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

interface JWTHeader {
    alg?: string;
    typ?: string;
    [key: string]: any;
}

interface JWTPayload {
    sub?: string;
    name?: string;
    iat?: number;
    exp?: number;
    [key: string]: any;
}

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function JWTDecoderClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("");
    const [header, setHeader] = useState<JWTHeader | null>(null);
    const [payload, setPayload] = useState<JWTPayload | null>(null);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState<string | null>(null);

    const decodeJWT = () => {
        try {
            const parts = input.trim().split(".");
            if (parts.length !== 3) {
                throw new Error("Invalid JWT format. Expected 3 parts separated by dots.");
            }

            const decodedHeader = JSON.parse(atob(parts[0]));
            const decodedPayload = JSON.parse(atob(parts[1]));

            setHeader(decodedHeader);
            setPayload(decodedPayload);
            setError("");
        } catch (err: any) {
            setError(err.message || "Invalid JWT");
            setHeader(null);
            setPayload(null);
        }
    };

    const copyToClipboard = (text: string, section: string) => {
        navigator.clipboard.writeText(text);
        setCopied(section);
        setTimeout(() => setCopied(null), 2000);
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleString();
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[900px] mx-auto">
                    <ToolPageHeader
                        title={tTools('jwt-decoder.name')}
                        description={tTools('jwt-decoder.description')}
                        icon={<ToolIcon name="Ticket" size={32} />}
                    />

                    {/* Input */}
                    <LiquidCard className="rounded-2xl mb-8 overflow-hidden p-0 flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all">
                        <div className="px-5 py-4 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5">
                            <span className="text-sm font-medium text-[var(--muted-text)]">{t('JwtDecoder.pasteToken')}</span>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('JwtDecoder.tokenPlaceholder')}
                            className="w-full h-[150px] bg-transparent border-none p-5 font-mono text-[13px] text-[var(--foreground)] resize-none outline-none break-all leading-relaxed"
                        />
                    </LiquidCard>

                    <div className="text-center mb-8">
                        <LiquidButton onClick={decodeJWT} className="px-12 py-4 text-base">
                            {t('JwtDecoder.decodeAction')}
                        </LiquidButton>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 mb-8 text-center animate-in fade-in slide-in-from-top-2">
                            <p className="text-red-500 text-sm font-medium">⚠️ {error}</p>
                        </div>
                    )}

                    {header && payload && (
                        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Header */}
                            <LiquidCard className="rounded-2xl overflow-hidden p-0">
                                <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                    <span className="text-sm font-semibold text-orange-500">{t('JwtDecoder.header')}</span>
                                    <button
                                        onClick={() => copyToClipboard(JSON.stringify(header, null, 2), 'header')}
                                        className={`p-1.5 rounded-lg transition-colors bg-transparent border-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 ${copied === 'header' ? 'text-green-500' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                                    >
                                        {copied === 'header' ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <pre className="p-5 m-0 font-mono text-[13px] text-green-600 dark:text-green-400 overflow-x-auto bg-white dark:bg-[#0a0a0a]">
                                    {JSON.stringify(header, null, 2)}
                                </pre>
                            </LiquidCard>

                            {/* Payload */}
                            <LiquidCard className="rounded-2xl overflow-hidden p-0">
                                <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                    <span className="text-sm font-semibold text-orange-500">{t('JwtDecoder.payload')}</span>
                                    <button
                                        onClick={() => copyToClipboard(JSON.stringify(payload, null, 2), 'payload')}
                                        className={`p-1.5 rounded-lg transition-colors bg-transparent border-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 ${copied === 'payload' ? 'text-green-500' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                                    >
                                        {copied === 'payload' ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <pre className="p-5 m-0 font-mono text-[13px] text-green-600 dark:text-green-400 overflow-x-auto bg-white dark:bg-[#0a0a0a]">
                                    {JSON.stringify(payload, null, 2)}
                                </pre>
                                {(payload.iat || payload.exp) && (
                                    <div className="px-5 py-4 border-t border-[var(--border-color)] text-[13px] text-[var(--muted-text)] bg-neutral-50 dark:bg-white/[0.02]">
                                        <div className="flex flex-col gap-1">
                                            {payload.iat && (
                                                <div className="flex justify-between">
                                                    <span>{t('JwtDecoder.issued')}:</span>
                                                    <span className="font-mono text-[var(--foreground)]">{formatDate(payload.iat)}</span>
                                                </div>
                                            )}
                                            {payload.exp && (
                                                <div className="flex justify-between">
                                                    <span>{t('JwtDecoder.expires')}:</span>
                                                    <span className="font-mono text-[var(--foreground)]">{formatDate(payload.exp)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </LiquidCard>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
