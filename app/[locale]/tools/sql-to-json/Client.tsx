"use client";

import { useState } from "react";
import { Copy, Database, ArrowDown } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import CodeEditor from "../../../components/CodeEditor";

export default function SqlToJsonClient() {
    const t = useTranslations('SqlToJson');
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const convert = () => {
        setError("");
        try {
            if (!input.trim()) return;

            // Basic Parser for INSERT INTO table (cols) VALUES (vals)
            // Supports multiple VALUES tuples if formatted standardly
            const lines = input.split(';').filter(l => l.trim().length > 10);
            const result: Record<string, string | number | null>[] = [];

            for (const line of lines) {
                // Extract columns: INSERT INTO x (a,b,c)
                const colMatch = line.match(/\((.*?)\)\s*VALUES/i);
                if (!colMatch) continue;
                const columns = colMatch[1].split(',').map(c => c.trim().replace(/[`"']/g, ''));

                // Extract values part: VALUES (1,2), (3,4)
                const valuesPart = line.split(/VALUES/i)[1];
                if (!valuesPart) continue;

                // Helper to split by comma outside quotes (simplified)
                // This is fragile but works for simple cases
                const tuples = valuesPart.match(/\((.*?)\)/g);

                if (tuples) {
                    tuples.forEach(t => {
                        // Remove parens
                        const valStr = t.slice(1, -1);
                        // Split
                        // TODO: Handle string literals with commas properly
                        const vals = valStr.split(',').map(v => {
                            v = v.trim();
                            if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1);
                            if (!isNaN(Number(v))) return Number(v);
                            if (v === "NULL") return null;
                            return v;
                        });

                        const obj: Record<string, string | number | null> = {};
                        columns.forEach((col, i) => {
                            obj[col] = vals[i];
                        });
                        result.push(obj);
                    });
                }
            }

            if (result.length === 0) throw new Error(t('error'));
            setOutput(JSON.stringify(result, null, 2));

        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title="SQL to JSON Converter"
                        description="Convert SQL INSERT statements to JSON array."
                        icon={<Database size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 mb-6 flex flex-col overflow-hidden">
                        <div className="p-3 bg-white/5 text-[#9ca3af] text-[13px] border-b border-white/5 flex justify-between items-center">
                            <span>{t('inputLabel')}</span>
                            <Database size={14} />
                        </div>
                        <div className="flex-1 h-[300px] relative">
                            <CodeEditor
                                language="sql"
                                value={input}
                                onChange={(val) => setInput(val || "")}
                                className="border-none !bg-transparent rounded-none rounded-b-[20px]"
                            />
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <button onClick={convert} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-8 flex items-center gap-2 mx-auto">
                            {t('convert')} <ArrowDown size={18} />
                        </button>
                    </div>

                    {error && <div className="text-[#ef4444] text-center mb-6">{error}</div>}

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 relative overflow-hidden">
                        <div className="p-3 bg-white/5 text-[#9ca3af] text-[13px] border-b border-white/5">
                            {t('outputLabel')}
                        </div>
                        <div className="flex-1 h-[400px] relative">
                            <CodeEditor
                                language="json"
                                value={output}
                                options={{ readOnly: true }}
                                className="border-none !bg-transparent rounded-none rounded-b-[20px]"
                            />
                        </div>
                        <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-12 right-6 z-10 inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] p-2 bg-[var(--card-bg)]">
                            <Copy size={16} />
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}
