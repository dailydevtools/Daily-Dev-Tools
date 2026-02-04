"use client";

import { useState, useEffect } from "react";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";
import { convertCurl, TargetLanguage } from "../../../lib/curlService";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import CopyButton from "../../../components/ui/CopyButton";
import LiquidSelect from "../../../components/ui/LiquidSelect";

const languages: { value: TargetLanguage; label: string }[] = [
    { value: 'python', label: 'Python (requests)' },
    { value: 'javascript', label: 'JavaScript (fetch)' },
    { value: 'node', label: 'Node.js (fetch)' },
    { value: 'node-request', label: 'Node.js (request)' },
    { value: 'go', label: 'Go' },
    { value: 'php', label: 'PHP (requests)' },
    { value: 'java', label: 'Java' },
    { value: 'rust', label: 'Rust' },
    { value: 'dart', label: 'Dart' },
    { value: 'json', label: 'JSON' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
];

export default function CurlConverterClient() {
    const t = useTranslations('CurlConverter');
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light">("vs-dark");

    const [input, setInput] = useState("curl 'http://en.wikipedia.org/' -H 'Accept-Encoding: gzip,deflate,sdch' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36' --compressed");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState<TargetLanguage>("python");
    const [isConverting, setIsConverting] = useState(false);

    // Detect theme from document class
    useEffect(() => {
        setMounted(true);
        const isDark = document.documentElement.classList.contains('dark');
        setEditorTheme(isDark ? "vs-dark" : "light");

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark');
            setEditorTheme(isDark ? "vs-dark" : "light");
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!input.trim()) {
            setOutput("");
            return;
        }

        const doConvert = async () => {
            setIsConverting(true);
            try {
                const result = await convertCurl(input, language);
                setOutput(result);
            } catch (e: any) {
                setOutput(`Error: ${e.message}`);
            } finally {
                setIsConverting(false);
            }
        };

        // Debounce the conversion
        const timeoutId = setTimeout(doConvert, 300);
        return () => clearTimeout(timeoutId);
    }, [input, language]);

    return (
        <main className="min-h-screen flex flex-col pb-10">
            <div className="pt-6 px-6 pb-4 border-b border-[var(--border-color)] bg-[var(--bg-color)] sticky top-0 z-30">
                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500">
                            <ToolIcon name="Terminal" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">{t('title')}</h1>
                            <p className="text-xs text-[var(--muted-text)] hidden sm:block">
                                {t('description')}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[var(--muted-text)] uppercase tracking-wide">{t('language')}</span>
                            <LiquidSelect
                                value={language}
                                onChange={(val) => setLanguage(val as TargetLanguage)}
                                options={languages}
                            />
                        </div>
                        <CopyButton text={output} className="h-9 px-3 text-xs bg-neutral-100 dark:bg-white/5 rounded-lg border border-transparent hover:border-[var(--border-color)]" />
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

                {/* Left Column: CURL Input */}
                <div className="flex flex-col h-[600px] lg:h-[calc(100vh-140px)] min-h-[500px]">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <span className="text-sm font-semibold text-[var(--foreground)]">{t('inputPlaceholder').split('...')[0]}</span>
                    </div>

                    <div className="flex-1 rounded-xl overflow-hidden border border-[var(--border-color)] bg-neutral-100/50 dark:bg-[#1e1e1e]">
                        {mounted ? (
                            <Editor
                                key={editorTheme}
                                height="100%"
                                defaultLanguage="shell"
                                theme={editorTheme}
                                value={input}
                                onChange={(val) => setInput(val || "")}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    wordWrap: 'on',
                                    padding: { top: 16, bottom: 16 }
                                }}
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-100 dark:bg-[#1e1e1e]" />
                        )}
                    </div>
                </div>

                {/* Right Column: Code Output */}
                <div className="flex flex-col h-[600px] lg:h-[calc(100vh-140px)] min-h-[500px]">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <span className="text-sm font-semibold text-[var(--foreground)]">
                            {t('outputPlaceholder').split('...')[0]}
                            {isConverting && <span className="ml-2 text-xs text-[var(--muted-text)]">Converting...</span>}
                        </span>
                    </div>

                    <div className="flex-1 rounded-xl overflow-hidden border border-[var(--border-color)] bg-neutral-50/50 dark:bg-[#1e1e1e]">
                        {mounted ? (
                            <Editor
                                key={editorTheme}
                                height="100%"
                                language={language === 'node' ? 'javascript' : language}
                                theme={editorTheme}
                                value={output}
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    wordWrap: 'on',
                                    padding: { top: 16, bottom: 16 }
                                }}
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-50 dark:bg-[#1e1e1e]" />
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}
