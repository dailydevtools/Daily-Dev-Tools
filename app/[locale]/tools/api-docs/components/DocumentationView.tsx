"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Download, Code2, Play, FileJson } from "lucide-react";
import { useTranslations } from "next-intl";
import { LiquidButton } from "../../../../components/ui/LiquidButton";
import LiquidTabs from "../../../../components/ui/LiquidTabs";
import { APIEndpoint, APICollection } from "../../../../lib/apiDocsTypes";
import { convertCurl, TargetLanguage } from "../../../../lib/curlService";
import { generateOpenAPISpec } from "../../../../lib/openapiGenerator";
import CodeEditor from "../../../../components/CodeEditor";
import CopyButton from "../../../../components/ui/CopyButton";
import TryItOut from "./TryItOut";

interface Props {
    endpoint: APIEndpoint;
    collection: APICollection;
}

const codeLanguages: { value: TargetLanguage; label: string; monacoLang: string }[] = [
    { value: 'python', label: 'Python', monacoLang: 'python' },
    { value: 'javascript', label: 'JavaScript', monacoLang: 'javascript' },
    { value: 'node', label: 'Node.js', monacoLang: 'javascript' },
    { value: 'go', label: 'Go', monacoLang: 'go' },
    { value: 'php', label: 'PHP', monacoLang: 'php' },
    { value: 'java', label: 'Java', monacoLang: 'java' },
    { value: 'ruby', label: 'Ruby', monacoLang: 'ruby' },
    { value: 'rust', label: 'Rust', monacoLang: 'rust' },
];

export default function DocumentationView({ endpoint, collection }: Props) {
    const t = useTranslations('APIDocs');

    const [activeTab, setActiveTab] = useState<'docs' | 'try-it'>('docs');
    const [selectedLang, setSelectedLang] = useState<TargetLanguage>('python');
    const [copied, setCopied] = useState(false);
    const [codeExample, setCodeExample] = useState<string>(t('noCurlAvailable'));
    const [isLoading, setIsLoading] = useState(false);

    // Generate full URL
    const fullUrl = `${collection.baseUrl}${endpoint.path}`;

    // Fetch code example when language or endpoint changes
    useEffect(() => {
        if (!endpoint.originalCurl) {
            setCodeExample(t('noCurlAvailable'));
            return;
        }

        const fetchCode = async () => {
            // Only fetch if in docs mode to save resources, though useEffect handles deps well
            setIsLoading(true);
            try {
                const result = await convertCurl(endpoint.originalCurl, selectedLang);
                setCodeExample(result);
            } catch (e: any) {
                setCodeExample(`// Error: ${e.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCode();
    }, [endpoint.originalCurl, selectedLang, t]);

    // Method color helper
    const getMethodColor = (method: string) => {
        const colors: Record<string, string> = {
            GET: 'bg-emerald-500 text-white',
            POST: 'bg-blue-500 text-white',
            PUT: 'bg-amber-500 text-white',
            PATCH: 'bg-orange-500 text-white',
            DELETE: 'bg-red-500 text-white',
        };
        return colors[method] || 'bg-gray-500 text-white';
    };

    // Copy URL
    const copyUrl = async () => {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Export to Markdown
    const exportToMarkdown = async () => {
        let md = `# ${endpoint.name}\n\n`;

        if (endpoint.description) {
            md += `${endpoint.description}\n\n`;
        }

        md += `## Endpoint\n\n`;
        md += `\`\`\`\n${endpoint.method} ${fullUrl}\n\`\`\`\n\n`;

        if (endpoint.headers.length > 0) {
            md += `## ${t('headers')}\n\n`;
            md += `| ${t('header')} | ${t('value')} |\n`;
            md += `|--------|-------|\n`;
            endpoint.headers.forEach(h => {
                md += `| ${h.key} | ${h.value} |\n`;
            });
            md += `\n`;
        }

        if (endpoint.queryParams.length > 0) {
            md += `## ${t('queryParameters')}\n\n`;
            md += `| ${t('parameter')} | ${t('value')} |\n`;
            md += `|-----------|-------|\n`;
            endpoint.queryParams.forEach(p => {
                md += `| ${p.key} | ${p.value} |\n`;
            });
            md += `\n`;
        }

        if (endpoint.requestBody) {
            md += `## ${t('requestBody')}\n\n`;
            md += `Content-Type: \`${endpoint.requestBody.contentType}\`\n\n`;
            md += `\`\`\`json\n${endpoint.requestBody.example}\n\`\`\`\n\n`;
        }

        // Get Python code example
        const pythonCode = await convertCurl(endpoint.originalCurl, 'python');
        md += `## Code Example (Python)\n\n`;
        md += `\`\`\`python\n${pythonCode}\n\`\`\`\n`;

        // Download file
        const blob = new Blob([md], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${endpoint.name.toLowerCase().replace(/\s+/g, '-')}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Export OpenAPI Spec
    const exportOpenApi = () => {
        const spec = generateOpenAPISpec(collection);
        const json = JSON.stringify(spec, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${collection.name.toLowerCase().replace(/\s+/g, '-')}-openapi.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* Endpoint Header */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                {/* Top Bar: Method, URL, Actions */}
                <div className="flex flex-col gap-4 p-4 md:p-6 border-b border-[var(--border-color)]">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold mb-2 truncate">{endpoint.name}</h2>
                            {endpoint.description && (
                                <p className="text-[var(--muted-text)] text-sm leading-relaxed">{endpoint.description}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <LiquidButton variant="ghost" onClick={exportOpenApi} className="h-9 px-3 text-xs border border-[var(--border-color)] hover:bg-[var(--bg-color)]">
                                <FileJson className="w-4 h-4 mr-2" />
                                OpenAPI
                            </LiquidButton>
                            <LiquidButton variant="ghost" onClick={exportToMarkdown} className="h-9 px-3 text-xs border border-[var(--border-color)] hover:bg-[var(--bg-color)]">
                                <Download className="w-4 h-4 mr-2" />
                                Markdown
                            </LiquidButton>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 p-1.5 bg-[var(--bg-color)] rounded-lg border border-[var(--border-color)] w-full md:w-fit">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md min-w-[60px] text-center ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                        </span>
                        <div className="h-4 w-px bg-[var(--border-color)] mx-1" />
                        <code className="text-xs font-mono truncate text-[var(--muted-text)] flex-1 select-all">{fullUrl}</code>
                        <button
                            onClick={copyUrl}
                            className="p-1.5 hover:bg-[var(--card-bg)] rounded-md transition-colors ml-2"
                        >
                            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-[var(--muted-text)]" />}
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-4 md:px-6 pt-2 bg-[var(--card-bg)] border-t border-[var(--border-color)]">
                    <LiquidTabs
                        tabs={['docs', 'try-it'] as const}
                        activeTab={activeTab}
                        onChange={(tab) => setActiveTab(tab as 'docs' | 'try-it')}
                        variant="inline"
                        labels={{ docs: 'Documentation', 'try-it': 'Try it out' }}
                        icons={{
                            docs: <FileJson className="w-4 h-4" />,
                            'try-it': <Play className="w-4 h-4" />,
                        }}
                    />
                </div>
            </div>

            {activeTab === 'try-it' ? (
                <TryItOut endpoint={endpoint} collection={collection} />
            ) : (
                <>
                    {/* Headers */}
                    {endpoint.headers.length > 0 && (
                        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                            <div className="px-5 py-3 border-b border-[var(--border-color)]">
                                <h3 className="font-semibold">{t('headers')}</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-[var(--bg-color)]">
                                        <tr>
                                            <th className="text-left px-5 py-2.5 font-medium">{t('header')}</th>
                                            <th className="text-left px-5 py-2.5 font-medium">{t('value')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {endpoint.headers.map((header, i) => (
                                            <tr key={i} className="border-t border-[var(--border-color)]">
                                                <td className="px-5 py-3 font-mono text-purple-500">{header.key}</td>
                                                <td className="px-5 py-3 font-mono text-[var(--muted-text)]">{header.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Query Parameters */}
                    {endpoint.queryParams.length > 0 && (
                        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                            <div className="px-5 py-3 border-b border-[var(--border-color)]">
                                <h3 className="font-semibold">{t('queryParameters')}</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-[var(--bg-color)]">
                                        <tr>
                                            <th className="text-left px-5 py-2.5 font-medium">{t('parameter')}</th>
                                            <th className="text-left px-5 py-2.5 font-medium">{t('value')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {endpoint.queryParams.map((param, i) => (
                                            <tr key={i} className="border-t border-[var(--border-color)]">
                                                <td className="px-5 py-3 font-mono text-blue-500">{param.key}</td>
                                                <td className="px-5 py-3 font-mono text-[var(--muted-text)]">{param.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Request Body */}
                    {endpoint.requestBody && (
                        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                            <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between">
                                <h3 className="font-semibold">{t('requestBody')}</h3>
                                <span className="text-xs font-mono bg-[var(--bg-color)] px-2 py-1 rounded">
                                    {endpoint.requestBody.contentType}
                                </span>
                            </div>
                            <div className="h-48">
                                <CodeEditor
                                    height="100%"
                                    defaultLanguage="json"
                                    value={endpoint.requestBody.example}
                                    options={{
                                        readOnly: true,
                                        minimap: { enabled: false },
                                        fontSize: 13,
                                        wordWrap: 'on',
                                        padding: { top: 12, bottom: 12 },
                                        lineNumbers: 'off',
                                        scrollBeyondLastLine: false,
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Code Examples */}
                    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-purple-500" />
                                <h3 className="font-semibold">{t('codeExamples')}</h3>
                                {isLoading && <span className="text-xs text-[var(--muted-text)]">Loading...</span>}
                            </div>
                            <CopyButton text={codeExample} className="h-8 px-2 text-xs" />
                        </div>

                        {/* Language Tabs */}
                        <div className="px-5 py-3 border-b border-[var(--border-color)] bg-[var(--bg-color)]">
                            <LiquidTabs
                                tabs={codeLanguages.map(l => l.value) as any}
                                activeTab={selectedLang}
                                onChange={(lang) => setSelectedLang(lang as TargetLanguage)}
                                variant="inline"
                                labels={Object.fromEntries(codeLanguages.map(l => [l.value, l.label]))}
                            />
                        </div>

                        {/* Code Editor */}
                        <div className="h-64">
                            <CodeEditor
                                height="100%"
                                language={codeLanguages.find(l => l.value === selectedLang)?.monacoLang || 'python'}
                                value={codeExample}
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    wordWrap: 'on',
                                    padding: { top: 12, bottom: 12 },
                                    scrollBeyondLastLine: false,
                                }}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
