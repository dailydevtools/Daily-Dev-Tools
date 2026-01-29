"use client";

import { useState } from "react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center">
                        <div className="mb-8">
                            <label className="block mb-3 text-[#9ca3af] text-[13px]">{t('inputLabel')}</label>
                            <input
                                type="text"
                                value={input} onChange={e => setInput(e.target.value)}
                                placeholder="Hello World! This is a Title."
                                className="input-field w-full p-4 text-lg rounded-xl bg-transparent dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)] text-center"
                            />
                        </div>

                        {output && (
                            <div className="p-6 bg-[#22c55e]/10 rounded-2xl border border-[#22c55e]/20">
                                <div className="text-[13px] text-[#22c55e] mb-2 font-semibold">{t('generated')}</div>
                                <div className="text-2xl font-bold text-[var(--foreground)] font-mono break-all">{output}</div>
                                <button onClick={() => navigator.clipboard.writeText(output)} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] mt-4 py-2 px-6">{t('copy')}</button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
