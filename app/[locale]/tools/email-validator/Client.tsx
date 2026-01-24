"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function EmailValidatorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [email, setEmail] = useState("");

    const validate = () => {
        if (!email) return null;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = regex.test(email);

        let typo = "";
        if (email.includes("@gnail.com")) typo = "Did you mean @gmail.com?";
        if (email.includes("@hotmial.com")) typo = "Did you mean @hotmail.com?";
        if (email.includes("@yaho.com")) typo = "Did you mean @yahoo.com?";

        return { isValid, typo };
    };

    const res = validate();

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">

                    <ToolPageHeader
                        title={tTools('email-validator.name')}
                        description={tTools('email-validator.description')}
                        icon={<CheckCircle size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center">
                        <div className="mb-8">
                            <label className="block mb-3 text-[#9ca3af] text-[13px]">{t('EmailValidator.email')}</label>
                            <input
                                type="email" value={email} onChange={e => setEmail(e.target.value)}
                                className="input-field w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white text-lg text-center" placeholder={t('EmailValidator.placeholder')}
                            />
                        </div>

                        {email && res && (
                            <div className={`
                                p-6 rounded-2xl flex flex-col items-center gap-4 border
                                ${res.isValid ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}
                            `}>
                                {res.isValid ? <CheckCircle size={48} color="#22c55e" /> : <XCircle size={48} color="#ef4444" />}

                                <div>
                                    <div className={`font-bold text-xl ${res.isValid ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                                        {res.isValid ? t('EmailValidator.valid') : t('EmailValidator.invalid')}
                                    </div>
                                    {res.typo && (
                                        <div className="text-[#fb923c] mt-2 font-medium">
                                            {res.typo}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
