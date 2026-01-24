"use client";

import { useState } from "react";
import { Copy, Check, Type } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-3xl flex flex-col">
                            <div className="border-b border-white/5 pb-4 mb-4 flex justify-between">
                                <label className="text-[#fb923c] font-semibold">{t('CaseConverter.inputText')}</label>
                                <button onClick={() => setText("")} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-1 px-3 text-xs">{t('CaseConverter.clear')}</button>
                            </div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder={t('CaseConverter.inputPlaceholder')}
                                className="flex-1 min-h-[400px] bg-transparent border-none resize-none outline-none text-base text-[#e5e7eb] leading-relaxed"
                            />
                        </div>

                        {/* Output List */}
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-3xl flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                            <h3 className="text-white font-semibold mb-2">{t('CaseConverter.conversions')}</h3>
                            {cases.map((c) => {
                                const converted = convert(c.id);
                                return (
                                    <div key={c.id} className="bg-white/5 p-4 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[#9ca3af] text-[13px]">{c.label}</span>
                                            <button onClick={() => copyToClipboard(converted, c.id)} className={`bg-transparent border-none cursor-pointer ${copied === c.id ? 'text-[#4ade80]' : 'text-[#6b7280]'}`}>
                                                {copied === c.id ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                        <div className="text-white font-mono text-sm break-all">
                                            {converted || <span className="opacity-30">{c.example}</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
