"use client";

import { useState, useMemo } from "react";
import { Flag } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";


export default function RegexTesterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [regex, setRegex] = useState("");
    const [flags, setFlags] = useState("gm");
    const [text, setText] = useState("");

    const matches = useMemo(() => {
        if (!regex) return [];
        try {
            const re = new RegExp(regex, flags);
            const results = [];
            let match;
            // Prevent infinite loops with zero-length matches
            if (re.global) {
                while ((match = re.exec(text)) !== null) {
                    if (match.index === re.lastIndex) {
                        re.lastIndex++;
                    }
                    results.push(match);
                }
            } else {
                match = re.exec(text);
                if (match) results.push(match);
            }
            return results;
        } catch (e) {
            return [];
        }
    }, [regex, flags, text]);

    const toggleFlag = (flag: string) => {
        setFlags(prev =>
            prev.includes(flag) ? prev.replace(flag, "") : prev + flag
        );
    };

    const highlightedText = useMemo(() => {
        if (!regex || matches.length === 0) return text;

        try {
            let lastIndex = 0;
            const parts = [];

            matches.forEach((match, i) => {
                // Add text before match
                if (match.index > lastIndex) {
                    parts.push(text.slice(lastIndex, match.index));
                }
                // Add matched text
                parts.push(
                    <span key={i} className="bg-orange-500/30 text-orange-200 rounded-[2px] outline outline-1 outline-orange-500/50">
                        {match[0]}
                    </span>
                );
                lastIndex = match.index + match[0].length;
            });

            // Add remaining text
            if (lastIndex < text.length) {
                parts.push(text.slice(lastIndex));
            }

            return parts;
        } catch (e) {
            return text;
        }
    }, [text, matches, regex]);

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title={tTools('regex-tester.name')}
                        description={tTools('regex-tester.description')}
                        icon={<ToolIcon name="Code2" size={32} />}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Inputs */}
                        <div className="flex flex-col gap-6">
                            {/* Regex Input */}
                            <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all">
                                <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5 opacity-60">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('RegexTester.expression')}</span>
                                    </div>
                                </div>

                                <div className="flex items-center px-4 py-4 bg-[var(--card-bg)]">
                                    <span className="text-xl text-[var(--muted-text)] font-mono select-none px-1">/</span>
                                    <input
                                        type="text"
                                        value={regex}
                                        onChange={(e) => setRegex(e.target.value)}
                                        placeholder={t('RegexTester.expressionPlaceholder')}
                                        className="flex-1 bg-transparent border-none py-2 px-0 text-[var(--foreground)] text-lg outline-none font-mono placeholder:text-[var(--muted-text)]/30"
                                        spellCheck={false}
                                    />
                                    <span className="text-xl text-[var(--muted-text)] font-mono select-none px-1">/{flags}</span>
                                </div>

                                {/* Flags Toolbar */}
                                <div className="px-4 py-3 bg-neutral-50/50 dark:bg-white/5 border-t border-[var(--border-color)] flex flex-wrap gap-2 items-center">
                                    <span className="text-[10px] uppercase font-bold text-[var(--muted-text)] tracking-wider mr-2">Flags:</span>
                                    {['g', 'i', 'm', 's', 'u', 'y'].map(flag => (
                                        <button
                                            key={flag}
                                            onClick={() => toggleFlag(flag)}
                                            className={`
                                                w-7 h-7 flex items-center justify-center text-xs font-mono rounded-md transition-all border
                                                ${flags.includes(flag)
                                                    ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                                                    : 'bg-white dark:bg-white/5 text-[var(--muted-text)] border-[var(--border-color)] hover:border-orange-300 hover:text-orange-500'}
                                            `}
                                            title={flag}
                                        >
                                            {flag}
                                        </button>
                                    ))}
                                </div>
                            </LiquidCard>

                            {/* Test String Input */}
                            <LiquidCard className="p-0 h-[400px] flex flex-col overflow-hidden group focus-within:ring-2 ring-orange-500/20 transition-all">
                                <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5 opacity-60">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('RegexTester.testString')}</span>
                                    </div>
                                    <span className="text-xs text-[var(--muted-text)] font-mono">{text.length} chars</span>
                                </div>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder={t('RegexTester.testStringPlaceholder')}
                                    className="flex-1 w-full bg-transparent border-none p-5 font-mono text-[14px] text-[var(--foreground)] resize-none outline-none placeholder:text-[var(--muted-text)] leading-relaxed"
                                    spellCheck={false}
                                />
                            </LiquidCard>
                        </div>

                        {/* Right Column: Output */}
                        <div className="flex flex-col gap-6">
                            {/* Match Highlight View */}
                            <LiquidCard className="p-0 h-[300px] flex flex-col overflow-hidden">
                                <div className="px-5 py-3 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5 opacity-60">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('RegexTester.matchHighlights')}</span>
                                    </div>
                                    <span className="text-xs text-[var(--muted-text)] font-mono bg-neutral-200 dark:bg-white/10 px-2 py-1 rounded-md">{matches.length} {t('RegexTester.matches')}</span>
                                </div>
                                <div className="p-5 font-mono text-[14px] text-[var(--foreground)] whitespace-pre-wrap overflow-y-auto flex-1 leading-relaxed">
                                    {text ? highlightedText : <span className="text-[var(--muted-text)] opacity-50">{t('RegexTester.highlightPlaceholder')}</span>}
                                </div>
                            </LiquidCard>

                            {/* Match Details */}
                            <LiquidCard className="p-0 h-[320px] flex flex-col overflow-hidden">
                                <div className="px-5 py-3 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5 opacity-60">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('RegexTester.matchInfo')}</span>
                                    </div>
                                </div>
                                <div className="p-0 overflow-y-auto flex-1 scrollbar-thin">
                                    {matches.length > 0 ? (
                                        matches.map((match, i) => (
                                            <div key={i} className="p-4 border-b border-[var(--border-color)] last:border-0 hover:bg-neutral-100/50 dark:hover:bg-white/5 transition-colors">
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-orange-500 font-semibold text-[13px]">{t('RegexTester.match')} {i + 1}</span>
                                                    <span className="text-[var(--muted-text)] text-xs font-mono">{t('RegexTester.index')}: {match.index}</span>
                                                </div>
                                                <div className="text-[var(--foreground)] text-sm font-mono break-all p-2 bg-neutral-100 dark:bg-black/20 rounded-lg border border-[var(--border-color)]">"{match[0]}"</div>
                                                {match.length > 1 && (
                                                    <div className="mt-3 pl-3 border-l-2 border-neutral-200 dark:border-white/10 space-y-2">
                                                        {Array.from(match).slice(1).map((group, gi) => (
                                                            <div key={gi} className="text-xs text-[var(--muted-text)] flex flex-col gap-1">
                                                                <span>{t('RegexTester.group')} {gi + 1}:</span>
                                                                <span className="text-[var(--foreground)] font-mono bg-neutral-100 dark:bg-black/20 px-2 py-1 rounded border border-[var(--border-color)] w-max max-w-full truncate">"{group}"</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-[var(--muted-text)] opacity-50 p-10 text-center">
                                            <Flag size={32} className="mb-3 opacity-20" />
                                            <div className="text-[13px]">{t('RegexTester.noMatches')}</div>
                                        </div>
                                    )}
                                </div>
                            </LiquidCard>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
