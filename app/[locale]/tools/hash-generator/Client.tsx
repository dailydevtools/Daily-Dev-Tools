"use client";

import { useState } from "react";
import { Copy, Check, Hash } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-2xl mb-8">
                        <label className="block text-sm font-medium text-[#fb923c] mb-3">{t('inputText')}</label>
                        <textarea
                            value={input}
                            onChange={(e) => generateHashes(e.target.value)}
                            placeholder={t('placeholder')}
                            className="w-full h-[100px] bg-black/20 rounded-lg border border-white/5 p-4 font-mono text-sm text-[#e5e7eb] resize-none outline-none"
                        />
                    </div>

                    <div className="grid gap-4">
                        {algorithms.map((algo) => {
                            const hash = hashes[algo.algo];
                            return (
                                <div key={algo.algo} className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-xl overflow-hidden">
                                    <div className="flex items-center justify-between py-4 px-5 bg-white/5">
                                        <span className="font-semibold text-white">{algo.name}</span>
                                        <button
                                            onClick={() => copyToClipboard(hash, algo.algo)}
                                            disabled={!input}
                                            className={`p-2 bg-transparent border-none ${input ? 'cursor-pointer hover:bg-white/10' : 'cursor-not-allowed opacity-50'} rounded-lg transition-colors duration-200 ${copied === algo.algo ? 'text-[#22c55e]' : 'text-[#9ca3af]'}`}
                                        >
                                            {copied === algo.algo ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                    <div className="py-4 px-5">
                                        <code className={`text-[13px] font-mono break-all ${input ? 'text-[#4ade80]' : 'text-[#6b7280]'}`}>
                                            {input ? hash : t('waiting')}
                                        </code>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
