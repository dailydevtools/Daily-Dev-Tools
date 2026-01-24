"use client";

import { useState } from "react";
import { ArrowRightLeft, FileJson } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function JsonCsvConverterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"json-to-csv" | "csv-to-json">("json-to-csv");
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
                        else if (!isNaN(Number(val)) && val !== "") val = Number(val);
                        else if (val?.startsWith('"') && val?.endsWith('"')) val = val.slice(1, -1);

                        obj[h] = val;
                    });
                    return obj;
                });
                setOutput(JSON.stringify(result, null, 2));
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
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title={tTools('json-converter.name')}
                        description={tTools('json-converter.description')}
                        icon={<FileJson size={28} className="text-[#fb923c]" />}
                    />

                    <div className="flex justify-center mb-8">
                        <div className="bg-white/5 p-1 rounded-xl flex gap-1">
                            <button
                                onClick={() => { setMode("json-to-csv"); setInput(""); setOutput(""); }}
                                className={`
                                    py-2 px-6 rounded-lg border-none cursor-pointer font-medium transition-colors
                                    ${mode === 'json-to-csv' ? 'bg-[#fb923c] text-black' : 'bg-transparent text-[#9ca3af]'}
                                `}
                            >
                                {t('JsonConverter.jsonToCsv')}
                            </button>
                            <button
                                onClick={() => { setMode("csv-to-json"); setInput(""); setOutput(""); }}
                                className={`
                                    py-2 px-6 rounded-lg border-none cursor-pointer font-medium transition-colors
                                    ${mode === 'csv-to-json' ? 'bg-[#fb923c] text-black' : 'bg-transparent text-[#9ca3af]'}
                                `}
                            >
                                {t('JsonConverter.csvToJson')}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden flex flex-col h-[500px]">
                            <div className="py-3 px-4 border-b border-white/10 bg-black/20 text-[#9ca3af] text-[13px] flex justify-between">
                                <span>{mode === 'json-to-csv' ? t('JsonConverter.jsonInput') : t('JsonConverter.csvInput')}</span>
                                <div className="flex gap-3">
                                    <button onClick={() => setInput("")} className="bg-transparent border-none text-[#6b7280] cursor-pointer hover:text-white transition-colors">{t('common.clear')}</button>
                                    <button onClick={() => navigator.clipboard.readText().then(t => setInput(t))} className="bg-transparent border-none text-[#fb923c] cursor-pointer hover:text-white transition-colors">{t('common.paste')}</button>
                                </div>
                            </div>
                            <textarea
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder={mode === 'json-to-csv' ? '[{"name": "John", "age": 30}]' : 'name,age\nJohn,30'}
                                className="flex-1 w-full bg-transparent border-none p-4 text-white font-mono resize-none outline-none text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <button onClick={handleConvert} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] p-4 rounded-full">
                                <ArrowRightLeft size={20} />
                            </button>
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden flex flex-col h-[500px]">
                            <div className="py-3 px-4 border-b border-white/10 bg-black/20 text-[#9ca3af] text-[13px] flex justify-between">
                                <span>{mode === 'json-to-csv' ? t('JsonConverter.csvOutput') : t('JsonConverter.jsonOutput')}</span>
                                <div className="flex gap-3">
                                    <button onClick={() => setOutput("")} className="bg-transparent border-none text-[#6b7280] cursor-pointer hover:text-white transition-colors">{t('common.clear')}</button>
                                    <button onClick={copy} className="bg-transparent border-none text-[#fb923c] cursor-pointer hover:text-white transition-colors">{t('common.copy')}</button>
                                </div>
                            </div>
                            <textarea
                                readOnly
                                value={output}
                                className="flex-1 w-full bg-transparent border-none p-4 text-white font-mono resize-none outline-none text-sm"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-[#ef4444] text-center">
                            {error}
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
