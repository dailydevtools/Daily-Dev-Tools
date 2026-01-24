"use client";

import { useState } from "react";
import { Link as LinkIcon, Copy, Check } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function PrettyPrintUrlClient() {
    const t = useTranslations('PrettyPrintUrl');
    const [input, setInput] = useState("");
    const [copied, setCopied] = useState(false);

    const formatUrl = (urlStr: string) => {
        if (!urlStr) return "";
        try {
            const url = new URL(urlStr);
            let formatted = `${url.protocol}//${url.hostname}${url.port ? ':' + url.port : ''}${url.pathname}`;

            if (url.search) {
                formatted += '\n';
                url.searchParams.forEach((value, key) => {
                    formatted += `  ? ${key} = ${value}\n`;
                });
            } else if (urlStr.includes('?')) {
                // Fallback for partial URLs or just query strings
                formatted = urlStr.replace('?', '\n? ').replace(/&/g, '\n& ');
            }

            if (url.hash) {
                formatted += `\n  ${url.hash}`;
            }
            return formatted;
        } catch (e) {
            // Fallback for non-standard URLs
            return urlStr.replace(/[?&]/g, (match) => `\n${match} `);
        }
    }

    const output = formatUrl(input);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="Pretty Print URL"
                        description="Format long URLs into a clean, readable structure by separating query parameters."
                        icon={<LinkIcon size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="mb-6">
                            <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('enterUrl')}</label>
                            <input
                                type="text" value={input} onChange={e => setInput(e.target.value)}
                                placeholder="https://example.com/path?param=value&other=123"
                                className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#fb923c]"
                            />
                        </div>

                        {output && (
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-[#9ca3af] text-[13px]">{t('formatted')}</label>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 text-[#fb923c] hover:text-white transition-colors text-sm font-medium"
                                    >
                                        {copied ? <><Check size={14} /> {t('copied')}</> : <><Copy size={14} /> {t('copy')}</>}
                                    </button>
                                </div>
                                <div className="relative group">
                                    <pre className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                        {output}
                                    </pre>
                                </div>
                            </div>
                        )}

                        {!input && (
                            <div className="mt-8 text-center text-[#9ca3af] text-sm opacity-60">
                                {t('placeholder')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
