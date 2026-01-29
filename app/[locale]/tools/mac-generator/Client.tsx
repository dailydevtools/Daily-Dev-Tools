"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidInput, LiquidSelect } from "../../../components/ui/LiquidInput";

export default function MacGeneratorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [macs, setMacs] = useState<string[]>([]);
    const [count, setCount] = useState(5);
    const [format, setFormat] = useState("Colon");
    const [uppercase, setUppercase] = useState(true);

    const generate = () => {
        const newMacs = [];
        for (let i = 0; i < count; i++) {
            const arr = new Uint8Array(6);
            crypto.getRandomValues(arr);
            // Set unicast locally administered (x2/x6/xA/xE)
            arr[0] = (arr[0] & 0xfc) | 0x02;

            let m = Array.from(arr).map(b => b.toString(16).padStart(2, '0'));

            if (uppercase) m = m.map(s => s.toUpperCase());

            if (format === "Colon") newMacs.push(m.join(':'));
            else if (format === "Dash") newMacs.push(m.join('-'));
            else if (format === "Dot") newMacs.push(`${m[0]}${m[1]}.${m[2]}${m[3]}.${m[4]}${m[5]}`);
            else newMacs.push(m.join(''));
        }
        setMacs(newMacs);
    };

    useEffect(() => {
        generate();
    }, []);

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">
                    {/* Header */}
                    <ToolPageHeader
                        title={tTools('mac-generator.name')}
                        description={tTools('mac-generator.description')}
                        icon={<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-xl font-bold text-black shadow-lg shadow-orange-500/20">M</div>}
                    />

                    <LiquidCard className="p-8">
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('MacGenerator.format')}</label>
                                <LiquidSelect value={format} onChange={e => setFormat(e.target.value)}>
                                    <option value="Colon">MM:MM:MM:SS:SS:SS</option>
                                    <option value="Dash">MM-MM-MM-SS-SS-SS</option>
                                    <option value="Dot">MMMM.MMSS.SSSS</option>
                                    <option value="None">MMMMMMSSSSSS</option>
                                </LiquidSelect>
                            </div>
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('MacGenerator.quantity')}</label>
                                <LiquidInput type="number" min="1" max="50" value={count} onChange={e => setCount(Number(e.target.value))} />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="flex items-center gap-3 text-[var(--foreground)] cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={uppercase}
                                    onChange={e => setUppercase(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 transition-colors bg-white/10 border-white/10"
                                />
                                <span className="group-hover:text-orange-500 transition-colors">{t('MacGenerator.uppercase')}</span>
                            </label>
                        </div>

                        <LiquidButton onClick={generate} className="w-full mb-8 py-4 text-base shadow-orange-500/20 shadow-lg">
                            <RefreshCw size={20} className="mr-2" /> {t('MacGenerator.generate')}
                        </LiquidButton>

                        <div className="flex flex-col gap-3">
                            {macs.map((mac, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-neutral-100/50 dark:bg-white/5 rounded-xl border border-[var(--border-color)] group hover:border-orange-500/30 transition-all">
                                    <span className="font-mono text-[var(--foreground)] text-base group-hover:text-orange-500 transition-colors">{mac}</span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(mac);
                                            // Optional: Show toast
                                        }}
                                        className="bg-transparent border-none text-[var(--muted-text)] cursor-pointer hover:text-[var(--foreground)] transition-colors p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-white/10"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </LiquidCard>
                </div>
            </div>
        </main>
    );
}
