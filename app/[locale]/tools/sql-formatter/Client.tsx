"use client";

import { useState } from "react";
import { Copy, Check, Trash2, Database } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import CodeEditor from "../../../components/CodeEditor";

export default function SqlFormatterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("SELECT * FROM users WHERE id = 1 AND active = true ORDER BY created_at DESC;");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);

    const formatSql = () => {
        // Basic SQL Formatter (Regex based)
        let formatted = input
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/\s*([,;])\s*/g, '$1\n') // Newline after comma/semicolon
            .replace(/\s*(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|LIMIT|INSERT INTO|UPDATE|DELETE FROM|VALUES|SET)\s*/gi, '\n$1 ') // Keywords on new lines
            .replace(/^\s+/, "") // Trim start
            .trim();

        // Add simple indentation
        const lines = formatted.split('\n');
        let indent = 0;
        formatted = lines.map(line => {
            if (line.match(/^\)/)) indent = Math.max(0, indent - 1);
            const prefix = "  ".repeat(indent);
            if (line.match(/\($/)) indent++;
            return prefix + line;
        }).join('\n');

        setOutput(formatted);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pb-12 pt-6 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title={tTools('sql-formatter.name')}
                        description={tTools('sql-formatter.description')}
                        icon={<Database size={28} className="text-[#fb923c]" />}
                    />

                    <div className="flex items-center gap-3 mb-6">
                        <LiquidButton onClick={formatSql} className="px-6 py-3">
                            {t('common.format')} SQL
                        </LiquidButton>
                        <LiquidButton onClick={() => { setInput(""); setOutput(""); }} variant="ghost" className="px-6 py-3 border border-red-500/30 text-red-500 hover:text-red-600 hover:bg-red-500/10">
                            <Trash2 size={16} className="mr-2" /> {t('common.clear')}
                        </LiquidButton>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all h-[500px]">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5 opacity-60">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('common.input')} SQL</span>
                                </div>
                                <span className="text-xs text-[var(--muted-text)] font-mono">{input.length} chars</span>
                            </div>
                            <div className="flex-1 w-full bg-transparent relative">
                                <CodeEditor
                                    language="sql"
                                    value={input}
                                    onChange={(val) => setInput(val || "")}
                                    className="border-none !bg-transparent rounded-none rounded-b-xl"
                                    options={{
                                        wordWrap: "on",
                                        padding: { top: 16, bottom: 16 }
                                    }}
                                />
                            </div>
                        </LiquidCard>

                        <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-green-500/20 transition-all relative h-[500px]">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5 opacity-60">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('common.output')}</span>
                                </div>
                                {output && (
                                    <button
                                        onClick={copyToClipboard}
                                        className={`p-1.5 rounded-lg transition-colors bg-transparent border-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 ${copied ? 'text-green-500' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                                        title={t('common.copy')}
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                )}
                            </div>
                            <div className="flex-1 w-full bg-transparent relative">
                                <CodeEditor
                                    language="sql"
                                    value={output}
                                    options={{
                                        readOnly: true,
                                        wordWrap: "on",
                                        padding: { top: 16, bottom: 16 }
                                    }}
                                    className="border-none !bg-transparent rounded-none rounded-b-xl"
                                />
                            </div>
                        </LiquidCard>
                    </div>

                </div>
            </div>
        </main>
    );
}
