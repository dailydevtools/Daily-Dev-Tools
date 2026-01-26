"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Lock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

export default function PasswordGeneratorClient() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const [copied, setCopied] = useState(false);
    const t = useTranslations('ToolPage.PasswordGenerator');
    const tCommon = useTranslations('ToolPage.common');
    const tTools = useTranslations('Tools');

    // Initial Generation
    useEffect(() => {
        generatePassword();
    }, []);

    function generatePassword() {
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let chars = lower;
        if (useUppercase) chars += upper;
        if (useNumbers) chars += numbers;
        if (useSymbols) chars += symbols;

        let generated = "";
        for (let i = 0; i < length; i++) {
            generated += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(generated);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title={tTools('password-generator.name')}
                        description={tTools('password-generator.description')}
                        icon={<ToolIcon name="Key" size={32} />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 rounded-3xl mb-6 text-center">
                        <div className="text-[32px] font-bold text-[#4ade80] font-mono mb-6 break-all min-h-[48px]">
                            {password}
                        </div>

                        <div className="flex justify-center gap-4">
                            <button onClick={generatePassword} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-8 flex items-center gap-2">
                                <RefreshCw size={18} /> {t('generateNew')}
                            </button>
                            <button onClick={copyToClipboard} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-3 px-8 flex items-center gap-2">
                                {copied ? <Check size={18} className="text-[#22c55e]" /> : <Copy size={18} />}
                                {copied ? tCommon('copied') : tCommon('copy')}
                            </button>
                        </div>
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 rounded-3xl">
                        <h3 className="text-base font-semibold text-white mb-5">{t('configuration')}</h3>

                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <label className="text-[#9ca3af]">{t('length')}</label>
                                <span className="text-[#fb923c] font-bold">{length}</span>
                            </div>
                            <input
                                type="range"
                                min="8"
                                max="64"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                                className="w-full accent-[#fb923c]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-white/[0.03]">
                                <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} className="w-[18px] h-[18px] accent-[#fb923c]" />
                                <span className="text-white">{t('uppercase')}</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-white/[0.03]">
                                <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="w-[18px] h-[18px] accent-[#fb923c]" />
                                <span className="text-white">{t('numbers')}</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-white/[0.03]">
                                <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="w-[18px] h-[18px] accent-[#fb923c]" />
                                <span className="text-white">{t('symbols')}</span>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
