"use client";

import { useState } from "react";
import { RefreshCw, Copy, Key } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidSlider } from "../../../components/ui/LiquidSlider";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidTextArea } from "../../../components/ui/LiquidInput";

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

                    <LiquidCard className="p-10">
                        <LiquidSlider
                            label={t('length')}
                            valueDisplay={`${length} characters`}
                            min={8} max={128} step={1}
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            containerClassName="mb-8"
                        />

                        <div className="flex gap-8 mb-8">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${includeNumbers ? 'bg-orange-500 border-orange-500' : 'bg-transparent border-[var(--border-color)] group-hover:border-orange-500'}`}>
                                    {includeNumbers && <div className="w-2.5 h-1.5 border-b-2 border-l-2 border-white -rotate-45 mb-0.5"></div>}
                                </div>
                                <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} className="hidden" />
                                <span className="text-[var(--foreground)] text-sm font-medium">{t('includeNumbers')}</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${includeSymbols ? 'bg-orange-500 border-orange-500' : 'bg-transparent border-[var(--border-color)] group-hover:border-orange-500'}`}>
                                    {includeSymbols && <div className="w-2.5 h-1.5 border-b-2 border-l-2 border-white -rotate-45 mb-0.5"></div>}
                                </div>
                                <input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} className="hidden" />
                                <span className="text-[var(--foreground)] text-sm font-medium">{t('includeSymbols')}</span>
                            </label>
                        </div>

                        <div className="flex gap-4 mb-6">
                            <LiquidButton onClick={generate} className="flex-1 py-3 text-base">
                                <RefreshCw size={18} className="mr-2" /> {t('generate')}
                            </LiquidButton>
                        </div>

                        {token && (
                            <div className="relative">
                                <LiquidTextArea
                                    readOnly
                                    value={token}
                                    className="h-[120px] text-orange-500 text-lg font-mono"
                                />
                                <div className="absolute top-3 right-3">
                                    <LiquidButton
                                        variant="ghost"
                                        onClick={() => navigator.clipboard.writeText(token)}
                                        className="h-8 w-8 p-0"
                                    >
                                        <Copy size={16} />
                                    </LiquidButton>
                                </div>
                            </div>
                        )}
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
