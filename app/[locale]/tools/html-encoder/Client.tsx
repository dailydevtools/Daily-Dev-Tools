"use client";

import { useState } from "react";
import { Code, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidTextArea } from "../../../components/ui/LiquidInput";
import LiquidTabs from "../../../components/ui/LiquidTabs";

export default function HtmlEncoderClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");

    const process = () => {
        if (mode === "encode") {
            setOutput(
                input.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;")
            );
        } else {
            const doc = new DOMParser().parseFromString(input, "text/html");
            setOutput(doc.documentElement.textContent || "");
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title={tTools('html-encoder.name')}
                        description={tTools('html-encoder.description')}
                        icon={<Code size={28} className="text-[#fb923c]" />}
                    />

                    <div className="flex justify-center mb-10">
                        <LiquidTabs
                            tabs={['encode', 'decode']}
                            activeTab={mode}
                            onChange={(m) => { setMode(m as any); setInput(""); setOutput(""); }}
                            labels={{
                                encode: t('HtmlEncoder.encode'),
                                decode: t('HtmlEncoder.decode')
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <LiquidCard className="p-0 overflow-hidden group focus-within:ring-2 ring-orange-500/20 transition-all">
                            <LiquidTextArea
                                value={input} onChange={e => setInput(e.target.value)}
                                placeholder={mode === 'encode' ? '<div class="foo">Bar</div>' : '&lt;div class=&quot;foo&quot;&gt;Bar&lt;/div&gt;'}
                                className="h-[200px] border-none rounded-none focus:ring-0 text-base p-6 resize-none"
                            />
                        </LiquidCard>

                        <div className="flex justify-center">
                            <LiquidButton onClick={process} className="px-10 py-4 text-base">
                                {mode === 'encode' ? t('HtmlEncoder.encode') : t('HtmlEncoder.decode')} HTML
                            </LiquidButton>
                        </div>

                        <LiquidCard className="p-0 overflow-hidden relative group">
                            <textarea
                                readOnly
                                value={output}
                                placeholder={t('HtmlEncoder.resultPlaceholder')}
                                className="w-full h-[200px] bg-neutral-50/50 dark:bg-neutral-900/30 border-none p-6 text-[var(--foreground)] font-mono resize-none outline-none text-sm"
                            />
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <LiquidButton
                                    variant="ghost"
                                    onClick={() => navigator.clipboard.writeText(output)}
                                    className="h-8 px-3 text-xs bg-white/80 dark:bg-black/50 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-black"
                                >
                                    <Copy size={14} className="mr-1.5" /> {t('common.copy')}
                                </LiquidButton>
                            </div>
                        </LiquidCard>
                    </div>

                </div>
            </div>
        </main>
    );
}
