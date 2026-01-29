"use client";

import { useState } from "react";
import { Copy, Check, Download, Upload, Trash2, FileJson } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";
import CopyButton from "../../../components/ui/CopyButton";
import MotionCard from "../../../components/ui/MotionCard";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidSelect } from "../../../components/ui/LiquidInput";

export default function JSONFormatterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [indentSize, setIndentSize] = useState(2);
    const [validationSuccess, setValidationSuccess] = useState(false);

    const formatJSON = () => {
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, indentSize);
            setOutput(formatted);
            setError("");
            setValidationSuccess(true);
            setTimeout(() => setValidationSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message);
            setOutput("");
            setValidationSuccess(false);
        }
    };

    const validateJSON = () => {
        try {
            JSON.parse(input);
            setError("");
            setValidationSuccess(true);
            setTimeout(() => setValidationSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message);
            setValidationSuccess(false);
        }
    };

    const minifyJSON = () => {
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            setError("");
            setValidationSuccess(true);
            setTimeout(() => setValidationSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message);
            setOutput("");
            setValidationSuccess(false);
        }
    };

    const downloadJSON = () => {
        const blob = new Blob([output], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "formatted.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setInput(event.target?.result as string);
            };
            reader.readAsText(file);
        }
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setError("");
        setValidationSuccess(false);
    };

    const sampleJSON = () => {
        setInput(JSON.stringify({
            "name": "John Doe",
            "email": "john@example.com",
            "age": 30,
            "address": {
                "city": "New York",
                "zip": "10001"
            },
            "hobbies": ["coding", "gaming", "reading"]
        }));
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pb-[60px] px-6 pt-6">
                <div className="max-w-[1200px] mx-auto">
                    <ToolPageHeader
                        title={tTools('json-formatter.name')}
                        description={tTools('json-formatter.description')}
                        icon={<ToolIcon name="Braces" size={32} />}
                    />

                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <LiquidButton onClick={formatJSON} className="h-11 px-6 text-sm">
                            {t('common.format')} JSON
                        </LiquidButton>

                        <LiquidButton onClick={validateJSON} variant="ghost" className="h-11 px-5 text-sm text-green-500 hover:text-green-600 border-green-500/30 hover:bg-green-500/10">
                            <Check width={16} height={16} className="mr-2" />
                            Validate
                        </LiquidButton>

                        <LiquidButton onClick={minifyJSON} variant="secondary" className="h-11 px-5 text-sm">
                            {t('common.minify')}
                        </LiquidButton>

                        <div className="flex items-center gap-2 bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-xl border border-[var(--border-color)] rounded-xl px-4 h-11 transition-all hover:border-orange-500/50 group">
                            <label className="text-[13px] text-[var(--muted-text)] whitespace-nowrap group-hover:text-orange-500 transition-colors">{t('common.indent')}</label>
                            <select
                                value={indentSize}
                                onChange={(e) => setIndentSize(Number(e.target.value))}
                                className="bg-transparent border-none outline-none text-[var(--foreground)] text-[13px] cursor-pointer font-medium"
                            >
                                <option value={2} className="bg-neutral-800 text-white">2 {t('JsonFormatter.spaces')}</option>
                                <option value={4} className="bg-neutral-800 text-white">4 {t('JsonFormatter.spaces')}</option>
                            </select>
                        </div>

                        <div className="w-px h-8 bg-[var(--border-color)] mx-1 hidden md:block" />

                        <div className="relative">
                            <LiquidButton onClick={() => document.getElementById('json-upload')?.click()} variant="secondary" className="h-11 px-5 text-sm">
                                <Upload width={16} height={16} className="mr-2" />
                                {t('common.upload')}
                            </LiquidButton>
                            <input id="json-upload" type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                        </div>

                        <LiquidButton onClick={sampleJSON} variant="ghost" className="h-11 px-5 text-sm">
                            {t('common.sample')}
                        </LiquidButton>

                        <LiquidButton onClick={clearAll} variant="ghost" className="h-11 px-5 text-sm text-red-500 hover:text-red-600 border-red-500/20 hover:bg-red-500/10">
                            <Trash2 width={16} height={16} className="mr-2" />
                            {t('common.clear')}
                        </LiquidButton>
                    </div>

                    {/* Editor Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Input */}
                        <LiquidCard className="p-0 overflow-hidden flex flex-col h-[500px] group focus-within:ring-2 ring-orange-500/20 transition-all">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5 opacity-60">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('common.input')}</span>
                                </div>
                                <span className="text-xs text-[var(--muted-text)] font-mono">{input.length} chars</span>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t('JsonFormatter.inputPlaceholder')}
                                className="flex-1 w-full bg-transparent border-none p-5 font-mono text-[13px] text-[var(--foreground)] resize-none outline-none placeholder:text-[var(--muted-text)] leading-relaxed"
                                spellCheck={false}
                            />
                        </LiquidCard>

                        {/* Output */}
                        <LiquidCard className="p-0 overflow-hidden flex flex-col h-[500px] group focus-within:ring-2 ring-orange-500/20 transition-all relative">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5 opacity-60">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('common.output')}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    {output && (
                                        <>
                                            <button
                                                onClick={downloadJSON}
                                                className="p-1.5 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-lg transition-colors text-[var(--muted-text)] hover:text-[var(--foreground)]"
                                                title={t('common.download')}
                                            >
                                                <Download width={14} height={14} />
                                            </button>
                                            <CopyButton
                                                text={output}
                                                className="hover:bg-neutral-200 dark:hover:bg-white/10 rounded-lg transition-colors text-[var(--muted-text)] hover:text-[var(--foreground)]"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="relative flex-1 flex flex-col">
                                <textarea
                                    value={output}
                                    readOnly
                                    placeholder={t('JsonFormatter.outputPlaceholder')}
                                    className="flex-1 w-full bg-transparent border-none p-5 font-mono text-[13px] text-green-600 dark:text-green-400 resize-none outline-none placeholder:text-[var(--muted-text)] leading-relaxed"
                                    spellCheck={false}
                                />
                                {error && (
                                    <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-20 animate-in fade-in duration-200">
                                        <div className="bg-white dark:bg-[#111] border border-red-200 dark:border-red-900/50 shadow-2xl rounded-2xl p-8 max-w-[400px] text-center">
                                            <div className="text-4xl mb-4">⚠️</div>
                                            <h4 className="font-bold text-red-500 text-lg mb-2">{t('common.invalid')}</h4>
                                            <p className="text-sm text-[var(--muted-text)] leading-relaxed">{error}</p>
                                        </div>
                                    </div>
                                )}
                                {validationSuccess && !error && (
                                    <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-6 z-20 animate-in fade-in zoom-in duration-300">
                                        <div className="bg-white dark:bg-[#111] border border-green-200 dark:border-green-900/50 shadow-2xl rounded-2xl p-8 text-center">
                                            <div className="text-5xl mb-4 text-green-500">
                                                <Check className="w-20 h-20 mx-auto" />
                                            </div>
                                            <h4 className="font-bold text-green-500 text-2xl">Valid JSON!</h4>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </LiquidCard>
                    </div>
                </div>
            </div>
        </main>
    );
}
