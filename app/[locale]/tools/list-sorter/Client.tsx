"use client";

import { useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, Shuffle, Trash2, List } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title={tTools('list-sorter.name')}
                        description={tTools('list-sorter.description')}
                        icon={<List size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all">
                        <div className="p-4 border-b border-[var(--border-color)] flex gap-3 flex-wrap bg-neutral-100/50 dark:bg-white/5 items-center">
                            <LiquidButton onClick={() => process('az')} variant="ghost" className="gap-2">
                                <ArrowDownAZ size={16} /> {t('ListSorter.ascending')}
                            </LiquidButton>
                            <LiquidButton onClick={() => process('za')} variant="ghost" className="gap-2">
                                <ArrowUpAZ size={16} /> {t('ListSorter.descending')}
                            </LiquidButton>
                            <LiquidButton onClick={() => process('reverse')} variant="ghost">
                                {t('ListSorter.reverse')}
                            </LiquidButton>
                            <LiquidButton onClick={() => process('random')} variant="ghost" className="gap-2">
                                <Shuffle size={16} /> {t('ListSorter.shuffle')}
                            </LiquidButton>
                            <LiquidButton onClick={() => process('length')} variant="ghost">
                                {t('ListSorter.length')}
                            </LiquidButton>
                            <LiquidButton onClick={() => process('unique')} variant="secondary" className="text-orange-500 bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20">
                                {t('ListSorter.deduplicate')}
                            </LiquidButton>
                            <LiquidButton onClick={() => process('trim')} variant="ghost">
                                {t('ListSorter.trim')}
                            </LiquidButton>
                            <div className="flex-1" />
                            <LiquidButton onClick={() => setInput("")} variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-500/10 gap-2">
                                <Trash2 size={16} /> {t('common.clear')}
                            </LiquidButton>
                        </div>

                        <textarea
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder={t('ListSorter.inputPlaceholder')}
                            className="w-full h-[500px] bg-transparent border-none p-5 text-[var(--foreground)] font-mono resize-y outline-none text-sm leading-relaxed"
                        />

                        <div className="p-3 bg-neutral-50 dark:bg-white/[0.02] border-t border-[var(--border-color)] text-[var(--muted-text)] text-xs text-right">
                            {t('ListSorter.lines')} {input ? input.split('\n').length : 0} | {t('ListSorter.chars')} {input.length}
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
