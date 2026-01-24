"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="mb-6">
                            <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('HmacGenerator.message')}</label>
                            <textarea
                                value={message} onChange={e => setMessage(e.target.value)}
                                placeholder={t('HmacGenerator.inputPlaceholder')}
                                className="input-field w-full h-[100px] p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                            />
                        </div>

                        <div className="grid grid-cols-[1fr_150px] gap-6 mb-6">
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('HmacGenerator.secret')}</label>
                                <input
                                    type="text" value={secret} onChange={e => setSecret(e.target.value)}
                                    placeholder={t('HmacGenerator.secretPlaceholder')}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('HmacGenerator.algorithm')}</label>
                                <select
                                    value={algo} onChange={e => setAlgo(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-[#111] border border-[#333] text-white"
                                >
                                    <option value="SHA-1">SHA-1</option>
                                    <option value="SHA-256">SHA-256</option>
                                    <option value="SHA-384">SHA-384</option>
                                    <option value="SHA-512">SHA-512</option>
                                </select>
                            </div>
                        </div>

                        <button onClick={generate} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] w-full p-3 flex items-center justify-center gap-2">
                            <Lock size={18} /> {t('HmacGenerator.generate')} HMAC
                        </button>

                        {output && (
                            <div className="mt-6">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('common.output')} (Hex)</label>
                                <div className="relative">
                                    <textarea
                                        readOnly
                                        value={output}
                                        className="w-full h-20 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-[#22c55e] text-sm font-mono"
                                    />
                                    <button onClick={() => navigator.clipboard.writeText(output)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] absolute top-3 right-3 py-1 px-3 text-xs">{t('common.copy')}</button>
                                </div>
                            </div>
                        )}
                        {error && <div className="text-[#ef4444] mt-3">{error}</div>}
                    </div>

                </div>
            </div>
        </main>
    );
}
