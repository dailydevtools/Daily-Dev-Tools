"use client";

import { useState } from "react";
import { Copy, Database } from "lucide-react";
import Link from "next/link";

export default function SqlToJson() {
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

            if (result.length === 0) throw new Error("Could not parse SQL. Ensure it is standard INSERT INTO statements.");
            setOutput(JSON.stringify(result, null, 2));

        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 0, marginBottom: 24, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            Input SQL (INSERT statements only)
                        </div>
                        <textarea
                            value={input} onChange={e => setInput(e.target.value)}
                            placeholder="INSERT INTO users (id, name, age) VALUES (1, 'John', 30);"
                            style={{ width: '100%', height: 200, background: 'transparent', border: 'none', padding: 20, color: 'white', fontFamily: 'monospace', resize: 'vertical', outline: 'none' }}
                        />
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <button onClick={convert} className="btn-primary" style={{ padding: '12px 32px' }}>Convert to JSON</button>
                    </div>

                    {error && <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: 24 }}>{error}</div>}

                    <div className="glass-card" style={{ padding: 0, position: 'relative' }}>
                        <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            Output JSON
                        </div>
                        <textarea
                            readOnly
                            value={output}
                            style={{ width: '100%', height: 300, background: 'transparent', border: 'none', padding: 20, color: 'white', fontFamily: 'monospace', resize: 'vertical', outline: 'none' }}
                        />
                        <button onClick={() => navigator.clipboard.writeText(output)} style={{ position: 'absolute', top: 50, right: 12 }} className="btn-secondary">
                            <Copy size={16} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
