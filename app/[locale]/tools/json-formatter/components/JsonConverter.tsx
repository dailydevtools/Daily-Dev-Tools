"use client";

import { useState, useEffect } from "react";
import { LiquidButton } from "../../../../components/ui/LiquidButton";
import JsonEditor from "../../../../components/JsonEditor";
import CopyButton from "../../../../components/ui/CopyButton";
import { Download, AlertCircle } from "lucide-react";
import yaml from "js-yaml";
import { js2xml } from "xml-js";
import { Parser } from "json2csv";

interface JsonConverterProps {
    data: any; // The parsed JSON object
}

type ConvertMode = "yaml" | "xml" | "csv" | "ts";

export default function JsonConverter({ data }: JsonConverterProps) {
    const [mode, setMode] = useState<ConvertMode>("yaml");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    // Convert data whenever mode or data changes
    const convertData = () => {
        if (!data) return;
        setError("");

        try {
            let result = "";
            switch (mode) {
                case "yaml":
                    result = yaml.dump(data);
                    break;
                case "xml":
                    result = js2xml(data, { compact: true, spaces: 4 });
                    break;
                case "csv":
                    if (Array.isArray(data)) {
                        try {
                            const parser = new Parser();
                            result = parser.parse(data);
                        } catch (e: any) {
                            setError("CSV conversion requires an array of objects. " + e.message);
                        }
                    } else {
                        setError("CSV conversion requires an array of objects (e.g. [{}, {}]).");
                    }
                    break;
                case "ts":
                    result = generateTypescriptInterface(data);
                    break;
            }
            setOutput(result);
        } catch (err: any) {
            setError(err.message);
            setOutput("");
        }
    };

    // Helper to generate simple TS interfaces
    const generateTypescriptInterface = (obj: any, name = "RootObject"): string => {
        const getType = (value: any): string => {
            if (value === null) return "any";
            if (Array.isArray(value)) {
                if (value.length === 0) return "any[]";
                return `${getType(value[0])}[]`;
            }
            if (typeof value === "object") return "object"; // Recursive handling needed for deep objects
            return typeof value;
        };

        // This is a simplified generator. For production, a library like `json-to-ts` is better
        // but adding another dependency might be overkill if we can do basic structural generation.
        // Let's implement a basic recursive one.

        const interfaces: string[] = [];
        const seenObjects = new Set<string>();

        const walk = (o: any, interfaceName: string) => {
            if (seenObjects.has(interfaceName)) return;
            seenObjects.add(interfaceName);

            let str = `export interface ${interfaceName} {\n`;

            if (Array.isArray(o)) {
                // Handle array root
                return `export type ${interfaceName} = ${getType(o)};\n`;
            }

            Object.entries(o).forEach(([key, value]) => {
                let type = typeof value;
                if (value === null) type = "any";
                else if (Array.isArray(value)) {
                    if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
                        const childName = key.charAt(0).toUpperCase() + key.slice(1);
                        walk(value[0], childName);
                        type = `${childName}[]`;
                    } else {
                        type = getType(value);
                    }
                } else if (typeof value === 'object') {
                    const childName = key.charAt(0).toUpperCase() + key.slice(1);
                    walk(value, childName);
                    type = childName;
                }

                str += `    ${key}: ${type};\n`;
            });
            str += "}\n\n";
            interfaces.push(str);
        };

        if (Array.isArray(obj)) {
            if (obj.length > 0 && typeof obj[0] === 'object') {
                walk(obj[0], name);
            } else {
                return `export type ${name} = ${getType(obj)};`;
            }
        } else {
            walk(obj, name);
        }

        return interfaces.reverse().join("");
    };

    // Trigger conversion on mount/update
    useState(() => {
        convertData();
    });

    // Re-run when mode or data changes
    useEffect(() => {
        convertData();
    }, [mode, data]);

    const downloadOutput = () => {
        if (!output) return;
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const ext = mode === "ts" ? "ts" : mode;
        a.download = `converted.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex gap-2 mb-4 p-1 bg-neutral-100 dark:bg-white/5 rounded-lg w-fit">
                {(["yaml", "xml", "csv", "ts"] as ConvertMode[]).map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium uppercase transition-all ${mode === m
                            ? "bg-white dark:bg-[#1e1e1e] text-[var(--foreground)] shadow-sm"
                            : "text-[var(--muted-text)] hover:text-[var(--foreground)]"
                            }`}
                    >
                        {m === "ts" ? "TypeScript" : m}
                    </button>
                ))}
            </div>

            {error ? (
                <div className="flex-1 flex items-center justify-center p-6 text-center text-red-500">
                    <div>
                        <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col min-h-0 relative group">
                    {/* Toolbar overlay */}
                    <div className="absolute top-2 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={downloadOutput}
                            className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-md text-[var(--muted-text)] hover:text-[var(--foreground)] border border-[var(--border-color)]"
                            title="Download"
                        >
                            <Download size={14} />
                        </button>
                        <CopyButton text={output} className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-md text-[var(--muted-text)] hover:text-[var(--foreground)] border border-[var(--border-color)]" />
                    </div>

                    <div className="flex-1 rounded-xl overflow-hidden border border-[var(--border-color)]">
                        <JsonEditor
                            value={output}
                            readOnly={true}
                            className="h-full w-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
