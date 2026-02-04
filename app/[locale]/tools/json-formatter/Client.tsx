"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Download, Upload, Trash2, FileJson, Wrench, Code2, Network, ChevronDown } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";
import CopyButton from "../../../components/ui/CopyButton";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import LiquidSelect from "../../../components/ui/LiquidSelect";
import JsonEditor from "../../../components/JsonEditor";
import { repairJSON } from "../../../lib/jsonRepair";
import JsonTree from "../../../components/JsonTree";
import LiquidTabs from "../../../components/ui/LiquidTabs";

export default function JSONFormatterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [parsedData, setParsedData] = useState<any>(null);
    const [error, setError] = useState("");
    const [indentSize, setIndentSize] = useState(2);
    const [activeTab, setActiveTab] = useState("code"); // 'code' | 'tree'
    const [stats, setStats] = useState({ size: 0, items: 0, depth: 0 });

    useEffect(() => {
        if (!input) {
            setStats({ size: 0, items: 0, depth: 0 });
            return;
        }

        // Calculate basic stats on input change
        setStats(s => ({
            ...s,
            size: new Blob([input]).size
        }));
    }, [input]);

    const calculateStats = (data: any) => {
        let items = 0;
        let maxDepth = 0;

        const traverse = (obj: any, depth: number) => {
            if (depth > maxDepth) maxDepth = depth;
            if (obj && typeof obj === 'object') {
                items++;
                Object.values(obj).forEach(val => traverse(val, depth + 1));
            }
        };

        traverse(data, 1);
        setStats(s => ({ ...s, items, depth: maxDepth }));
    };

    const processJSON = (jsonStr: string, mode: 'format' | 'minify' | 'validate' | 'repair' = 'format') => {
        try {
            let processedStr = jsonStr;

            if (mode === 'repair') {
                processedStr = repairJSON(jsonStr);
                setInput(processedStr); // Update input with repaired version
            }

            const parsed = JSON.parse(processedStr);
            setParsedData(parsed);
            calculateStats(parsed);

            if (mode === 'minify') {
                setOutput(JSON.stringify(parsed));
            } else {
                // Default format
                setOutput(JSON.stringify(parsed, null, indentSize));
            }

            setError("");
        } catch (err: any) {
            setError(err.message);
            setParsedData(null);
            if (mode !== 'validate') {
                setOutput(""); // Clear output on error unless just validating
            }
        }
    };

    const handleFormat = () => processJSON(input, 'format');
    const handleMinify = () => processJSON(input, 'minify');
    const handleRepair = () => processJSON(input, 'repair');

    // Auto-update output when indentation changes if we have valid data
    useEffect(() => {
        if (parsedData) {
            setOutput(JSON.stringify(parsedData, null, indentSize));
        }
    }, [indentSize, parsedData]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                setInput(text);
                processJSON(text, 'format'); // Auto-format on upload
            };
            reader.readAsText(file);
        }
    };

    const downloadJSON = () => {
        if (!output) return;
        const blob = new Blob([output], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "formatted.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <main className="min-h-screen flex flex-col pb-10">
            <div className="pt-6 px-6 pb-4 border-b border-[var(--border-color)] bg-[var(--bg-color)] sticky top-0 z-30">
                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500">
                            <ToolIcon name="Braces" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">{tTools('json-formatter.name')}</h1>
                            <div className="text-xs text-[var(--muted-text)] hidden sm:block">
                                {stats.size > 0 && `${stats.size} Bytes • ${stats.items} Objects • Depth ${stats.depth}`}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <LiquidButton onClick={handleFormat} className="h-9 px-4 text-xs font-medium">
                            Format
                        </LiquidButton>
                        <LiquidButton onClick={handleRepair} variant="secondary" className="h-9 px-4 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20">
                            <Wrench size={14} className="mr-2" />
                            Repair
                        </LiquidButton>
                        <LiquidButton onClick={handleMinify} variant="ghost" className="h-9 px-3 text-xs">
                            Minify
                        </LiquidButton>

                        <div className="w-px h-6 bg-[var(--border-color)] mx-1" />

                        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg flex items-center h-9 px-2">
                            <span className="text-[10px] text-[var(--muted-text)] mr-2 uppercase tracking-wide">Indent</span>
                            <select
                                value={indentSize}
                                onChange={(e) => setIndentSize(Number(e.target.value))}
                                className="bg-transparent text-xs font-medium outline-none cursor-pointer"
                            >
                                <option value="2">2 Spaces</option>
                                <option value="4">4 Spaces</option>
                                <option value="8">8 Spaces</option>
                            </select>
                        </div>

                        <LiquidButton onClick={() => setInput("")} variant="ghost" className="h-9 px-3 text-xs text-red-500 hover:text-red-600">
                            <Trash2 size={14} />
                        </LiquidButton>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

                {/* Left Column: Input */}
                <div className="flex flex-col h-[600px] lg:h-[calc(100vh-140px)] min-h-[500px]">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[var(--foreground)]">Original JSON</span>
                            {error && <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-medium">Invalid</span>}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => document.getElementById('json-upload')?.click()} className="text-xs flex items-center gap-1.5 text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors bg-neutral-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-transparent hover:border-[var(--border-color)]">
                                <Upload size={13} /> Upload
                            </button>
                            <input id="json-upload" type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                        </div>
                    </div>

                    <div className={`flex-1 rounded-xl overflow-hidden border transition-colors relative ${error ? 'border-red-500/50' : 'border-[var(--border-color)]'}`}>
                        <JsonEditor
                            value={input}
                            onChange={(val) => setInput(val || "")}
                            className="h-full w-full"
                        />
                        {error && (
                            <div className="absolute bottom-4 left-4 right-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-lg text-xs font-mono shadow-lg backdrop-blur-md">
                                <div className="font-bold mb-1">Syntax Error</div>
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Output */}
                <div className="flex flex-col h-[600px] lg:h-[calc(100vh-140px)] min-h-[500px]">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex bg-neutral-100 dark:bg-white/5 p-1 rounded-lg border border-[var(--border-color)]">
                            <button
                                onClick={() => setActiveTab('code')}
                                className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-2 ${activeTab === 'code' ? 'bg-white dark:bg-[#1e1e1e] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                            >
                                <Code2 size={14} /> Code
                            </button>
                            <button
                                onClick={() => setActiveTab('tree')}
                                className={`px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-2 ${activeTab === 'tree' ? 'bg-white dark:bg-[#1e1e1e] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                            >
                                <Network size={14} /> Tree
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={downloadJSON} disabled={!output} className="text-xs flex items-center gap-1.5 text-[var(--muted-text)] hover:text-[var(--foreground)] disabled:opacity-50 transition-colors bg-neutral-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-transparent hover:border-[var(--border-color)]">
                                <Download size={13} /> Download
                            </button>
                            <CopyButton text={output} className="text-xs px-3 py-1.5 bg-neutral-100 dark:bg-white/5 rounded-lg border border-transparent hover:border-[var(--border-color)]" />
                        </div>
                    </div>

                    <div className="flex-1 rounded-xl overflow-hidden border border-[var(--border-color)] bg-neutral-50/50 dark:bg-[#111]">
                        {activeTab === 'code' ? (
                            <JsonEditor
                                value={output}
                                readOnly={true}
                                className="h-full w-full"
                            />
                        ) : (
                            <div className="h-full w-full overflow-auto p-4 bg-white dark:bg-[#1e1e1e]">
                                {parsedData ? <JsonTree data={parsedData} /> : <div className="h-full flex items-center justify-center text-[var(--muted-text)] text-sm">Valid JSON required for tree view</div>}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}
