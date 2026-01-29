"use client";

import { useState } from "react";
import { CheckCircle, XCircle, CreditCard } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

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

                    <LiquidCard className="p-10 text-center">
                        <div className="mb-8">
                            <label className="block mb-3 text-[var(--muted-text)] text-sm font-medium">{t('IbanValidator.inputLabel')}</label>
                            <LiquidInput
                                type="text" value={iban} onChange={e => validate(e.target.value)}
                                placeholder={t('IbanValidator.placeholder')}
                                className="text-center font-mono text-lg h-14"
                            />
                        </div>

                        {iban.length > 5 && isValid !== null && (
                            <div className={`
                                p-6 rounded-2xl flex items-center justify-center gap-4 border animate-in fade-in zoom-in duration-300
                                ${isValid ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}
                            `}>
                                {isValid ? <CheckCircle size={32} className="text-green-500" /> : <XCircle size={32} className="text-red-500" />}
                                <div className="text-left">
                                    <div className={`font-bold text-lg ${isValid ? 'text-green-500' : 'text-red-500'}`}>
                                        {isValid ? t('IbanValidator.validTitle') : t('IbanValidator.invalidTitle')}
                                    </div>
                                    <div className="text-sm text-[var(--muted-text)] mt-1">
                                        {isValid ? t('IbanValidator.validDesc') : t('IbanValidator.invalidDesc')}
                                    </div>
                                </div>
                            </div>
                        )}
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
