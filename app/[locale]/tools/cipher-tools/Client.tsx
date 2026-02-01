"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput, LiquidTextArea } from "../../../components/ui/LiquidInput";
import LiquidTabs from "../../../components/ui/LiquidTabs";
export default function CipherToolsClient() {
    const t = useTranslations('ToolPage');
    const [input, setInput] = useState("");
    const [shift, setShift] = useState(13); // Default ROT13
    const [output, setOutput] = useState("");

    const process = (s: number) => {
        // Caesar Cipher Logic
        const result = input.replace(/[a-zA-Z]/g, (char) => {
            const base = char <= 'Z' ? 65 : 97;
            // (codepoint - base + shift) % 26 + base
            // Handle negative shift
            return String.fromCharCode(((char.charCodeAt(0) - base + s) % 26 + 26) % 26 + base);
        });
        setOutput(result);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title="Cipher Tools"
                        description="Encrypt and decrypt text with simple shift ciphers (Caesar, ROT13)."
                        icon={<Lock size={28} className="text-[#fb923c]" />}
                    />

                    <div className="flex justify-center mb-6">
                        <LiquidTabs
                            tabs={['rot13', 'caesar', 'shift1']}
                            activeTab={shift === 13 ? 'rot13' : shift === 3 ? 'caesar' : shift === 1 ? 'shift1' : 'custom'}
                            onChange={(t) => {
                                const newShift = t === 'rot13' ? 13 : t === 'caesar' ? 3 : 1;
                                setShift(newShift);
                                process(newShift);
                            }}
                            labels={{
                                rot13: t('CipherTools.rot13'),
                                caesar: t('CipherTools.caesar'),
                                shift1: `${t('CipherTools.shift')} +1`
                            }}
                        />
                    </div>

                    <LiquidCard className="p-8 mb-6">
                        <div className="mb-5">
                            <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('CipherTools.shift')}</label>
                            <LiquidInput
                                type="number" value={shift}
                                onChange={e => { setShift(Number(e.target.value)); process(Number(e.target.value)); }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('common.input')}</label>
                                <LiquidTextArea
                                    value={input}
                                    onChange={e => { setInput(e.target.value); setTimeout(() => process(shift), 0); }}
                                    placeholder={t('CipherTools.inputPlaceholder')}
                                    className="h-[200px]"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('common.output')}</label>
                                <LiquidTextArea
                                    readOnly
                                    value={output}
                                    placeholder={t('CipherTools.outputPlaceholder')}
                                    className="h-[200px] text-orange-500"
                                />
                            </div>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
