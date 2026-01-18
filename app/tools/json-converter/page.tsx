"use client";

import { useState } from "react";
import { ArrowRightLeft, Copy, Download, FileJson, FileSpreadsheet } from "lucide-react";
import Link from "next/link";

export default function JsonCsvConverter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"json-to-csv" | "csv-to-json">("json-to-csv");
    const [error, setError] = useState("");

    const handleConvert = () => {
        setError("");
        try {
            if (!input.trim()) return;

            if (mode === "json-to-csv") {
                const data = JSON.parse(input);
                const array = Array.isArray(data) ? data : [data];
                if (array.length === 0) throw new Error("Empty JSON");

                // Collect all unique keys
                const keys = Array.from(new Set(array.flatMap(Object.keys)));
                const header = keys.join(",");
                const rows = array.map((obj: any) =>
                    keys.map(k => {
                        const val = obj[k];
                        return typeof val === 'object' ? JSON.stringify(val).replace(/,/g, ';') : JSON.stringify(val ?? "");
                    }).join(",")
                );

                setOutput([header, ...rows].join("\n"));
            } else {
                // CSV to JSON
                const lines = input.trim().split("\n");
                if (lines.length < 2) throw new Error("Invalid CSV (need header + 1 row)");

                const headers = lines[0].split(",").map(h => h.trim());
                const result = lines.slice(1).map(line => {
                    const values = line.split(",");
                    const obj: Record<string, string | number | boolean | null | undefined> = {};
                    headers.forEach((h, i) => {
                        let val: string | number | boolean | null | undefined = values[i]?.trim();
                        // Try to parse numbers/bools
                        if (val === "true") val = true;
                        else if (val === "false") val = false;
                        else if (!isNaN(Number(val)) && val !== "") val = Number(val);
                        else if (val?.startsWith('"') && val?.endsWith('"')) val = val.slice(1, -1);

                        obj[h] = val;
                    });
                    return obj;
                });
                setOutput(JSON.stringify(result, null, 2));
            }
        } catch (e: any) {
            setError(e.message);
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 12, display: 'flex', gap: 4 }}>
                            <button
                                onClick={() => { setMode("json-to-csv"); setInput(""); setOutput(""); }}
                                style={{
                                    padding: '8px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
                                    background: mode === 'json-to-csv' ? '#fb923c' : 'transparent',
                                    color: mode === 'json-to-csv' ? 'black' : '#9ca3af', fontWeight: 500
                                }}
                            >
                                JSON to CSV
                            </button>
                            <button
                                onClick={() => { setMode("csv-to-json"); setInput(""); setOutput(""); }}
                                style={{
                                    padding: '8px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
                                    background: mode === 'csv-to-json' ? '#fb923c' : 'transparent',
                                    color: mode === 'csv-to-json' ? 'black' : '#9ca3af', fontWeight: 500
                                }}
                            >
                                CSV to JSON
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center' }}>
                        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 500 }}>
                            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                                <span>{mode === 'json-to-csv' ? 'JSON Input' : 'CSV Input'}</span>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button onClick={() => setInput("")} style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>Clear</button>
                                    <button onClick={() => navigator.clipboard.readText().then(t => setInput(t))} style={{ background: 'transparent', border: 'none', color: '#fb923c', cursor: 'pointer' }}>Paste</button>
                                </div>
                            </div>
                            <textarea
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder={mode === 'json-to-csv' ? '[{"name": "John", "age": 30}]' : 'name,age\nJohn,30'}
                                style={{ flex: 1, width: '100%', background: 'transparent', border: 'none', padding: 16, color: 'white', fontFamily: 'monospace', resize: 'none', outline: 'none', fontSize: 14 }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <button onClick={handleConvert} className="btn-primary" style={{ padding: 16, borderRadius: '50%' }}>
                                <ArrowRightLeft size={20} />
                            </button>
                        </div>

                        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 500 }}>
                            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                                <span>{mode === 'json-to-csv' ? 'CSV Output' : 'JSON Output'}</span>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button onClick={() => setOutput("")} style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>Clear</button>
                                    <button onClick={copy} style={{ background: 'transparent', border: 'none', color: '#fb923c', cursor: 'pointer' }}>Copy</button>
                                </div>
                            </div>
                            <textarea
                                readOnly
                                value={output}
                                style={{ flex: 1, width: '100%', background: 'transparent', border: 'none', padding: 16, color: 'white', fontFamily: 'monospace', resize: 'none', outline: 'none', fontSize: 14 }}
                            />
                        </div>
                    </div>

                    {error && (
                        <div style={{ marginTop: 24, padding: 16, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 8, color: '#ef4444', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
