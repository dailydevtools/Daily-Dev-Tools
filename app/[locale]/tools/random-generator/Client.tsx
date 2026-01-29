"use client";

import { useState } from "react";
import { Dices } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function RandomGeneratorClient() {
    const t = useTranslations('RandomGenerator');
    const [tab, setTab] = useState<'number' | 'list' | 'coin'>('number');

    // Number
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [count, setCount] = useState(1);
    const [numbers, setNumbers] = useState<number[]>([]);

    // List
    const [listInput, setListInput] = useState("Apple\nBanana\nOrange\nMango");
    const [picked, setPicked] = useState("");

    // Coin
    const [coinResult, setCoinResult] = useState<string | null>(null);

    const generateNumbers = () => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        setNumbers(arr);
    };

    const pickFromList = () => {
        const items = listInput.split('\n').filter(line => line.trim() !== '');
        const random = items[Math.floor(Math.random() * items.length)];
        setPicked(random);
    };

    const flipCoin = () => {
        setCoinResult(Math.random() > 0.5 ? t('heads') : t('tails'));
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="Random Generator Suite"
                        description="Generate random numbers, pick items from lists, or flip a virtual coin."
                        icon={<Dices size={28} className="text-[#fb923c]" />}
                    />

                    <div className="flex justify-center gap-3 mb-8 overflow-x-auto pb-1">
                        {[
                            { id: 'number', label: t('numberGen') },
                            { id: 'list', label: t('listGen') },
                            { id: 'coin', label: t('coinGen') }
                        ].map((item) => (
                            <LiquidButton
                                key={item.id}
                                onClick={() => setTab(item.id as any)}
                                variant={tab === item.id ? "primary" : "ghost"}
                                className={`rounded-full h-11 px-6 transition-all ${tab === item.id ? '' : 'border border-[var(--border-color)] text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                            >
                                {item.label}
                            </LiquidButton>
                        ))}
                    </div>

                    <LiquidCard className="p-8">
                        {tab === 'number' && (
                            <div>
                                <div className="grid grid-cols-2 gap-5 mb-6">
                                    <div>
                                        <label className="block text-[var(--muted-text)] mb-2 text-[13px]">{t('min')}</label>
                                        <LiquidInput type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} />
                                    </div>
                                    <div>
                                        <label className="block text-[var(--muted-text)] mb-2 text-[13px]">{t('max')}</label>
                                        <LiquidInput type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} />
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <label className="block text-[var(--muted-text)] mb-2 text-[13px]">{t('count')}</label>
                                    <LiquidInput type="number" value={count} min={1} max={100} onChange={(e) => setCount(Number(e.target.value))} />
                                </div>
                                <LiquidButton onClick={generateNumbers} className="w-full h-11">
                                    {t('generate')}
                                </LiquidButton>

                                {numbers.length > 0 && (
                                    <div className="mt-8 flex flex-wrap gap-3 justify-center">
                                        {numbers.map((n, i) => (
                                            <div key={i} className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-green-500/20">{n}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === 'list' && (
                            <div>
                                <label className="block text-[var(--muted-text)] mb-2 text-[13px]">{t('listLabel')}</label>
                                <textarea
                                    value={listInput}
                                    onChange={(e) => setListInput(e.target.value)}
                                    className="w-full h-[200px] p-4 rounded-xl bg-neutral-100/50 dark:bg-black/30 border border-black/5 dark:border-white/10 text-[var(--foreground)] mb-6 font-mono resize-y focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-[var(--muted-text)]"
                                />
                                <LiquidButton onClick={pickFromList} className="w-full h-11">
                                    {t('pick')}
                                </LiquidButton>

                                {picked && (
                                    <div className="mt-10 text-center">
                                        <div className="text-sm text-[var(--muted-text)] mb-3">{t('winner')}</div>
                                        <div className="text-[32px] font-bold text-yellow-400 animate-in fade-in zoom-in duration-300">{picked}</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === 'coin' && (
                            <div className="text-center py-10">
                                <LiquidButton onClick={flipCoin} className="mx-auto h-14 px-10 text-lg gap-3">
                                    <Dices size={24} /> {t('flip')}
                                </LiquidButton>

                                {coinResult && (
                                    <div className="mt-10">
                                        <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-2xl font-bold text-black mx-auto shadow-[0_0_40px_rgba(249,115,22,0.4)] animate-in spin-in-180 duration-500">
                                            {coinResult}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </LiquidCard>
                </div>
            </div>
        </main>
    );
}
