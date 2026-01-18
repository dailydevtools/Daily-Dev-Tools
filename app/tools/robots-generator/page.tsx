"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface Rule {
    agent: string;
    allow: boolean; // true = allow, false = disallow
    path: string;
}

export default function RobotsGenerator() {
    const [rules, setRules] = useState<Rule[]>([
        { agent: "*", allow: false, path: "/admin/" }
    ]);
    const [sitemap, setSitemap] = useState("");

    const addRule = () => {
        setRules([...rules, { agent: "*", allow: false, path: "/" }]);
    };

    const removeRule = (idx: number) => {
        setRules(rules.filter((_, i) => i !== idx));
    };

    const updateRule = (idx: number, field: keyof Rule, val: any) => {
        const newRules = [...rules];
        newRules[idx] = { ...newRules[idx], [field]: val };
        setRules(newRules);
    };

    const generate = () => {
        let txt = "";
        // Group by agent? Or just list. Standard is User-agent block.
        // Simple implementation: List blocks.
        // Usually:
        // User-agent: *
        // Disallow: /admin/
        // User-agent: Googlebot
        // ...

        // Let's create a map agent -> rules
        const map: Record<string, string[]> = {};
        rules.forEach(r => {
            if (!map[r.agent]) map[r.agent] = [];
            map[r.agent].push(`${r.allow ? "Allow" : "Disallow"}: ${r.path}`);
        });

        Object.keys(map).forEach(agent => {
            txt += `User-agent: ${agent}\n`;
            map[agent].forEach(line => txt += line + "\n");
            txt += "\n";
        });

        if (sitemap) {
            txt += `Sitemap: ${sitemap}\n`;
        }
        return txt;
    };

    const output = generate();

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        <div className="glass-card" style={{ padding: 32 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <div style={{ fontWeight: 600, color: 'white' }}>Rules</div>
                                <button onClick={addRule} className="btn-secondary" style={{ padding: '8px 16px', gap: 8 }}>
                                    <Plus size={16} /> Add Rule
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {rules.map((r, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 12 }}>
                                        <input
                                            type="text" value={r.agent} onChange={e => updateRule(i, 'agent', e.target.value)}
                                            placeholder="*"
                                            className="input-field"
                                            style={{ width: 80, padding: 8, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 6 }}
                                        />
                                        <select
                                            value={r.allow ? "Allow" : "Disallow"}
                                            onChange={e => updateRule(i, 'allow', e.target.value === "Allow")}
                                            style={{ padding: 8, background: '#111', border: '1px solid #333', color: r.allow ? '#22c55e' : '#ef4444', borderRadius: 6 }}
                                        >
                                            <option value="Allow">Allow</option>
                                            <option value="Disallow">Disallow</option>
                                        </select>
                                        <input
                                            type="text" value={r.path} onChange={e => updateRule(i, 'path', e.target.value)}
                                            placeholder="/"
                                            className="input-field"
                                            style={{ flex: 1, padding: 8, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 6 }}
                                        />
                                        <button onClick={() => removeRule(i)} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: 24 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Sitemap URL (Optional)</label>
                                <input
                                    type="text" value={sitemap} onChange={e => setSitemap(e.target.value)}
                                    placeholder="https://example.com/sitemap.xml"
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: 12, background: 'rgba(0,0,0,0.2)', color: '#9ca3af', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Generated robots.txt</div>
                            <textarea
                                readOnly
                                value={output}
                                style={{ flex: 1, background: 'transparent', border: 'none', padding: 20, color: '#fb923c', fontFamily: 'monospace', resize: 'none' }}
                            />
                            <div style={{ padding: 16, textAlign: 'right', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary">Copy</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
