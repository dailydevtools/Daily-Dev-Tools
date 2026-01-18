"use client";

import { useState } from "react";
import { Copy, Check, Grid, Settings, Code } from "lucide-react";
import ToolIcon from "../../components/ToolIcon";

export default function GridGenerator() {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [rowGap, setRowGap] = useState(16);
    const [colGap, setColGap] = useState(16);
    const [copied, setCopied] = useState(false);

    const cssCode = `.container {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  grid-column-gap: ${colGap}px;
  grid-row-gap: ${rowGap}px;
}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div className="icon-box-primary" style={{ width: 64, height: 64, margin: "0 auto 24px" }}>
                    <ToolIcon name="LayoutGrid" size={32} style={{ color: "#fb923c" }} />
                </div>
                <h1 style={{ fontSize: 36, fontWeight: 800, color: "white", marginBottom: 12 }}>
                    CSS Grid Generator
                </h1>
                <p style={{ color: "#9ca3af", fontSize: 16 }}>
                    Create complex grid layouts visually and copy the CSS.
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32, alignItems: "start" }}>
                {/* Controls */}
                <div className="glass-card" style={{ padding: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, color: "white", fontWeight: 600 }}>
                        <Settings size={18} className="text-orange-400" /> Options
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div>
                            <label style={{ display: "block", color: "#9ca3af", fontSize: 13, marginBottom: 8 }}>Rows ({rows})</label>
                            <input
                                type="range" min="1" max="12" value={rows}
                                onChange={(e) => setRows(Number(e.target.value))}
                                style={{ width: "100%", accentColor: "#fb923c" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", color: "#9ca3af", fontSize: 13, marginBottom: 8 }}>Columns ({cols})</label>
                            <input
                                type="range" min="1" max="12" value={cols}
                                onChange={(e) => setCols(Number(e.target.value))}
                                style={{ width: "100%", accentColor: "#fb923c" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", color: "#9ca3af", fontSize: 13, marginBottom: 8 }}>Row Gap ({rowGap}px)</label>
                            <input
                                type="range" min="0" max="50" value={rowGap}
                                onChange={(e) => setRowGap(Number(e.target.value))}
                                style={{ width: "100%", accentColor: "#fb923c" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", color: "#9ca3af", fontSize: 13, marginBottom: 8 }}>Column Gap ({colGap}px)</label>
                            <input
                                type="range" min="0" max="50" value={colGap}
                                onChange={(e) => setColGap(Number(e.target.value))}
                                style={{ width: "100%", accentColor: "#fb923c" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Preview & Code */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* Visual Preview */}
                    <div className="glass-card" style={{ padding: 24, minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a" }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            gridTemplateRows: `repeat(${rows}, 1fr)`,
                            columnGap: colGap,
                            rowGap: rowGap,
                            width: "100%",
                            height: "100%",
                            minHeight: 250
                        }}>
                            {Array.from({ length: rows * cols }).map((_, i) => (
                                <div key={i} style={{
                                    background: "rgba(249, 115, 22, 0.2)",
                                    border: "1px dashed rgba(249, 115, 22, 0.4)",
                                    borderRadius: 6,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fb923c",
                                    fontSize: 12,
                                    fontWeight: 600
                                }}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Block */}
                    <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
                        <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "white", fontSize: 14, fontWeight: 500 }}>
                                <Code size={16} className="text-orange-400" /> Generated CSS
                            </div>
                            <button
                                onClick={handleCopy}
                                style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: copied ? "#22c55e" : "#9ca3af", cursor: "pointer", fontSize: 12, transition: "color 0.2s" }}
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                        <pre style={{ margin: 0, padding: 20, background: "#111", color: "#a5b4fc", fontSize: 14, fontFamily: "monospace", overflowX: "auto" }}>
                            {cssCode}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
