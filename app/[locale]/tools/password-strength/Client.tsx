"use client";

import { useState } from "react";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function PasswordStrengthClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [pass, setPass] = useState("");

    const calc = () => {
        let score = 0;
        if (!pass) return { score: 0, label: t('PasswordStrength.inputPlaceholder'), color: "#9ca3af" };

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="mb-8">
                            <label className="block mb-3 text-[#9ca3af] text-[13px]">{t('PasswordStrength.strength')}</label>
                            <input
                                type="text" value={pass} onChange={e => setPass(e.target.value)}
                                className="input-field w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white text-lg" placeholder={t('PasswordStrength.inputPlaceholder')}
                            />
                        </div>

                        <div className="p-6 bg-white/5 rounded-2xl text-center">
                            <div className="flex justify-center mb-4">
                                {score <= 2 ? <ShieldAlert size={48} color={color} /> : score <= 4 ? <Shield size={48} color={color} /> : <ShieldCheck size={48} color={color} />}
                            </div>
                            <div className="text-2xl font-bold mb-4" style={{ color }}>{label}</div>

                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full transition-all duration-300 ease-out" style={{ width: `${width}%`, background: color }} />
                            </div>

                            <div className="mt-6 text-left text-[13px] text-[#9ca3af] grid gap-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${pass.length > 8 ? 'bg-[#22c55e]' : 'bg-[#4b5563]'}`} /> {t('PasswordStrength.length')}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(pass) ? 'bg-[#22c55e]' : 'bg-[#4b5563]'}`} /> {t('PasswordStrength.number')}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(pass) ? 'bg-[#22c55e]' : 'bg-[#4b5563]'}`} /> {t('PasswordStrength.uppercase')}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${/[^A-Za-z0-9]/.test(pass) ? 'bg-[#22c55e]' : 'bg-[#4b5563]'}`} /> {t('PasswordStrength.symbol')}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
