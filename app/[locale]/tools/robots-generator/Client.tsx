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

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput, LiquidSelect } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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
                        <LiquidCard className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <div className="font-semibold text-[var(--foreground)]">{t('RobotsGenerator.rules')}</div>
                                <LiquidButton onClick={addRule} variant="ghost" className="h-9 px-3 gap-2 text-xs">
                                    <Plus size={16} /> {t('RobotsGenerator.addRule')}
                                </LiquidButton>
                            </div>

                            <div className="flex flex-col gap-4">
                                {rules.map((r, i) => (
                                    <div key={i} className="flex gap-3 items-center bg-neutral-100/50 dark:bg-white/5 p-3 rounded-xl border border-[var(--border-color)]">
                                        <LiquidInput
                                            type="text" value={r.agent} onChange={e => updateRule(i, 'agent', e.target.value)}
                                            placeholder="*"
                                            className="w-20 h-9 text-sm"
                                        />
                                        <LiquidSelect
                                            value={r.allow ? "Allow" : "Disallow"}
                                            onChange={e => updateRule(i, 'allow', e.target.value === "Allow")}
                                            className={`h-9 text-sm ${r.allow ? 'text-green-500' : 'text-red-500'}`}
                                        >
                                            <option value="Allow">{t('RobotsGenerator.allow')}</option>
                                            <option value="Disallow">{t('RobotsGenerator.disallow')}</option>
                                        </LiquidSelect>
                                        <LiquidInput
                                            type="text" value={r.path} onChange={e => updateRule(i, 'path', e.target.value)}
                                            placeholder="/"
                                            className="flex-1 h-9 text-sm"
                                        />
                                        <LiquidButton onClick={() => removeRule(i)} variant="ghost" className="h-9 w-9 p-0 text-[var(--muted-text)] hover:text-red-500">
                                            <Trash2 size={16} />
                                        </LiquidButton>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('RobotsGenerator.sitemap')}</label>
                                <LiquidInput
                                    type="text" value={sitemap} onChange={e => setSitemap(e.target.value)}
                                    placeholder="https://example.com/sitemap.xml"
                                    className="text-sm"
                                />
                            </div>
                        </LiquidCard>

                        <LiquidCard className="p-0 flex flex-col overflow-hidden">
                            <div className="p-3 bg-neutral-100/50 dark:bg-white/5 text-[var(--muted-text)] text-[13px] border-b border-[var(--border-color)]">{t('RobotsGenerator.output')}</div>
                            <textarea
                                readOnly
                                value={output}
                                className="flex-1 bg-transparent border-none p-5 text-orange-500 font-mono resize-none w-full min-h-[300px] outline-none text-sm leading-relaxed"
                            />
                            <div className="p-4 text-right border-t border-[var(--border-color)] bg-neutral-100/30 dark:bg-white/[0.02]">
                                <LiquidButton onClick={() => navigator.clipboard.writeText(output)} variant="ghost" className="border border-[var(--border-color)] h-10 px-4 text-sm">
                                    {t('common.copy')}
                                </LiquidButton>
                            </div>
                        </LiquidCard>
                    </div>

                </div>
            </div>
        </main>
    );
}
