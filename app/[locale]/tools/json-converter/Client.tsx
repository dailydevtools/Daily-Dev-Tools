"use client";

import { useState } from "react";
import { ArrowRightLeft, FileJson } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import LiquidTabs from "../../../components/ui/LiquidTabs";
import { LiquidCheckbox } from "../../../components/ui/LiquidCheckbox";
import CodeEditor from "../../../components/CodeEditor";

export default function JsonCsvConverterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"json-to-csv" | "csv-to-json">("json-to-csv");
    const [minify, setMinify] = useState(false);
    const [parseNumbers, setParseNumbers] = useState(true);
    const [error, setError] = useState("");

    const handleConvert = () => {
        setError("");
        try {
            if (!input.trim()) return;

            if (mode === "json-to-csv") {
                const data = JSON.parse(input);
                const array = Array.isArray(data) ? data : [data];
                if (array.length === 0) throw new Error("Empty JSON");

                // Collect all unique keys
                const keys = Array.from(new Set(array.flatMap(Object.keys)));
                const header = keys.join(",");
                const rows = array.map((obj: any) =>
                    keys.map(k => {
                        const val = obj[k];
                        return typeof val === 'object' ? JSON.stringify(val).replace(/,/g, ';') : JSON.stringify(val ?? "");
                    }).join(",")
                );

                setOutput([header, ...rows].join("\n"));
            } else {
                // CSV to JSON
                const lines = input.trim().split("\n");
                if (lines.length < 2) throw new Error("Invalid CSV (need header + 1 row)");

                const headers = lines[0].split(",").map(h => h.trim());
                const result = lines.slice(1).map(line => {
                    const values = line.split(",");
                    const obj: Record<string, string | number | boolean | null | undefined> = {};
                    headers.forEach((h, i) => {
                        let val: string | number | boolean | null | undefined = values[i]?.trim();
                        // Try to parse numbers/bools
                        if (val === "true") val = true;
                        else if (val === "false") val = false;
                        else if (parseNumbers && !isNaN(Number(val)) && val !== "") val = Number(val);
                        else if (val?.startsWith('"') && val?.endsWith('"')) val = val.slice(1, -1);

                        obj[h] = val;
                    });
                    return obj;
                });
                setOutput(JSON.stringify(result, null, minify ? 0 : 2));
            }
        } catch (e: any) {
            setError(e.message);
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <ToolPageHeader
                        title={tTools('json-converter.name')}
                        description={tTools('json-converter.description')}
                        icon={<FileJson size={28} className="text-[#fb923c]" />}
                    />

                    <div className="mb-10 w-full max-w-[400px] mx-auto">
                        <LiquidTabs
                            tabs={["json-to-csv", "csv-to-json"]}
                            activeTab={mode}
                            onChange={(m) => { setMode(m as any); setInput(""); setOutput(""); }}
                            labels={{
                                "json-to-csv": t('JsonConverter.jsonToCsv'),
                                "csv-to-json": t('JsonConverter.csvToJson')
                            }}
                        />
                        {mode === 'csv-to-json' && (
                            <div className="flex justify-center gap-6 mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                <LiquidCheckbox
                                    checked={parseNumbers}
                                    onChange={setParseNumbers}
                                    label={t('JsonConverter.parseNumbers')}
                                />
                                <LiquidCheckbox
                                    checked={minify}
                                    onChange={setMinify}
                                    label={t('JsonConverter.minifyOutput')}
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                        <LiquidCard className="p-0 overflow-hidden flex flex-col h-[600px] group focus-within:ring-2 ring-orange-500/20 transition-all">
                            <div className="py-3 px-5 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5 text-[var(--muted-text)] text-xs font-medium flex justify-between items-center">
                                <span className="uppercase tracking-wider opacity-70">{mode === 'json-to-csv' ? t('JsonConverter.jsonInput') : t('JsonConverter.csvInput')}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => setInput("")} className="hover:text-[var(--foreground)] transition-colors px-2 py-1">{t('common.clear')}</button>
                                    <button onClick={() => navigator.clipboard.readText().then(t => setInput(t))} className="text-orange-500 hover:text-orange-400 transition-colors px-2 py-1 font-medium bg-orange-500/10 rounded">{t('common.paste')}</button>
                                </div>
                            </div>
                            <div className="flex-1 w-full bg-transparent relative">
                                <CodeEditor
                                    language={mode === 'json-to-csv' ? 'json' : 'plaintext'}
                                    value={input}
                                    onChange={(val) => setInput(val || "")}
                                    className="border-none !bg-transparent rounded-none rounded-b-xl"
                                />
                            </div>
                        </LiquidCard>

                        <div className="flex flex-col gap-3">
                            <LiquidButton onClick={handleConvert} className="p-0 w-12 h-12 rounded-full flex items-center justify-center">
                                <ArrowRightLeft size={20} />
                            </LiquidButton>
                        </div>

                        <LiquidCard className="p-0 overflow-hidden flex flex-col h-[600px] group focus-within:ring-2 ring-orange-500/20 transition-all">
                            <div className="py-3 px-5 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5 text-[var(--muted-text)] text-xs font-medium flex justify-between items-center">
                                <span className="uppercase tracking-wider opacity-70">{mode === 'json-to-csv' ? t('JsonConverter.csvOutput') : t('JsonConverter.jsonOutput')}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => setOutput("")} className="hover:text-[var(--foreground)] transition-colors px-2 py-1">{t('common.clear')}</button>
                                    <button onClick={copy} className="text-orange-500 hover:text-orange-400 transition-colors px-2 py-1 font-medium bg-orange-500/10 rounded">{t('common.copy')}</button>
                                </div>
                            </div>
                            <div className="flex-1 w-full bg-transparent relative">
                                <CodeEditor
                                    language={mode === 'json-to-csv' ? 'plaintext' : 'json'}
                                    value={output}
                                    options={{ readOnly: true }}
                                    className="border-none !bg-transparent rounded-none rounded-b-xl"
                                />
                            </div>
                        </LiquidCard>
                    </div>

                    {error && (
                        <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-center animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
