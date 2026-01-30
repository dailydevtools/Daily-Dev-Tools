"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";

export default function WordCounterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [text, setText] = useState("");
    const [stats, setStats] = useState({
        words: 0,
        chars: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0
    });

    useEffect(() => {
        analyzeText();
    }, [text]);

    const analyzeText = () => {
        if (!text) {
            setStats({ words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, readingTime: 0 });
            return;
        }

        const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s/g, '').length;
        const sentences = text.split(/[.!?]+/).filter(Boolean).length;
        const paragraphs = text.split(/\n\n+/).filter(Boolean).length;
        const readingTime = Math.ceil(words / 200); // 200 words per minute

        setStats({ words, chars, charsNoSpaces, sentences, paragraphs, readingTime });
    };

    const clearText = () => {
        setText("");
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title={tTools('word-counter.name')}
                        description={tTools('word-counter.description')}
                        icon={<ToolIcon name="AlignJustify" size={32} />}
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                        {[
                            { label: t('WordCounter.words'), value: stats.words, color: '#fb923c' },
                            { label: t('WordCounter.characters'), value: stats.chars, color: '#facc15' },
                            { label: t('WordCounter.sentences'), value: stats.sentences, color: '#4ade80' },
                            { label: t('WordCounter.paragraphs'), value: stats.paragraphs, color: '#60a5fa' },
                            { label: t('WordCounter.readingTime'), value: `~${stats.readingTime} ${t('WordCounter.min')}`, color: '#a78bfa' },
                        ].map((stat, i) => (
                            <LiquidCard key={i} className="p-6 text-center flex flex-col items-center justify-center">
                                <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                                <div className="text-xs text-[var(--muted-text)] uppercase tracking-wider">{stat.label}</div>
                            </LiquidCard>
                        ))}
                    </div>

                    <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all">
                        <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5 opacity-60">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                                <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('WordCounter.textInput')}</span>
                            </div>
                            <button onClick={clearText} className="text-xs flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-2.5 py-1 rounded-md border border-red-200 dark:border-red-500/20">
                                <RefreshCw size={12} /> {t('WordCounter.clear')}
                            </button>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={t('WordCounter.inputPlaceholder')}
                            className="flex-1 min-h-[400px] bg-transparent border-none p-6 text-[var(--foreground)] text-base resize-none outline-none leading-relaxed placeholder:text-[var(--muted-text)]"
                            spellCheck={false}
                        />
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
