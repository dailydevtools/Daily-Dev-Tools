"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
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
                        icon={<span className="text-2xl">🎫</span>}
                    />

                    {/* Input */}
                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl mb-5 overflow-hidden">
                        <div className="px-5 py-4 border-b border-white/5">
                            <span className="text-sm font-medium text-[#9ca3af]">{t('JwtDecoder.pasteToken')}</span>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('JwtDecoder.tokenPlaceholder')}
                            className="w-full h-[120px] bg-transparent border-none p-5 font-mono text-[13px] text-[#e5e7eb] resize-none outline-none break-all"
                        />
                    </div>

                    <div className="text-center mb-6">
                        <button onClick={decodeJWT} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-8">{t('JwtDecoder.decodeAction')}</button>
                    </div>

                    {error && (
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl p-5 mb-5 border-red-500/30">
                            <p className="text-[#ef4444] text-sm">⚠️ {error}</p>
                        </div>
                    )}

                    {header && payload && (
                        <div className="grid gap-5">
                            {/* Header */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden">
                                <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                                    <span className="text-sm font-semibold text-[#fb923c]">{t('JwtDecoder.header')}</span>
                                    <button onClick={() => copyToClipboard(JSON.stringify(header, null, 2), 'header')} className={`p-2 bg-transparent border-none cursor-pointer ${copied === 'header' ? 'text-[#22c55e]' : 'text-[#9ca3af]'}`}>
                                        {copied === 'header' ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <pre className="p-5 m-0 font-mono text-[13px] text-[#4ade80] overflow-x-auto">
                                    {JSON.stringify(header, null, 2)}
                                </pre>
                            </div>

                            {/* Payload */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden">
                                <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                                    <span className="text-sm font-semibold text-[#fb923c]">{t('JwtDecoder.payload')}</span>
                                    <button onClick={() => copyToClipboard(JSON.stringify(payload, null, 2), 'payload')} className={`p-2 bg-transparent border-none cursor-pointer ${copied === 'payload' ? 'text-[#22c55e]' : 'text-[#9ca3af]'}`}>
                                        {copied === 'payload' ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <pre className="p-5 m-0 font-mono text-[13px] text-[#4ade80] overflow-x-auto">
                                    {JSON.stringify(payload, null, 2)}
                                </pre>
                                {(payload.iat || payload.exp) && (
                                    <div className="px-5 py-4 border-t border-white/5 text-[13px] text-[#9ca3af]">
                                        {payload.iat && <p>{t('JwtDecoder.issued')}: {formatDate(payload.iat)}</p>}
                                        {payload.exp && <p>{t('JwtDecoder.expires')}: {formatDate(payload.exp)}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
