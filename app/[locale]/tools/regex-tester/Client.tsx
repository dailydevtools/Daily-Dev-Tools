"use client";

import { useState, useMemo } from "react";
import { Flag } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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
                        <div className="flex flex-col gap-8">
                            {/* Regex Input */}
                            <LiquidCard className="p-6">
                                <label className="block text-sm font-medium text-orange-500 mb-3">{t('RegexTester.expression')}</label>
                                <div className="flex items-center bg-neutral-100/50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl px-3 transition-colors focus-within:border-orange-500/50">
                                    <span className="text-[var(--muted-text)] text-base select-none">/</span>
                                    <input
                                        type="text"
                                        value={regex}
                                        onChange={(e) => setRegex(e.target.value)}
                                        placeholder={t('RegexTester.expressionPlaceholder')}
                                        className="flex-1 bg-transparent border-none py-3 px-1 text-[var(--foreground)] text-base outline-none font-mono placeholder:text-[var(--muted-text)]/50"
                                    />
                                    <span className="text-[var(--muted-text)] text-base select-none">/{flags}</span>
                                </div>

                                {/* Flags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {['g', 'i', 'm', 's', 'u', 'y'].map(flag => (
                                        <LiquidButton
                                            key={flag}
                                            onClick={() => toggleFlag(flag)}
                                            variant={flags.includes(flag) ? "primary" : "ghost"}
                                            className={`h-8 px-3 text-xs font-mono rounded-lg ${flags.includes(flag) ? '' : 'border border-[var(--border-color)] text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                                        >
                                            {flag}
                                        </LiquidButton>
                                    ))}
                                </div>
                                <div className="mt-3 text-[var(--muted-text)] text-xs">
                                    <p>{t('RegexTester.flagsHelp')}</p>
                                </div>
                            </LiquidCard>

                            {/* Test String Input */}
                            <LiquidCard className="p-0 h-[400px] flex flex-col overflow-hidden">
                                <div className="p-4 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5">
                                    <span className="text-sm font-medium text-[var(--muted-text)]">{t('RegexTester.testString')}</span>
                                </div>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder={t('RegexTester.testStringPlaceholder')}
                                    className="flex-1 w-full bg-transparent border-none p-5 font-mono text-sm text-[var(--foreground)] resize-none outline-none placeholder:text-[var(--muted-text)]/50"
                                />
                            </LiquidCard>
                        </div>

                        {/* Right Column: Output */}
                        <div className="flex flex-col gap-8">
                            {/* Match Highlight View */}
                            <LiquidCard className="p-0 h-[300px] flex flex-col overflow-hidden">
                                <div className="p-4 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5 flex justify-between items-center">
                                    <span className="text-sm font-medium text-orange-500">{t('RegexTester.matchHighlights')}</span>
                                    <span className="text-xs text-[var(--muted-text)] font-mono bg-neutral-200 dark:bg-white/10 px-2 py-1 rounded-md">{matches.length} {t('RegexTester.matches')}</span>
                                </div>
                                <div className="p-5 font-mono text-sm text-[var(--foreground)] whitespace-pre-wrap overflow-y-auto flex-1 leading-relaxed">
                                    {text ? highlightedText : <span className="text-[var(--muted-text)] opacity-50">{t('RegexTester.highlightPlaceholder')}</span>}
                                </div>
                            </LiquidCard>

                            {/* Match Details */}
                            <LiquidCard className="p-0 h-[320px] flex flex-col overflow-hidden">
                                <div className="p-4 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5">
                                    <span className="text-sm font-medium text-[var(--muted-text)]">{t('RegexTester.matchInfo')}</span>
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
