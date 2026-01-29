"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

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

                    <LiquidCard className="p-10 text-center">
                        <div className="mb-10">
                            <label className="block mb-3 text-[var(--muted-text)] text-sm font-medium">{t('EmailValidator.email')}</label>
                            <LiquidInput
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="text-lg text-center"
                                placeholder={t('EmailValidator.placeholder')}
                            />
                        </div>

                        <div className={`
                            transition-all duration-500 overflow-hidden
                            ${email && res ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}
                        `}>
                            {email && res && (
                                <div className={`
                                    p-8 rounded-2xl flex flex-col items-center gap-4 border backdrop-blur-sm
                                    ${res.isValid
                                        ? 'bg-green-500/10 border-green-500/20'
                                        : 'bg-red-500/10 border-red-500/20'}
                                `}>
                                    <div className={`
                                        w-16 h-16 rounded-full flex items-center justify-center
                                        ${res.isValid
                                            ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                                            : 'bg-red-500/20 text-red-600 dark:text-red-400'}
                                    `}>
                                        {res.isValid ? <CheckCircle size={32} /> : <XCircle size={32} />}
                                    </div>

                                    <div>
                                        <div className={`font-bold text-xl mb-1 ${res.isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {res.isValid ? t('EmailValidator.valid') : t('EmailValidator.invalid')}
                                        </div>
                                        {res.typo && (
                                            <div className="text-orange-500 mt-2 font-medium bg-orange-500/10 py-1 px-3 rounded-full text-sm inline-block">
                                                {res.typo}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </LiquidCard>
                </div>
            </div>
        </main>
    );
}
