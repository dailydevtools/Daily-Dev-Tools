"use client";

import { useState } from "react";
import { Table, Copy, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function MarkdownTable() {
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
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                        <div className="glass-card" style={{ padding: 24, flex: 2, overflowX: 'auto' }}>
                            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                                <button onClick={addRow} className="btn-secondary" style={{ padding: '8px 12px', fontSize: 13 }}>+ Add Row</button>
                                <button onClick={addCol} className="btn-secondary" style={{ padding: '8px 12px', fontSize: 13 }}>+ Add Column</button>
                            </div>

                            <table style={{ borderCollapse: 'collapse' }}>
                                <tbody>
                                    {data.map((row, r) => (
                                        <tr key={r}>
                                            {row.map((cell, c) => (
                                                <td key={c} style={{ padding: 4, position: 'relative' }}>
                                                    <input
                                                        type="text"
                                                        value={cell}
                                                        onChange={e => updateCell(r, c, e.target.value)}
                                                        style={{ width: 120, padding: 8, background: r === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 4 }}
                                                        placeholder={r === 0 ? "Header" : ""}
                                                    />
                                                    {r === 0 && (
                                                        <button onClick={() => removeCol(c)} style={{ position: 'absolute', top: -10, right: 0, background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 10 }}>x</button>
                                                    )}
                                                </td>
                                            ))}
                                            <td>
                                                <button onClick={() => removeRow(r)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 8 }}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="glass-card" style={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Markdown Output</div>
                            <textarea
                                readOnly
                                value={output}
                                style={{ width: '100%', height: 300, background: 'transparent', border: 'none', padding: 20, color: '#fb923c', fontFamily: 'monospace', resize: 'vertical', outline: 'none', whiteSpace: 'pre' }}
                            />
                            <div style={{ padding: 16, textAlign: 'right', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary">Copy Markdown</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
