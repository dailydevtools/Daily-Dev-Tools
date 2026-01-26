"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

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
                            <div key={i} className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-2xl text-center flex flex-col items-center justify-center">
                                <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                                <div className="text-xs text-[#9ca3af] uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-3xl overflow-hidden flex flex-col">
                        <div className="p-4 px-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                            <span className="font-medium text-[#fb923c]">{t('WordCounter.textInput')}</span>
                            <button onClick={clearText} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-1.5 px-3 text-xs flex items-center gap-1.5 text-[#ef4444] border-red-500/20 hover:bg-red-500/10">
                                <RefreshCw size={14} /> {t('WordCounter.clear')}
                            </button>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={t('WordCounter.inputPlaceholder')}
                            className="flex-1 min-h-[400px] bg-transparent border-none p-6 text-[#e5e7eb] text-base resize-none outline-none leading-relaxed"
                        />
                    </div>

                </div>
            </div>
        </main>
    );
}
