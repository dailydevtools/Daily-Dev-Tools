"use client";

import { useState, useEffect } from "react";
import { Check, RefreshCw, CopyCheck, Fingerprint } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import CopyButton from "../../../components/ui/CopyButton";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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
            <div className="relative z-10 pb-[60px] px-6 pt-6">
                <div className="max-w-[900px] mx-auto">

                    <ToolPageHeader
                        title={tTools('uuid-generator.name')}
                        description={tTools('uuid-generator.description')}
                        icon={<Fingerprint size={28} className="text-[#fb923c]" />}
                    />

                    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                        <LiquidCard className="p-0 overflow-hidden flex items-center h-11 w-auto pr-2 group focus-within:ring-2 ring-orange-500/20 transition-all">
                            <span className="px-4 text-xs font-medium text-[var(--muted-text)] border-r border-[var(--border-color)] bg-neutral-50/50 dark:bg-white/5 h-full flex items-center uppercase tracking-wider">
                                {t('UuidGenerator.generateCount')}
                            </span>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-20 bg-transparent border-none text-[var(--foreground)] px-3 text-center outline-none h-full font-mono text-sm"
                            />
                        </LiquidCard>

                        <LiquidButton onClick={generateUuids} className="h-11 px-6 shadow-lg hover:shadow-xl">
                            <RefreshCw size={16} className="mr-2" /> {t('UuidGenerator.generate')}
                        </LiquidButton>

                        <LiquidButton onClick={copyAll} variant="ghost" className="h-11 px-6 border border-[var(--border-color)] text-[var(--muted-text)] hover:text-[var(--foreground)]">
                            {copied ? <Check size={16} className="text-green-500 mr-2" /> : <CopyCheck size={16} className="mr-2" />}
                            {t('UuidGenerator.copyAll')}
                        </LiquidButton>
                    </div>

                    <div className="grid gap-3">
                        {uuids.map((uuid, i) => (
                            <LiquidCard key={i} className="p-0 overflow-hidden flex items-center justify-between transition-all hover:-translate-y-1 hover:shadow-md group">
                                <div className="p-4 px-6 font-mono text-green-600 dark:text-green-400 text-base break-all">
                                    {uuid}
                                </div>
                                <div className="pr-4">
                                    <CopyButton
                                        text={uuid}
                                        className="text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-neutral-100 dark:hover:bg-white/10"
                                    />
                                </div>
                            </LiquidCard>
                        ))}
                    </div>

                    <div className="text-center mt-8 text-[var(--muted-text)] text-[13px] opacity-70">
                        {t('UuidGenerator.generatedAt', { time: lastGenerated })}
                    </div>

                </div>
            </div>
        </main>
    );
}
