"use client";

import { useState } from "react";
import { Copy, Check, Type, RotateCcw } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";

export default function CaseConverterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [text, setText] = useState("Hello World Example Text");
    const [copied, setCopied] = useState<string | null>(null);

    const convert = (type: string) => {
        if (!text) return "";

        // Normalize to words first
        const words = text
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase
            .replace(/[_-]/g, ' ') // Split snake/kebab
            .split(/\s+/)
            .filter(w => w.length > 0)
            .map(w => w.toLowerCase());

        if (words.length === 0) return "";

        switch (type) {
            case 'camel':
                return words[0] + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
            case 'pascal':
                return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
            case 'snake':
                return words.join('_');
            case 'kebab':
                return words.join('-');
            case 'constant':
                return words.join('_').toUpperCase();
            case 'dot':
                return words.join('.');
            case 'path':
                return words.join('/');
            case 'title':
                return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            case 'sentence':
                return words.map((w, i) => i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w).join(' ');
            case 'lower':
                return words.join(' ');
            case 'upper':
                return words.join(' ').toUpperCase();
            default:
                return words.join(' ');
        }
    };

    const copyToClipboard = (val: string, type: string) => {
        navigator.clipboard.writeText(val);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const cases = [
        { id: 'camel', label: 'camelCase', example: 'helloWorld' },
        { id: 'pascal', label: 'PascalCase', example: 'HelloWorld' },
        { id: 'snake', label: 'snake_case', example: 'hello_world' },
        { id: 'kebab', label: 'kebab-case', example: 'hello-world' },
        { id: 'constant', label: 'CONSTANT_CASE', example: 'HELLO_WORLD' },
        { id: 'dot', label: 'dot.case', example: 'hello.world' },
        { id: 'path', label: 'path/case', example: 'hello/world' },
        { id: 'title', label: 'Title Case', example: 'Hello World' },
        { id: 'sentence', label: 'Sentence case', example: 'Hello world' },
        { id: 'lower', label: 'lowercase', example: 'hello world' },
        { id: 'upper', label: 'UPPERCASE', example: 'HELLO WORLD' },
    ];

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title={tTools('case-converter.name')}
                        description={tTools('case-converter.description')}
                        icon={<Type size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-8">

                        {/* Input */}
                        <LiquidCard className="p-0 overflow-hidden flex flex-col h-[600px] group focus-within:ring-2 ring-orange-500/20 transition-all">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5 opacity-60">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('CaseConverter.inputText')}</span>
                                </div>
                                <button onClick={() => setText("")} className="text-xs flex items-center gap-1.5 text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors">
                                    <RotateCcw size={12} /> {t('CaseConverter.clear')}
                                </button>
                            </div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder={t('CaseConverter.inputPlaceholder')}
                                className="flex-1 bg-transparent border-none p-6 text-[var(--foreground)] text-base resize-none outline-none leading-relaxed placeholder:text-[var(--muted-text)] font-sans"
                                spellCheck={false}
                            />
                        </LiquidCard>

                        {/* Output List */}
                        <LiquidCard className="p-6 flex flex-col gap-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                            <h3 className="text-[var(--foreground)] font-semibold mb-2">{t('CaseConverter.conversions')}</h3>
                            {cases.map((c) => {
                                const converted = convert(c.id);
                                return (
                                    <div key={c.id} className="bg-neutral-100/50 dark:bg-white/5 p-4 rounded-xl border border-[var(--border-color)] transition-colors hover:border-orange-500/30">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[var(--muted-text)] text-[13px]">{c.label}</span>
                                            <button onClick={() => copyToClipboard(converted, c.id)} className={`bg-transparent border-none cursor-pointer transition-colors ${copied === c.id ? 'text-green-500' : 'text-[var(--muted-text)] hover:text-orange-500'}`}>
                                                {copied === c.id ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                        <div className="text-[var(--foreground)] font-mono text-sm break-all">
                                            {converted || <span className="opacity-30">{c.example}</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </LiquidCard>
                    </div>
                </div>
            </div>
        </main>
    );
}
