"use client";

import { useState } from "react";
import { Plus, Trash2, Bot } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

interface Rule {
    agent: string;
    allow: boolean; // true = allow, false = disallow
    path: string;
}

export default function RobotsGeneratorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
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
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title={tTools('robots-generator.name')}
                        description={tTools('robots-generator.description')}
                        icon={<Bot size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <div className="font-semibold text-white">{t('RobotsGenerator.rules')}</div>
                                <button onClick={addRule} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2 px-4 flex gap-2 items-center text-sm">
                                    <Plus size={16} /> {t('RobotsGenerator.addRule')}
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {rules.map((r, i) => (
                                    <div key={i} className="flex gap-3 items-center bg-white/5 p-3 rounded-xl">
                                        <input
                                            type="text" value={r.agent} onChange={e => updateRule(i, 'agent', e.target.value)}
                                            placeholder="*"
                                            className="input-field w-20 p-2 bg-[#111] border border-[#333] text-white rounded-md text-sm"
                                        />
                                        <select
                                            value={r.allow ? "Allow" : "Disallow"}
                                            onChange={e => updateRule(i, 'allow', e.target.value === "Allow")}
                                            className={`p-2 bg-[#111] border border-[#333] rounded-md text-sm ${r.allow ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}
                                        >
                                            <option value="Allow">{t('RobotsGenerator.allow')}</option>
                                            <option value="Disallow">{t('RobotsGenerator.disallow')}</option>
                                        </select>
                                        <input
                                            type="text" value={r.path} onChange={e => updateRule(i, 'path', e.target.value)}
                                            placeholder="/"
                                            className="input-field flex-1 p-2 bg-[#111] border border-[#333] text-white rounded-md text-sm"
                                        />
                                        <button onClick={() => removeRule(i)} className="text-[#6b7280] hover:text-[#ef4444] transition-colors bg-transparent border-none cursor-pointer">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('RobotsGenerator.sitemap')}</label>
                                <input
                                    type="text" value={sitemap} onChange={e => setSitemap(e.target.value)}
                                    placeholder="https://example.com/sitemap.xml"
                                    className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white text-sm"
                                />
                            </div>
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 flex flex-col overflow-hidden">
                            <div className="p-3 bg-black/20 text-[#9ca3af] text-[13px] border-b border-white/10">{t('RobotsGenerator.output')}</div>
                            <textarea
                                readOnly
                                value={output}
                                className="flex-1 bg-transparent border-none p-5 text-[#fb923c] font-mono resize-none w-full min-h-[300px] outline-none text-sm"
                            />
                            <div className="p-4 text-right border-t border-white/10">
                                <button onClick={() => navigator.clipboard.writeText(output)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]">{t('common.copy')}</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
