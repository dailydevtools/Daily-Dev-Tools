"use client";

import { useState } from "react";
import { Copy, Check, Trash2, Database } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                        <button onClick={formatSql} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-2.5 px-6">
                            {t('common.format')} SQL
                        </button>
                        <button onClick={() => { setInput(""); setOutput(""); }} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2.5 px-6 text-[#ef4444] border-red-500/30 flex items-center gap-2">
                            <Trash2 size={16} /> {t('common.clear')}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden flex flex-col">
                            <div className="p-3 px-5 border-b border-white/5 flex justify-between">
                                <span className="text-sm font-medium text-[#9ca3af]">{t('common.input')} SQL</span>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t('SqlFormatter.inputPlaceholder')}
                                className="flex-1 h-[400px] bg-transparent border-none p-5 font-mono text-[13px] text-[#e5e7eb] resize-none outline-none"
                            />
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden flex flex-col">
                            <div className="p-3 px-5 border-b border-white/5 flex justify-between items-center">
                                <span className="text-sm font-medium text-[#fb923c]">{t('common.output')}</span>
                                <button onClick={copyToClipboard} className={`bg-transparent border-none cursor-pointer ${copied ? 'text-[#22c55e]' : 'text-[#9ca3af]'}`}>
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                            <textarea
                                value={output}
                                readOnly
                                placeholder={t('SqlFormatter.outputPlaceholder')}
                                className="flex-1 h-[400px] bg-transparent border-none p-5 font-mono text-[13px] text-[#4ade80] resize-none outline-none"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
