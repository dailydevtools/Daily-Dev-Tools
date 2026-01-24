"use client";

import { useState } from "react";
import { Table, Trash2, Code } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 flex-[2] overflow-x-auto w-full">
                            <div className="flex gap-3 mb-4">
                                <button onClick={addRow} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2 px-3 text-[13px]">{t('addRow')}</button>
                                <button onClick={addCol} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2 px-3 text-[13px]">{t('addCol')}</button>
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
                                                        className={`w-[120px] p-2 border border-white/10 text-white rounded text-sm ${r === 0 ? 'bg-white/10 font-bold' : 'bg-black/30'}`}
                                                        placeholder={r === 0 ? t('headerPlaceholder') : ""}
                                                    />
                                                    {r === 0 && (
                                                        <button onClick={() => removeCol(c)} className="absolute -top-2.5 right-0 bg-none border-none text-[#ef4444] cursor-pointer text-[10px] hover:text-red-400">x</button>
                                                    )}
                                                </td>
                                            ))}
                                            <td>
                                                <button onClick={() => removeRow(r)} className="bg-none border-none text-[#ef4444] cursor-pointer p-2 hover:text-red-400">
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 flex-1 flex flex-col w-full">
                            <div className="p-3 bg-black/20 text-[#9ca3af] text-[13px] border-b border-white/10">{t('outputLabel')}</div>
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-[300px] bg-transparent border-none p-5 text-[#fb923c] font-mono resize-y outline-none whitespace-pre text-sm"
                            />
                            <div className="p-4 text-right border-t border-white/10">
                                <button onClick={() => navigator.clipboard.writeText(output)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2 px-4">{t('copy')}</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
