"use client";

import { useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, Shuffle, Trash2, List } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function ListSorterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("");

    const process = (action: string) => {
        let lines = input.split('\n');
        // Filter empty? Maybe not, preserve structure.

        switch (action) {
            case 'az': lines.sort(); break;
            case 'za': lines.sort().reverse(); break;
            case 'reverse': lines.reverse(); break;
            case 'random': lines.sort(() => Math.random() - 0.5); break;
            case 'length': lines.sort((a, b) => a.length - b.length); break;
            case 'unique': lines = Array.from(new Set(lines)); break;
            case 'trim': lines = lines.map(l => l.trim()).filter(l => l); break;
        }
        setInput(lines.join('\n'));
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title={tTools('list-sorter.name')}
                        description={tTools('list-sorter.description')}
                        icon={<List size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-white/10 flex gap-3 flex-wrap bg-black/20">
                            <button onClick={() => process('az')} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] text-[13px] gap-1.5"><ArrowDownAZ size={16} /> {t('ListSorter.ascending')}</button>
                            <button onClick={() => process('za')} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] text-[13px] gap-1.5"><ArrowUpAZ size={16} /> {t('ListSorter.descending')}</button>
                            <button onClick={() => process('reverse')} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] text-[13px]">{t('ListSorter.reverse')}</button>
                            <button onClick={() => process('random')} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] text-[13px] gap-1.5"><Shuffle size={16} /> {t('ListSorter.shuffle')}</button>
                            <button onClick={() => process('length')} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] text-[13px]">{t('ListSorter.length')}</button>
                            <button onClick={() => process('unique')} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] text-[13px] text-[#fb923c]">{t('ListSorter.deduplicate')}</button>
                            <button onClick={() => process('trim')} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] text-[13px]">{t('ListSorter.trim')}</button>
                            <div className="flex-1" />
                            <button onClick={() => setInput("")} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] text-[13px] text-[#ef4444]"><Trash2 size={16} /></button>
                        </div>

                        <textarea
                            value={input} onChange={e => setInput(e.target.value)}
                            placeholder={t('ListSorter.inputPlaceholder')}
                            className="w-full h-[500px] bg-transparent border-none p-5 text-white font-mono resize-y outline-none text-sm leading-relaxed"
                        />

                        <div className="p-3 bg-black/20 border-t border-white/10 text-[#6b7280] text-xs text-right">
                            {t('ListSorter.lines')} {input.split('\n').length} | {t('ListSorter.chars')} {input.length}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
