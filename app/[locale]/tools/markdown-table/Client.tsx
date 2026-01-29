"use client";

import { useState } from "react";
import { Table, Trash2, Code } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function MarkdownTableClient() {
    const t = useTranslations('MarkdownTable');
    // Simple 2D array state
    const [data, setData] = useState<string[][]>([
        ["Header 1", "Header 2", "Header 3"],
        ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
        ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"]
    ]);

    const addRow = () => {
        setData([...data, Array(data[0].length).fill("")]);
    };

    const addCol = () => {
        setData(data.map(row => [...row, ""]));
    };

    const removeRow = (idx: number) => {
        if (data.length <= 1) return;
        setData(data.filter((_, i) => i !== idx));
    };

    const removeCol = (idx: number) => {
        if (data[0].length <= 1) return;
        setData(data.map(row => row.filter((_, i) => i !== idx)));
    };

    const updateCell = (r: number, c: number, val: string) => {
        const newData = [...data];
        newData[r] = [...newData[r]];
        newData[r][c] = val;
        setData(newData);
    };

    const generate = () => {
        if (data.length === 0) return "";

        const colWidths = data[0].map((_, c) => Math.max(...data.map(r => (r[c] || "").length), 3));

        let md = "";

        // Header
        md += "| " + data[0].map((c, i) => (c || "").padEnd(colWidths[i])).join(" | ") + " |\n";

        // Separator
        md += "| " + data[0].map((_, i) => "-".repeat(colWidths[i])).join(" | ") + " |\n";

        // Rows
        for (let i = 1; i < data.length; i++) {
            md += "| " + data[i].map((c, j) => (c || "").padEnd(colWidths[j])).join(" | ") + " |\n";
        }
        return md;
    };

    const output = generate();

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <ToolPageHeader
                        title="Markdown Table Generator"
                        description="Visually create Markdown tables. Add rows, columns, and export to markdown."
                        icon={<Table size={28} className="text-[#fb923c]" />}
                    />

                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        <LiquidCard className="p-6 flex-[2] overflow-x-auto w-full">
                            <div className="flex gap-3 mb-6">
                                <LiquidButton onClick={addRow} variant="secondary" className="gap-2">
                                    {t('addRow')}
                                </LiquidButton>
                                <LiquidButton onClick={addCol} variant="secondary" className="gap-2">
                                    {t('addCol')}
                                </LiquidButton>
                            </div>

                            <table className="border-collapse">
                                <tbody>
                                    {data.map((row, r) => (
                                        <tr key={r}>
                                            {row.map((cell, c) => (
                                                <td key={c} className="p-1 relative">
                                                    <input
                                                        type="text"
                                                        value={cell}
                                                        onChange={e => updateCell(r, c, e.target.value)}
                                                        className={`w-[120px] p-2 border border-[var(--border-color)] bg-transparent rounded-lg text-sm text-[var(--foreground)] focus:ring-2 ring-orange-500/50 outline-none transition-all ${r === 0 ? 'font-bold bg-neutral-100/50 dark:bg-white/10' : ''}`}
                                                        placeholder={r === 0 ? t('headerPlaceholder') : ""}
                                                    />
                                                    {r === 0 && (
                                                        <button onClick={() => removeCol(c)} className="absolute -top-2.5 right-0 bg-white dark:bg-black border border-[var(--border-color)] rounded-full w-5 h-5 flex items-center justify-center text-red-500 cursor-pointer text-[10px] hover:text-red-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">x</button>
                                                    )}
                                                </td>
                                            ))}
                                            <td>
                                                <button onClick={() => removeRow(r)} className="bg-transparent border-none text-[var(--muted-text)] cursor-pointer p-2 hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </LiquidCard>

                        <LiquidCard className="p-0 flex-1 flex flex-col w-full h-full min-h-[400px]">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5 flex items-center gap-2">
                                <Code className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium text-[var(--foreground)]">{t('outputLabel')}</span>
                            </div>
                            <textarea
                                readOnly
                                value={output}
                                className="w-full flex-1 bg-transparent border-none p-5 text-orange-500 font-mono resize-y outline-none whitespace-pre text-sm leading-relaxed min-h-[300px]"
                            />
                            <div className="p-4 text-right border-t border-[var(--border-color)] bg-neutral-50 dark:bg-white/[0.02]">
                                <LiquidButton onClick={() => navigator.clipboard.writeText(output)}>
                                    {t('copy')}
                                </LiquidButton>
                            </div>
                        </LiquidCard>
                    </div>

                </div>
            </div>
        </main>
    );
}
