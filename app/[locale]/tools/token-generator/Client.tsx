"use client";

import { useState } from "react";
import { RefreshCw, Copy, Key } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function TokenGeneratorClient() {
    const t = useTranslations('TokenGenerator');
    const [length, setLength] = useState(32);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [token, setToken] = useState("");

    const generate = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const nums = "0123456789";
        const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let pool = chars;
        if (includeNumbers) pool += nums;
        if (includeSymbols) pool += syms;

        let res = "";
        for (let i = 0; i < length; i++) {
            res += pool.charAt(Math.floor(Math.random() * pool.length));
        }
        setToken(res);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="Random Token Generator"
                        description="Generate secure random strings, tokens, and API keys."
                        icon={<Key size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="mb-8">
                            <label className="flex justify-between mb-3 text-[#9ca3af] text-[13px]">
                                <span>{t('length')}</span>
                                <span>{length} characters</span>
                            </label>
                            <input
                                type="range" min="8" max="128" step="1"
                                value={length} onChange={e => setLength(Number(e.target.value))}
                                className="w-full accent-[#fb923c]"
                            />
                        </div>

                        <div className="flex gap-6 mb-8">
                            <label className="flex items-center gap-2 cursor-pointer text-white">
                                <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} className="w-[18px] h-[18px] accent-[#fb923c]" />
                                {t('includeNumbers')}
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-white">
                                <input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} className="w-[18px] h-[18px] accent-[#fb923c]" />
                                {t('includeSymbols')}
                            </label>
                        </div>

                        <div className="flex gap-4 mb-6">
                            <button onClick={generate} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] flex-1 py-3 flex items-center justify-center gap-2">
                                <RefreshCw size={18} /> {t('generate')}
                            </button>
                        </div>

                        {token && (
                            <div className="relative">
                                <textarea
                                    readOnly
                                    value={token}
                                    className="w-full h-[120px] bg-transparent dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl p-4 text-[#fb923c] text-lg font-mono resize-none"
                                />
                                <button
                                    onClick={() => navigator.clipboard.writeText(token)}
                                    className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] absolute top-3 right-3"
                                >
                                    <Copy size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
