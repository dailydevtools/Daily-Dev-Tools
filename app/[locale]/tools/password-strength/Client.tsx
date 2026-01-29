"use client";

import { useState } from "react";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

export default function PasswordStrengthClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [pass, setPass] = useState("");

    const calc = () => {
        let score = 0;
        if (!pass) return { score: 0, label: t('PasswordStrength.inputPlaceholder'), color: "var(--muted-text)" };

        if (pass.length > 8) score++;
        if (pass.length > 12) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        if (score <= 2) return { score, label: t('PasswordStrength.weak'), color: "#ef4444" };
        if (score <= 4) return { score, label: t('PasswordStrength.fair'), color: "#fb923c" };
        return { score, label: t('PasswordStrength.strong'), color: "#22c55e" };
    };

    const { score, label, color } = calc();
    const width = Math.min(100, (score / 5) * 100);

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">
                    <ToolPageHeader
                        title={tTools('password-strength.name')}
                        description={tTools('password-strength.description')}
                        icon={<Shield size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-10">
                        <div className="mb-8">
                            <label className="block mb-3 text-[var(--muted-text)] text-[13px]">{t('PasswordStrength.strength')}</label>
                            <LiquidInput
                                type="text"
                                value={pass}
                                onChange={e => setPass(e.target.value)}
                                className="text-lg p-4"
                                placeholder={t('PasswordStrength.inputPlaceholder')}
                            />
                        </div>

                        <div className="p-6 bg-neutral-100/50 dark:bg-white/5 rounded-2xl text-center shadow-inner border border-[var(--border-color)]">
                            <div className="flex justify-center mb-4 text-[var(--foreground)]">
                                {score <= 2 ? <ShieldAlert size={48} style={{ color: score === 0 ? 'var(--muted-text)' : color }} /> : score <= 4 ? <Shield size={48} style={{ color }} /> : <ShieldCheck size={48} style={{ color }} />}
                            </div>
                            <div className="text-2xl font-bold mb-4" style={{ color: score === 0 ? 'var(--muted-text)' : color }}>{label}</div>

                            <div className="h-2 bg-neutral-200 dark:bg-white/10 rounded-full overflow-hidden mb-6">
                                <div className="h-full transition-all duration-300 ease-out" style={{ width: `${width}%`, background: score === 0 ? 'transparent' : color }} />
                            </div>

                            <div className="text-left text-[13px] text-[var(--muted-text)] grid gap-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full transition-colors ${pass.length > 8 ? 'bg-green-500' : 'bg-neutral-500'}`} /> {t('PasswordStrength.length')}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full transition-colors ${/[0-9]/.test(pass) ? 'bg-green-500' : 'bg-neutral-500'}`} /> {t('PasswordStrength.number')}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full transition-colors ${/[A-Z]/.test(pass) ? 'bg-green-500' : 'bg-neutral-500'}`} /> {t('PasswordStrength.uppercase')}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full transition-colors ${/[^A-Za-z0-9]/.test(pass) ? 'bg-green-500' : 'bg-neutral-500'}`} /> {t('PasswordStrength.symbol')}
                                </div>
                            </div>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
