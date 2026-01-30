"use client";

import { useState } from "react";
import { Copy, Check, Hash } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function HashGeneratorClient() {
    const [input, setInput] = useState("");
    const [hashes, setHashes] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState<string | null>(null);
    const t = useTranslations('ToolPage.HashGenerator');
    const tTools = useTranslations('Tools');

    const algorithms = [
        { name: "SHA-1", algo: "SHA-1" },
        { name: "SHA-256", algo: "SHA-256" },
        { name: "SHA-384", algo: "SHA-384" },
        { name: "SHA-512", algo: "SHA-512" },
    ];

    const generateHashes = async (text: string) => {
        setInput(text);
        if (!text) {
            setHashes({});
            return;
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        const newHashes: Record<string, string> = {};

        for (const alg of algorithms) {
            try {
                const hashBuffer = await crypto.subtle.digest(alg.algo, data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                newHashes[alg.algo] = hashHex;
            } catch (e) {
                newHashes[alg.algo] = "Error";
            }
        }

        setHashes(newHashes);
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[900px] mx-auto">
                    <ToolPageHeader
                        title={tTools('hash-generator.name')}
                        description={tTools('hash-generator.description')}
                        icon={<Hash size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-0 mb-8 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all">
                        <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5 opacity-60">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                                <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('inputText')}</span>
                            </div>
                            <span className="text-xs text-[var(--muted-text)] font-mono">{input.length} chars</span>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => generateHashes(e.target.value)}
                            placeholder={t('placeholder')}
                            className="flex-1 w-full h-[150px] bg-transparent border-none p-5 font-mono text-[14px] text-[var(--foreground)] resize-none outline-none placeholder:text-[var(--muted-text)] leading-relaxed"
                            spellCheck={false}
                        />
                    </LiquidCard>

                    <div className="grid gap-4">
                        {algorithms.map((algo) => {
                            const hash = hashes[algo.algo];
                            return (
                                <LiquidCard key={algo.algo} className="p-0 overflow-hidden">
                                    <div className="flex items-center justify-between py-3 px-5 bg-neutral-50/50 dark:bg-white/5 border-b border-[var(--border-color)]">
                                        <span className="font-semibold text-[var(--foreground)] text-sm">{algo.name}</span>
                                        <LiquidButton
                                            variant="ghost"
                                            onClick={() => copyToClipboard(hash, algo.algo)}
                                            disabled={!input}
                                            className="h-8 w-8 p-0"
                                            title="Copy Hash"
                                        >
                                            {copied === algo.algo ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                        </LiquidButton>
                                    </div>
                                    <div className="p-5 font-mono text-sm break-all">
                                        {input ? (
                                            <span className="text-green-600 dark:text-green-400">{hash}</span>
                                        ) : (
                                            <span className="text-[var(--muted-text)] italic opacity-50">{t('waiting')}</span>
                                        )}
                                    </div>
                                </LiquidCard>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
