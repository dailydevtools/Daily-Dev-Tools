"use client";

import { useState } from "react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";

export default function SlugGeneratorClient() {
    const t = useTranslations('SlugGenerator');
    const [input, setInput] = useState("");

    const process = (text: string) => {
        // Lowercase
        // Replace non-alphanum with -
        // Remove dupe hyphens
        // Trim hyphens
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '') // remove non-word chars except hyphen/space
            .replace(/[\s]+/g, '-')     // replace space with hyphen
            .replace(/-+/g, '-')        // remove invalid chars
            .replace(/^-+/, '')         // trim start
            .replace(/-+$/, '');        // trim end
    };

    const output = process(input);

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="Slug Generator"
                        description="Convert titles to URL-friendly slugs case-insensitively."
                        icon={<ToolIcon name="Link2" size={32} />}
                    />

                    <LiquidCard className="p-8 md:p-12 text-center">
                        <div className="mb-10">
                            <label className="block mb-4 text-[var(--muted-text)] text-xs uppercase font-bold tracking-widest">{t('inputLabel')}</label>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Hello World! This is a Title."
                                className="w-full p-5 text-xl rounded-2xl bg-neutral-100/50 dark:bg-white/5 border border-[var(--border-color)] text-[var(--foreground)] text-center outline-none focus:ring-2 ring-orange-500/20 transition-all placeholder:opacity-30"
                                spellCheck={false}
                            />
                        </div>

                        {output && (
                            <div className="p-8 bg-green-500/5 dark:bg-green-500/10 rounded-2xl border border-green-500/20 animate-in fade-in zoom-in duration-300">
                                <div className="text-[11px] text-green-600 dark:text-green-400 mb-3 font-bold uppercase tracking-widest">{t('generated')}</div>
                                <div className="text-2xl md:text-3xl font-bold text-[var(--foreground)] font-mono break-all mb-6">{output}</div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(output);
                                        // Optional: add a tiny feedback here if needed, but the button already has transitions
                                    }}
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-bold text-sm px-8 py-3.5 rounded-xl border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] active:scale-95"
                                >
                                    {t('copy')}
                                </button>
                            </div>
                        )}
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
