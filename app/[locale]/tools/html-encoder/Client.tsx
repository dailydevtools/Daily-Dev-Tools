"use client";

import { useState } from "react";
import { Code, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="flex justify-center mb-8">
                        <div className="bg-white/5 p-1 rounded-xl flex gap-1">
                            <button
                                onClick={() => { setMode("encode"); setInput(""); setOutput(""); }}
                                className={`py-2 px-6 rounded-lg border-none cursor-pointer font-medium transition-colors ${mode === 'encode' ? 'bg-[#fb923c] text-black' : 'bg-transparent text-[#9ca3af]'}`}
                            >
                                {t('HtmlEncoder.encode')}
                            </button>
                            <button
                                onClick={() => { setMode("decode"); setInput(""); setOutput(""); }}
                                className={`py-2 px-6 rounded-lg border-none cursor-pointer font-medium transition-colors ${mode === 'decode' ? 'bg-[#fb923c] text-black' : 'bg-transparent text-[#9ca3af]'}`}
                            >
                                {t('HtmlEncoder.decode')}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden">
                            <textarea
                                value={input} onChange={e => setInput(e.target.value)}
                                placeholder={mode === 'encode' ? '<div class="foo">Bar</div>' : '&lt;div class=&quot;foo&quot;&gt;Bar&lt;/div&gt;'}
                                className="w-full h-[200px] bg-transparent border-none p-5 text-white font-mono resize-y outline-none"
                            />
                        </div>

                        <button onClick={process} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] justify-self-center py-3 px-8">
                            {mode === 'encode' ? t('HtmlEncoder.encode') : t('HtmlEncoder.decode')} HTML
                        </button>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden relative">
                            <textarea
                                readOnly
                                value={output}
                                placeholder={t('HtmlEncoder.resultPlaceholder')}
                                className="w-full h-[200px] bg-transparent border-none p-5 text-white font-mono resize-y outline-none"
                            />
                            <button onClick={() => navigator.clipboard.writeText(output)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] absolute top-3 right-3 flex items-center gap-2">
                                <Copy size={14} /> {t('common.copy')}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
