"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                        icon={<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-xl font-bold text-black">M</div>}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('MacGenerator.format')}</label>
                                <select value={format} onChange={e => setFormat(e.target.value)} className="w-full p-3 rounded-xl bg-[#111] border border-[#333] text-white">
                                    <option value="Colon">MM:MM:MM:SS:SS:SS</option>
                                    <option value="Dash">MM-MM-MM-SS-SS-SS</option>
                                    <option value="Dot">MMMM.MMSS.SSSS</option>
                                    <option value="None">MMMMMMSSSSSS</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('MacGenerator.quantity')}</label>
                                <input type="number" min="1" max="50" value={count} onChange={e => setCount(Number(e.target.value))} className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white" />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="flex items-center gap-3 text-white cursor-pointer">
                                <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} className="accent-[#fb923c]" />
                                {t('MacGenerator.uppercase')}
                            </label>
                        </div>

                        <button onClick={generate} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] w-full p-4 mb-8 flex items-center justify-center gap-2">
                            <RefreshCw size={20} /> {t('MacGenerator.generate')}
                        </button>

                        <div className="flex flex-col gap-2">
                            {macs.map((mac, i) => (
                                <div key={i} className="flex justify-between p-4 bg-white/5 rounded-lg">
                                    <span className="font-mono text-[#fb923c] text-base">{mac}</span>
                                    <button onClick={() => navigator.clipboard.writeText(mac)} className="bg-transparent border-none text-[#9ca3af] cursor-pointer hover:text-white transition-colors">
                                        <Copy size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
