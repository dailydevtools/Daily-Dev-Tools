"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidInput, LiquidTextArea, LiquidSelect } from "../../../components/ui/LiquidInput";

export default function HmacGeneratorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [message, setMessage] = useState("");
    const [secret, setSecret] = useState("");
    const [algo, setAlgo] = useState("SHA-256");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const generate = async () => {
        setError("");
        try {
            if (!message || !secret) return;

            const enc = new TextEncoder();
            const keyData = enc.encode(secret);
            const msgData = enc.encode(message);

            const key = await window.crypto.subtle.importKey(
                "raw", keyData, { name: "HMAC", hash: algo }, false, ["sign"]
            );

            const signature = await window.crypto.subtle.sign("HMAC", key, msgData);

            // Convert to hex
            const hashArray = Array.from(new Uint8Array(signature));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            setOutput(hashHex);

        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title={tTools('hmac-generator.name')}
                        description={tTools('hmac-generator.description')}
                        icon={<Lock size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-10">
                        <div className="mb-6">
                            <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('HmacGenerator.message')}</label>
                            <LiquidTextArea
                                value={message} onChange={e => setMessage(e.target.value)}
                                placeholder={t('HmacGenerator.inputPlaceholder')}
                                className="h-[120px]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 mb-8">
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('HmacGenerator.secret')}</label>
                                <LiquidInput
                                    type="text" value={secret} onChange={e => setSecret(e.target.value)}
                                    placeholder={t('HmacGenerator.secretPlaceholder')}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('HmacGenerator.algorithm')}</label>
                                <LiquidSelect
                                    value={algo} onChange={e => setAlgo(e.target.value)}
                                >
                                    <option value="SHA-1">SHA-1</option>
                                    <option value="SHA-256">SHA-256</option>
                                    <option value="SHA-384">SHA-384</option>
                                    <option value="SHA-512">SHA-512</option>
                                </LiquidSelect>
                            </div>
                        </div>

                        <LiquidButton onClick={generate} className="w-full mb-8">
                            <Lock size={18} /> {t('HmacGenerator.generate')} HMAC
                        </LiquidButton>

                        {output && (
                            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('common.output')} (Hex)</label>
                                <div className="relative">
                                    <textarea
                                        readOnly
                                        value={output}
                                        className="w-full h-24 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-600 dark:text-green-400 text-sm font-mono outline-none resize-none"
                                    />
                                    <LiquidButton
                                        onClick={() => navigator.clipboard.writeText(output)}
                                        variant="ghost"
                                        className="absolute top-3 right-3 text-xs h-8 px-3"
                                    >
                                        {t('common.copy')}
                                    </LiquidButton>
                                </div>
                            </div>
                        )}
                        {error && <div className="text-red-500 text-sm mt-3 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</div>}
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
