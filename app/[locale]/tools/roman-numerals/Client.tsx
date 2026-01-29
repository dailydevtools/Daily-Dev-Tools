"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";

export default function RomanNumeralsClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [num, setNum] = useState("");
    const [roman, setRoman] = useState("");

    const toRoman = (n: number) => {
        if (isNaN(n) || n <= 0 || n >= 4000) return "";
        const map: any = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
        let r = '';
        for (const i in map) {
            while (n >= map[i]) {
                r += i;
                n -= map[i];
            }
        }
        return r;
    };

    const toNum = (r: string) => {
        if (!r) return "";
        const map: any = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
        let n = 0;
        let i = 0;
        r = r.toUpperCase();
        while (i < r.length) {
            const curr = map[r[i]];
            const next = map[r[i + 1]];
            if (next && next > curr) {
                n += next - curr;
                i += 2;
            } else {
                n += curr;
                i++;
            }
        }
        return isNaN(n) ? "" : n.toString();
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title={tTools('roman-numerals.name')}
                        description={tTools('roman-numerals.description')}
                        icon={<ToolIcon name="Hash" size={32} />}
                    />

                    <LiquidCard className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <label className="block mb-3 text-[var(--muted-text)] text-[13px]">{t('RomanNumerals.decimal')}</label>
                            <LiquidInput
                                type="number" value={num} onChange={e => { setNum(e.target.value); setRoman(toRoman(Number(e.target.value))); }}
                                className="text-2xl text-center h-16 w-full" placeholder={t('RomanNumerals.decimalPlaceholder')}
                            />
                        </div>

                        <div>
                            <label className="block mb-3 text-[var(--muted-text)] text-[13px]">{t('RomanNumerals.roman')}</label>
                            <LiquidInput
                                type="text" value={roman} onChange={e => { setRoman(e.target.value.toUpperCase()); setNum(toNum(e.target.value)); }}
                                className="text-2xl text-center h-16 w-full text-orange-500" placeholder={t('RomanNumerals.placeholder')}
                            />
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
