"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Lock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { toast } from "sonner";

export default function PasswordGeneratorClient() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
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
        toast.success(tCommon('copied'));
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

                    <LiquidCard className="p-10 mb-6 text-center">
                        <div className="text-[32px] font-bold text-green-500 font-mono mb-8 break-all min-h-[48px] tracking-wider">
                            {password}
                        </div>

                        <div className="flex justify-center gap-4">
                            <LiquidButton onClick={generatePassword} className="px-6 py-2.5 h-[46px] gap-2">
                                <RefreshCw size={18} /> {t('generateNew')}
                            </LiquidButton>
                            <LiquidButton onClick={copyToClipboard} variant="secondary" className="px-6 py-2.5 h-[46px] gap-2 border-[var(--border-color)]">
                                <Copy size={18} />
                                {tCommon('copy')}
                            </LiquidButton>
                        </div>
                    </LiquidCard>

                    <LiquidCard className="p-8">
                        <h3 className="text-base font-semibold text-[var(--foreground)] mb-8 flex items-center gap-2">
                            <ToolIcon name="Settings" size={20} className="text-[var(--muted-text)]" />
                            {t('configuration')}
                        </h3>

                        <div className="mb-8 p-6 bg-neutral-100/50 dark:bg-white/5 rounded-2xl border border-[var(--border-color)]">
                            <div className="flex justify-between mb-4">
                                <label className="text-[var(--muted-text)] font-medium">{t('length')}</label>
                                <span className="text-orange-500 font-bold text-lg">{length}</span>
                            </div>
                            <input
                                type="range"
                                min="8"
                                max="64"
                                value={length}
                                onChange={(e) => setLength(Number(e.target.value))}
                                className="w-full accent-orange-500 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="flex items-center gap-4 cursor-pointer p-4 rounded-xl bg-neutral-100/50 dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 border border-[var(--border-color)] transition-all group select-none">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${useUppercase ? 'bg-orange-500 border-orange-500' : 'border-[var(--muted-text)] bg-transparent'}`}>
                                    {useUppercase && <Check size={12} className="text-white" />}
                                </div>
                                <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} className="hidden" />
                                <span className="text-[var(--foreground)] group-hover:text-orange-500 transition-colors font-medium">{t('uppercase')}</span>
                            </label>
                            <label className="flex items-center gap-4 cursor-pointer p-4 rounded-xl bg-neutral-100/50 dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 border border-[var(--border-color)] transition-all group select-none">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${useNumbers ? 'bg-orange-500 border-orange-500' : 'border-[var(--muted-text)] bg-transparent'}`}>
                                    {useNumbers && <Check size={12} className="text-white" />}
                                </div>
                                <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="hidden" />
                                <span className="text-[var(--foreground)] group-hover:text-orange-500 transition-colors font-medium">{t('numbers')}</span>
                            </label>
                            <label className="flex items-center gap-4 cursor-pointer p-4 rounded-xl bg-neutral-100/50 dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 border border-[var(--border-color)] transition-all group select-none">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${useSymbols ? 'bg-orange-500 border-orange-500' : 'border-[var(--muted-text)] bg-transparent'}`}>
                                    {useSymbols && <Check size={12} className="text-white" />}
                                </div>
                                <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="hidden" />
                                <span className="text-[var(--foreground)] group-hover:text-orange-500 transition-colors font-medium">{t('symbols')}</span>
                            </label>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
