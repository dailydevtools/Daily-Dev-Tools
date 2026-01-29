"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function PrimeFactorsClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [num, setNum] = useState("");
    const [factors, setFactors] = useState<number[]>([]);
    const [isPrime, setIsPrime] = useState(false);

    const calculate = (nStr: string) => {
        setNum(nStr);
        const n = parseInt(nStr);
        if (isNaN(n) || n < 2) {
            setFactors([]);
            setIsPrime(false);
            return;
        }

        const f: number[] = [];
        let d = 2;
        let temp = n;
        while (d * d <= temp) {
            while (temp % d === 0) {
                f.push(d);
                temp /= d;
            }
            d++;
        }
        if (temp > 1) f.push(temp);

        setFactors(f);
        setIsPrime(f.length === 1 && f[0] === n);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">
                    <ToolPageHeader
                        title={tTools('prime-factors.name')}
                        description={tTools('prime-factors.description')}
                        icon={<Calculator size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center">
                        <div className="mb-8">
                            <label className="block mb-3 text-[#9ca3af] text-[13px]">{t('PrimeFactors.inputLabel')}</label>
                            <input
                                type="number" value={num} onChange={e => calculate(e.target.value)}
                                className="input-field w-full p-4 text-2xl text-center rounded-xl bg-transparent dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)] outline-none focus:border-[#fb923c]/50 transition-colors"
                                placeholder={t('PrimeFactors.placeholder')}
                            />
                        </div>

                        {factors.length > 0 && (
                            <div>
                                <div className="text-[13px] text-[#9ca3af] mb-3">{t('PrimeFactors.factors')}</div>
                                <div className="text-[32px] font-bold text-[var(--foreground)] flex flex-wrap gap-3 justify-center items-center">
                                    {factors.map((f, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-[#fb923c]">{f}</span>
                                            {i < factors.length - 1 && <span className="text-[#6b7280] text-xl">×</span>}
                                        </div>
                                    ))}
                                </div>
                                <div className={`mt-6 py-2 px-4 rounded-full inline-block ${isPrime ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-white/5 text-[#9ca3af]'}`}>
                                    {isPrime ? t('PrimeFactors.isPrime') : t('PrimeFactors.isComposite')}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
