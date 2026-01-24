"use client";

import { useState } from "react";
import { Dices } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="flex gap-3 mb-8 overflow-x-auto pb-1">
                        {[
                            { id: 'number', label: t('numberGen') },
                            { id: 'list', label: t('listGen') },
                            { id: 'coin', label: t('coinGen') }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setTab(item.id as any)}
                                className={`capitalize px-6 py-2 rounded-full font-medium transition-colors ${tab === item.id ? 'inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]' : 'inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
                        {tab === 'number' && (
                            <div>
                                <div className="grid grid-cols-2 gap-5 mb-6">
                                    <div>
                                        <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('min')}</label>
                                        <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('max')}</label>
                                        <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white" />
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('count')}</label>
                                    <input type="number" value={count} min={1} max={100} onChange={(e) => setCount(Number(e.target.value))} className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white" />
                                </div>
                                <button onClick={generateNumbers} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] w-full py-3">{t('generate')}</button>

                                {numbers.length > 0 && (
                                    <div className="mt-8 flex flex-wrap gap-3 justify-center">
                                        {numbers.map((n, i) => (
                                            <div key={i} className="w-16 h-16 rounded-full bg-[#22c55e] text-black flex items-center justify-center font-bold text-xl">{n}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === 'list' && (
                            <div>
                                <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('listLabel')}</label>
                                <textarea
                                    value={listInput}
                                    onChange={(e) => setListInput(e.target.value)}
                                    className="w-full h-[200px] p-4 rounded-xl bg-white/5 border border-white/10 text-white mb-6 font-mono resize-y"
                                />
                                <button onClick={pickFromList} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] w-full py-3">{t('pick')}</button>

                                {picked && (
                                    <div className="mt-10 text-center">
                                        <div className="text-sm text-[#9ca3af] mb-3">{t('winner')}</div>
                                        <div className="text-[32px] font-bold text-[#facc15]">{picked}</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === 'coin' && (
                            <div className="text-center py-10">
                                <button onClick={flipCoin} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-4 px-10 text-lg flex items-center gap-3 mx-auto">
                                    <Dices size={24} /> {t('flip')}
                                </button>

                                {coinResult && (
                                    <div className="mt-10">
                                        <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#f97316] to-[#facc15] flex items-center justify-center text-2xl font-bold text-black mx-auto shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                                            {coinResult}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
