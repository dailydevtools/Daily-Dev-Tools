"use client";

import { useState } from "react";
import { CreditCard, CheckCircle, XCircle, ShieldCheck } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function CreditCardValidatorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [number, setNumber] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [brand, setBrand] = useState("");

    const validate = (val: string) => {
        // Allow formatting chars but strip them for validation
        const cleanVal = val.replace(/[^0-9\s-]/g, '');
        setNumber(cleanVal);

        const num = cleanVal.replace(/\D/g, '');

        if (num.length < 13) { // Min length usually
            if (num.length === 0) {
                setIsValid(null);
                setBrand("");
            } else {
                setIsValid(null); // Reset validity while typing
            }
        }

        if (num.length >= 13) {
            // Luhn Algorithm
            let sum = 0;
            let shouldDouble = false;
            for (let i = num.length - 1; i >= 0; i--) {
                let digit = parseInt(num.charAt(i));
                if (shouldDouble) {
                    if ((digit *= 2) > 9) digit -= 9;
                }
                sum += digit;
                shouldDouble = !shouldDouble;
            }
            setIsValid(sum % 10 === 0);

            // Brand Detection
            if (/^4/.test(num)) setBrand("Visa");
            else if (/^5[1-5]/.test(num)) setBrand("Mastercard");
            else if (/^3[47]/.test(num)) setBrand("American Express");
            else if (/^6(?:011|5)/.test(num)) setBrand("Discover");
            else setBrand("Unknown");
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">

                    <ToolPageHeader
                        title={tTools('credit-card-validator.name')}
                        description={tTools('credit-card-validator.description')}
                        icon={<CreditCard size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">

                        <div className="mb-8 relative">
                            <label className="block mb-3 text-[#9ca3af] text-[13px] font-medium uppercase tracking-wider">{t('CreditCardValidator.cardNumber')}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={number}
                                    onChange={(e) => validate(e.target.value)}
                                    placeholder={t('CreditCardValidator.placeholder')}
                                    maxLength={24}
                                    className="input-field w-full p-4 pl-12 text-xl rounded-xl bg-black/30 border border-white/10 text-white font-mono placeholder:text-white/20 transition-all focus:border-[#fb923c] outline-none"
                                />
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={20} />
                            </div>
                        </div>

                        {isValid !== null && number.replace(/\D/g, '').length >= 13 && (
                            <div className={`p-6 rounded-2xl border flex items-center gap-5 transition-all duration-300 ${isValid ? 'bg-green-500/10 border-[#22c55e]/30' : 'bg-red-500/10 border-[#ef4444]/30'}`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isValid ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-[#ef4444]/20 text-[#ef4444]'}`}>
                                    {isValid ? <CheckCircle size={24} /> : <XCircle size={24} />}
                                </div>
                                <div>
                                    <div className={`text-lg font-bold mb-1 ${isValid ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                                        {isValid ? t('CreditCardValidator.valid') : t('CreditCardValidator.invalid')}
                                    </div>
                                    {brand && (
                                        <div className="text-white/80 text-sm flex items-center gap-2">
                                            <ShieldCheck size={14} /> {t('CreditCardValidator.cardType')}: <span className="text-white font-semibold">{brand}</span>
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
