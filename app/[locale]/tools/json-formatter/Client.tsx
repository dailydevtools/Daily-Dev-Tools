"use client";

import { useState } from "react";
import { Copy, Check, Download, Upload, Trash2, FileJson } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function JSONFormatterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                        icon={<FileJson size={28} className="text-[#fb923c]" />}
                    />

                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <button onClick={formatJSON} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-2.5 px-5">
                            {t('common.format')} JSON
                        </button>

                        <button onClick={validateJSON} className="inline-flex items-center justify-center gap-2 bg-[var(--card-bg)] text-[#22c55e] font-semibold text-sm px-6 py-3 rounded-[10px] border border-[#22c55e]/30 cursor-pointer transition-all duration-300 no-underline hover:bg-[#22c55e]/10 hover:border-[#22c55e] hover:-translate-y-0.5 py-2.5 px-5">
                            <Check width={16} height={16} />
                            Validate
                        </button>

                        <button onClick={minifyJSON} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2.5 px-5">
                            {t('common.minify')}
                        </button>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 px-4 py-2 flex items-center gap-2">
                            <label className="text-[13px] text-[var(--muted-text)]">{t('common.indent')}</label>
                            <select
                                value={indentSize}
                                onChange={(e) => setIndentSize(Number(e.target.value))}
                                className="bg-transparent border-none outline-none text-[var(--foreground)] text-[13px] cursor-pointer"
                            >
                                <option value={2} className="bg-[var(--card-bg)] text-[var(--foreground)]">2 {t('JsonFormatter.spaces')}</option>
                                <option value={4} className="bg-[var(--card-bg)] text-[var(--foreground)]">4 {t('JsonFormatter.spaces')}</option>
                            </select>
                        </div>

                        <label className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2.5 px-5 cursor-pointer flex items-center gap-2">
                            <Upload width={16} height={16} />
                            {t('common.upload')}
                            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                        </label>

                        <button onClick={sampleJSON} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2.5 px-5">
                            {t('common.sample')}
                        </button>

                        <button
                            onClick={clearAll}
                            className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2.5 px-5 flex items-center gap-2 text-[#ef4444] border-red-500/20"
                        >
                            <Trash2 width={16} height={16} />
                            {t('common.clear')}
                        </button>
                    </div>

                    {/* Editor Grid */}
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
                        {/* Input */}
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden">
                            <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                                        <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                                        <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                                    </div>
                                    <span className="text-sm font-medium text-[var(--muted-text)]">{t('common.input')}</span>
                                </div>
                                <span className="text-xs text-[var(--muted-text)]">{input.length} {t('common.chars')}</span>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t('JsonFormatter.inputPlaceholder')}
                                className="w-full h-[450px] bg-transparent border-none p-5 font-mono text-[13px] text-[var(--foreground)] resize-none outline-none placeholder:text-[var(--muted-text)]"
                                spellCheck={false}
                            />
                        </div>

                        {/* Output */}
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-2xl overflow-hidden">
                            <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                                        <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                                        <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                                    </div>
                                    <span className="text-sm font-medium text-[var(--muted-text)]">{t('common.output')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {output && (
                                        <>
                                            <button
                                                onClick={downloadJSON}
                                                className="p-2 bg-transparent border-none cursor-pointer text-[var(--muted-text)] rounded-lg hover:text-[var(--foreground)]"
                                                title={t('common.download')}
                                            >
                                                <Download width={16} height={16} />
                                            </button>
                                            <button
                                                onClick={copyToClipboard}
                                                className={`p-2 bg-transparent border-none cursor-pointer rounded-lg hover:text-[var(--foreground)] ${copied ? 'text-[#22c55e]' : 'text-[var(--muted-text)]'}`}
                                                title={t('common.copy')}
                                            >
                                                {copied ? <Check width={16} height={16} /> : <Copy width={16} height={16} />}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                <textarea
                                    value={output}
                                    readOnly
                                    placeholder={t('JsonFormatter.outputPlaceholder')}
                                    className="w-full h-[450px] bg-transparent border-none p-5 font-mono text-[13px] text-[#4ade80] resize-none outline-none placeholder:text-[var(--muted-text)]"
                                    spellCheck={false}
                                />
                                {error && (
                                    <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-6 z-20">
                                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 rounded-2xl max-w-[400px] text-center">
                                            <div className="text-5xl mb-4">⚠️</div>
                                            <h4 className="font-semibold text-[#ef4444] text-lg mb-2">{t('common.invalid')}</h4>
                                            <p className="text-sm text-[#9ca3af] leading-relaxed">{error}</p>
                                        </div>
                                    </div>
                                )}
                                {validationSuccess && !error && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6 z-20 animate-in fade-in duration-200">
                                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-green-500/30 rounded-[20px] p-8 rounded-2xl max-w-[400px] text-center shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                            <div className="text-5xl mb-4 text-green-500">
                                                <Check className="w-16 h-16 mx-auto" />
                                            </div>
                                            <h4 className="font-semibold text-green-500 text-xl mb-2">Valid JSON!</h4>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
