"use client";

import { useState, useEffect } from "react";
import { Check, RefreshCw, CopyCheck, Fingerprint } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import CopyButton from "../../../components/ui/CopyButton";

export default function UuidGeneratorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [uuids, setUuids] = useState<string[]>([]);
    const [amount, setAmount] = useState(1);
    const [copied, setCopied] = useState(false);
    const [lastGenerated, setLastGenerated] = useState<string>("");

    useEffect(() => {
        if (uuids.length === 0) {
            generateUuids();
        }
    }, []);

    const generateUuids = () => {
        // Basic implementation since we don't have the uuid package installed yet
        const generateOne = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        const newUuids = [];
        for (let i = 0; i < amount; i++) {
            newUuids.push(generateOne());
        }
        setUuids(newUuids);
        setLastGenerated(new Date().toLocaleTimeString());
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copyAll = () => {
        copyToClipboard(uuids.join('\n'));
    }

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pb-16 px-6 pt-6">
                <div className="max-w-[900px] mx-auto">

                    <ToolPageHeader
                        title={tTools('uuid-generator.name')}
                        description={tTools('uuid-generator.description')}
                        icon={<Fingerprint size={28} className="text-[#fb923c]" />}
                    />

                    <div className="flex items-center gap-4 mb-6 bg-white/5 p-4 rounded-xl">
                        <div className="flex items-center gap-2">
                            <span className="text-[#9ca3af] text-sm">{t('UuidGenerator.generateCount')}</span>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="bg-black/30 border border-white/10 text-white p-2 rounded-lg w-20 text-sm outline-none"
                            />
                        </div>
                        <button onClick={generateUuids} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-2 px-6 flex items-center gap-2">
                            <RefreshCw size={16} /> {t('UuidGenerator.generate')}
                        </button>
                        <button onClick={copyAll} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2 px-6 flex items-center gap-2">
                            {copied ? <Check size={16} className="text-[#22c55e]" /> : <CopyCheck size={16} />}
                            {t('UuidGenerator.copyAll')}
                        </button>
                    </div>

                    <div className="grid gap-3">
                        {uuids.map((uuid, i) => (
                            <div key={i} className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 flex items-center justify-between p-4 px-6 rounded-xl">
                                <code className="text-base text-[#4ade80] font-mono">{uuid}</code>
                                <CopyButton
                                    text={uuid}
                                    className="text-[#9ca3af] hover:bg-white/10"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8 text-[#6b7280] text-[13px]">
                        {t('UuidGenerator.generatedAt', { time: lastGenerated })}
                    </div>

                </div>
            </div>
        </main>
    );
}
