"use client";

import { useState } from "react";
import { CheckCircle, XCircle, CreditCard } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function IbanValidatorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [iban, setIban] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const validate = (input: string) => {
        // Remove spaces
        const code = input.replace(/\s/g, '').toUpperCase();
        setIban(input); // keep formatting? or raw? user typing...

        if (code.length < 5) {
            setIsValid(null);
            return;
        }

        // Move first 4 chars to end
        const rearranged = code.slice(4) + code.slice(0, 4);

        // Replace letters with numbers (A=10, B=11...)
        const numeric = rearranged.replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString());

        // BigInt Mod 97
        try {
            const remainder = BigInt(numeric) % BigInt(97);
            setIsValid(remainder === BigInt(1));
        } catch (e) {
            setIsValid(false);
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">

                    <ToolPageHeader
                        title={tTools('iban-validator.name')}
                        description={tTools('iban-validator.description')}
                        icon={<CreditCard size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center">
                        <div className="mb-8">
                            <label className="block mb-3 text-[#9ca3af] text-[13px]">{t('IbanValidator.inputLabel')}</label>
                            <input
                                type="text" value={iban} onChange={e => validate(e.target.value)}
                                placeholder={t('IbanValidator.placeholder')}
                                className="input-field w-full p-4 text-lg text-center rounded-xl bg-black/30 border border-white/10 text-white font-mono"
                            />
                        </div>

                        {iban.length > 5 && isValid !== null && (
                            <div className={`
                                p-6 rounded-2xl flex items-center justify-center gap-4 border
                                ${isValid ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}
                            `}>
                                {isValid ? <CheckCircle size={32} color="#22c55e" /> : <XCircle size={32} color="#ef4444" />}
                                <div className="text-left">
                                    <div className={`font-bold text-lg ${isValid ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                                        {isValid ? t('IbanValidator.validTitle') : t('IbanValidator.invalidTitle')}
                                    </div>
                                    <div className="text-[13px] text-[#9ca3af] mt-1">
                                        {isValid ? t('IbanValidator.validDesc') : t('IbanValidator.invalidDesc')}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
