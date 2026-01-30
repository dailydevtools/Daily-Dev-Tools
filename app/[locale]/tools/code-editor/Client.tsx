"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });
import { Copy, Check, Download, Upload, Trash2, Code2, Settings, Play, Terminal, X } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";
import LiquidSelect from "../../../components/ui/LiquidSelect";

// Helper to define supported languages
const LANGUAGES = [
    "javascript", "typescript", "python", "java", "c", "cpp", "csharp", "go", "rust", "php", "ruby", "swift", "kotlin", "xml", "yaml", "markdown", "sql", "shell", "powershell", "ini", "dockerfile", "css", "html", "json"
].sort();

const THEMES = ["vs-dark", "light"];

// Mapping for Piston API runtimes
const PISTON_RUNTIMES: Record<string, string> = {
    javascript: "javascript",
    typescript: "typescript",
    python: "python",
    java: "java",
    c: "c",
    cpp: "cpp",
    csharp: "csharp",
    go: "go",
    rust: "rust",
    php: "php",
    ruby: "ruby",
    swift: "swift",
    kotlin: "kotlin",
    shell: "bash",
    powershell: "powershell"
};

export default function CodeEditorClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const tEditor = useTranslations('ToolPage.CodeEditor');

    // State
    const [code, setCode] = useState("// Start typing or paste your code here...");
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(14);
    const [minimap, setMinimap] = useState(true);
    const [copied, setCopied] = useState(false);

    // Execution State
    const [output, setOutput] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    // Editor Ref
    const editorRef = useRef<any>(null);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
    };

    const handleFormat = () => {
        if (editorRef.current) {
            editorRef.current.getAction('editor.action.formatDocument').run();
        }
    };

    const handleRun = async () => {
        const runtime = PISTON_RUNTIMES[language];
        if (!runtime) {
            setOutput("Execution not supported for this language in this environment.");
            return;
        }

        setIsRunning(true);
        // Don't clear output immediately if you want to keep previous result visible until new one arrives, 
        // but clearing makes it obvious something is happening.
        setOutput("Running...");

        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: runtime,
                    version: "*",
                    files: [{ content: code }]
                })
            });
            const data = await response.json();

            if (data.run) {
                setOutput(data.run.output || "No output returned.");
            } else {
                setOutput(data.message || "An error occurred.");
            }
        } catch (error) {
            setOutput("Failed to execute code. Please check your connection.");
        } finally {
            setIsRunning(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCode(event.target?.result as string);
            };
            reader.readAsText(file);
        }
    };

    const downloadCode = () => {
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `code.${language === "javascript" ? "js" : language === "typescript" ? "ts" : language === "python" ? "py" : "txt"}`; // Basic extension logic
        a.click();
        URL.revokeObjectURL(url);
    };

    const clearAll = () => {
        setCode("");
        setOutput(null);
    };

    const clearOutput = () => {
        setOutput(null);
    }

    const isRunnable = !!PISTON_RUNTIMES[language];

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pb-[60px] px-6 pt-6">
                <div className="max-w-[1200px] mx-auto">
                    <ToolPageHeader
                        title={tTools('code-editor.name')}
                        description={tTools('code-editor.description')}
                        icon={<ToolIcon name="Code2" size={32} />}
                    />

                    {/* Controls Bar */}
                    <div className="relative z-20 flex flex-wrap items-center gap-3 mb-6 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] p-4 rounded-[20px]">

                        {/* Language Selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-[var(--muted-text)] font-medium uppercase tracking-wider">{tEditor('language')}</span>
                            <LiquidSelect
                                value={language}
                                onChange={(val) => {
                                    setLanguage(val);
                                    setOutput(null);
                                }}
                                options={LANGUAGES}
                                className="min-w-[140px]"
                            />
                        </div>

                        <div className="w-[1px] h-8 bg-[var(--border-color)] mx-2 hidden sm:block" />

                        {/* Theme & Settings */}
                        <div className="flex items-center gap-3">
                            <LiquidSelect
                                value={theme}
                                onChange={setTheme}
                                options={THEMES.map(th => ({ value: th, label: th === 'vs-dark' ? 'Dark' : 'Light' }))}
                                className="min-w-[100px]"
                            />

                            <div className="flex items-center gap-2 border border-border-color rounded-lg px-3 py-1.5">
                                <span className="text-xs text-[var(--muted-text)]">Size</span>
                                <input
                                    type="number"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                    className="w-12 bg-transparent text-[var(--foreground)] text-sm outline-none border-none"
                                    min={10} max={30}
                                />
                            </div>
                        </div>

                        <div className="flex-1" />

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {isRunnable && (
                                <button
                                    onClick={handleRun}
                                    disabled={isRunning}
                                    className={`inline-flex items-center justify-center gap-2 font-semibold text-sm px-4 py-2 rounded-lg border-none cursor-pointer transition-all duration-300 shadow-sm ${isRunning ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white hover:-translate-y-0.5'}`}
                                >
                                    {isRunning ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {tEditor('running')}
                                        </>
                                    ) : (
                                        <>
                                            <Play size={16} fill="currentColor" />
                                            {tEditor('run')}
                                        </>
                                    )}
                                </button>
                            )}

                            <button onClick={handleFormat} className="hidden sm:inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-4 py-2 rounded-lg border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 shadow-sm">
                                {t('common.format')}
                            </button>

                            <label className="p-2 text-[var(--muted-text)] hover:text-[var(--foreground)] cursor-pointer transition-colors" title={t('common.upload')}>
                                <Upload size={18} />
                                <input type="file" onChange={handleFileUpload} className="hidden" />
                            </label>

                            <button onClick={downloadCode} className="p-2 bg-transparent border-none text-[var(--muted-text)] hover:text-[var(--foreground)] cursor-pointer transition-colors" title={t('common.download')}>
                                <Download size={18} />
                            </button>

                            <button onClick={copyToClipboard} className={`p-2 bg-transparent border-none cursor-pointer transition-colors ${copied ? 'text-green-500' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`} title={t('common.copy')}>
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                            </button>

                            <button onClick={clearAll} className="p-2 bg-transparent border-none text-red-500/70 hover:text-red-500 cursor-pointer transition-colors" title={t('common.clear')}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Editor & Output Container */}
                    <div className={`grid gap-4 h-[75vh] ${output !== null ? 'grid-rows-[1fr_auto] lg:grid-rows-1 lg:grid-cols-2' : 'grid-rows-1'}`}>
                        {/* Editor */}
                        <div className={`rounded-[20px] overflow-hidden border border-[var(--card-border)] shadow-2xl ${theme === 'vs-dark' ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                            <Editor
                                height="100%"
                                language={language}
                                theme={theme}
                                value={code}
                                onChange={(value) => setCode(value || "")}
                                onMount={handleEditorDidMount}
                                options={{
                                    minimap: { enabled: minimap },
                                    fontSize: fontSize,
                                    wordWrap: "on",
                                    automaticLayout: true,
                                    scrollBeyondLastLine: false,
                                    padding: { top: 20, bottom: 20 },
                                    smoothScrolling: true,
                                    cursorBlinking: "smooth",
                                    formatOnPaste: true,
                                    formatOnType: true,
                                }}
                                loading={<div className="text-[var(--muted-text)] flex items-center gap-2 justify-center h-full">Loading Editor...</div>}
                            />
                        </div>

                        {/* Output Panel */}
                        {output !== null && (
                            <div className={`border border-[var(--card-border)] rounded-[20px] overflow-hidden flex flex-col max-h-[30vh] lg:max-h-full animate-in slide-in-from-bottom-5 lg:slide-in-from-right-5 fade-in duration-300 ${theme === 'vs-dark' ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                                <div className={`flex items-center justify-between px-4 py-2 border-b border-[var(--card-border)] ${theme === 'vs-dark' ? 'bg-[#2d2d2d]' : 'bg-neutral-100'}`}>
                                    <div className={`flex items-center gap-2 text-sm font-medium ${theme === 'vs-dark' ? 'text-white' : 'text-neutral-900'}`}>
                                        <Terminal size={16} />
                                        {tEditor('output')}
                                    </div>
                                    <button
                                        onClick={clearOutput}
                                        className={`p-1 transition-colors rounded ${theme === 'vs-dark' ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-black hover:bg-black/10'}`}
                                        title={tEditor('clearOutput')}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className={`p-4 overflow-auto font-mono text-sm whitespace-pre-wrap selection:bg-white/20 h-full ${theme === 'vs-dark' ? 'text-white/90' : 'text-neutral-900'}`}>
                                    {output}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
