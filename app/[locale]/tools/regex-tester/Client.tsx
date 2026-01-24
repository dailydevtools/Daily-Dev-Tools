"use client";

import { useState, useMemo } from "react";
import { Flag } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                    <span key={i} className="bg-orange-500/30 rounded-[2px]">
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
                        icon={<span className="text-2xl font-bold">.*</span>}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
                        {/* Left Column: Inputs */}
                        <div>
                            {/* Regex Input */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-5 rounded-2xl mb-5">
                                <label className="block text-sm font-medium text-[#fb923c] mb-3">{t('RegexTester.expression')}</label>
                                <div className="flex items-center bg-black/30 rounded-lg px-3">
                                    <span className="text-[#6b7280] text-base">/</span>
                                    <input
                                        type="text"
                                        value={regex}
                                        onChange={(e) => setRegex(e.target.value)}
                                        placeholder={t('RegexTester.expressionPlaceholder')}
                                        className="flex-1 bg-transparent border-none py-3 px-1 text-white text-base outline-none font-mono"
                                    />
                                    <span className="text-[#6b7280] text-base">/{flags}</span>
                                </div>

                                {/* Flags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {['g', 'i', 'm', 's', 'u', 'y'].map(flag => (
                                        <button
                                            key={flag}
                                            onClick={() => toggleFlag(flag)}
                                            className={`px-3 py-1 text-xs rounded-full transition-colors ${flags.includes(flag) ? "inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]" : "inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]"}`}
                                        >
                                            {flag}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-3 text-[#9ca3af] text-xs">
                                    <p>{t('RegexTester.flagsHelp')}</p>
                                </div>
                            </div>

                            {/* Test String Input */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden h-[400px] flex flex-col">
                                <div className="p-3 px-5 border-b border-white/5 bg-white/[0.02]">
                                    <span className="text-sm font-medium text-[#9ca3af]">{t('RegexTester.testString')}</span>
                                </div>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder={t('RegexTester.testStringPlaceholder')}
                                    className="flex-1 w-full bg-transparent border-none p-5 font-mono text-sm text-[#e5e7eb] resize-none outline-none"
                                />
                            </div>
                        </div>

                        {/* Right Column: Output */}
                        <div>
                            {/* Match Highlight View */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden mb-5 h-[300px] flex flex-col">
                                <div className="p-3 px-5 border-b border-white/5 bg-white/[0.02] flex justify-between">
                                    <span className="text-sm font-medium text-[#fb923c]">{t('RegexTester.matchHighlights')}</span>
                                    <span className="text-xs text-[#9ca3af]">{matches.length} {t('RegexTester.matches')}</span>
                                </div>
                                <div className="p-5 font-mono text-sm text-[#e5e7eb] whitespace-pre-wrap overflow-y-auto flex-1">
                                    {text ? highlightedText : <span className="text-[#6b7280]">{t('RegexTester.highlightPlaceholder')}</span>}
                                </div>
                            </div>

                            {/* Match Details */}
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden h-[320px] flex flex-col">
                                <div className="p-3 px-5 border-b border-white/5 bg-white/[0.02]">
                                    <span className="text-sm font-medium text-[#9ca3af]">{t('RegexTester.matchInfo')}</span>
                                </div>
                                <div className="p-5 overflow-y-auto flex-1">
                                    {matches.length > 0 ? (
                                        matches.map((match, i) => (
                                            <div key={i} className="mb-3 border-b border-white/5 pb-3 last:border-0 last:pb-0 last:mb-0">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-[#fb923c] font-semibold text-[13px]">{t('RegexTester.match')} {i + 1}</span>
                                                    <span className="text-[#6b7280] text-xs">{t('RegexTester.index')}: {match.index}</span>
                                                </div>
                                                <div className="text-white text-sm font-mono break-all">"{match[0]}"</div>
                                                {match.length > 1 && (
                                                    <div className="mt-2 pl-2 border-l-2 border-white/10">
                                                        {Array.from(match).slice(1).map((group, gi) => (
                                                            <div key={gi} className="text-xs text-[#9ca3af]">
                                                                {t('RegexTester.group')} {gi + 1}: <span className="text-[#e5e7eb] font-mono">"{group}"</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-[#6b7280] text-[13px] text-center mt-10">
                                            {t('RegexTester.noMatches')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
