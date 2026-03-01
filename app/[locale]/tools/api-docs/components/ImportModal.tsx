"use client";

import { useState } from 'react';
import { Upload, Link2, FileJson, ClipboardPaste, X } from 'lucide-react';
import LiquidTabs from '../../../../components/ui/LiquidTabs';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { LiquidButton } from '../../../../components/ui/LiquidButton';
import CodeEditor from '../../../../components/CodeEditor';
import { parseOpenApi, convertOpenApiToCollection } from '../../../../lib/openapiImport';
import { APICollection } from '../../../../lib/apiDocsTypes';

interface Props {
    onImport: (collection: APICollection) => void;
    onClose: () => void;
}

export default function ImportModal({ onImport, onClose }: Props) {
    const t = useTranslations('APIDocs');
    const [activeTab, setActiveTab] = useState<'file' | 'url' | 'raw'>('file');
    const [url, setUrl] = useState('');
    const [rawContent, setRawContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleImport = async (content: string, source: string) => {
        setIsLoading(true);
        try {
            const spec = parseOpenApi(content);
            const collection = convertOpenApiToCollection(spec);
            onImport(collection);
            toast.success(`Imported collection: ${collection.name}`);
            onClose();
        } catch (error: any) {
            console.error('Import failed:', error);
            toast.error(`Import failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUrlImport = async () => {
        if (!url) return;
        setIsLoading(true);
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch URL: ${res.statusText}`);
            const text = await res.text();
            await handleImport(text, 'url');
        } catch (error: any) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            handleImport(content, 'file');
        };
        reader.readAsText(file);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
                    <h2 className="text-xl font-bold">Import OpenAPI / Swagger</h2>
                    <button onClick={onClose} className="p-2 hover:bg-[var(--bg-color)] rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-6 py-3 border-b border-[var(--border-color)]">
                    <LiquidTabs
                        tabs={['file', 'url', 'raw'] as const}
                        activeTab={activeTab}
                        onChange={(tab) => setActiveTab(tab as 'file' | 'url' | 'raw')}
                        variant="inline"
                        labels={{ file: 'File Upload', url: 'Import from URL', raw: 'Paste Clean Text' }}
                        icons={{
                            file: <Upload className="w-4 h-4" />,
                            url: <Link2 className="w-4 h-4" />,
                            raw: <ClipboardPaste className="w-4 h-4" />,
                        }}
                    />
                </div>

                <div className="p-6 overflow-y-auto">
                    {activeTab === 'file' && (
                        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-[var(--border-color)] rounded-xl bg-[var(--bg-color)] hover:border-purple-500/50 transition-colors relative">
                            <input
                                type="file"
                                accept=".json,.yaml,.yml"
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="p-4 bg-purple-500/10 rounded-full mb-3">
                                <FileJson className="w-8 h-8 text-purple-500" />
                            </div>
                            <p className="font-medium">Click to upload or drag & drop</p>
                            <p className="text-sm text-[var(--muted-text)] mt-1">JSON or YAML files supported</p>
                        </div>
                    )}

                    {activeTab === 'url' && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium block mb-2">Spec URL</label>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                    placeholder="https://petstore.swagger.io/v2/swagger.json"
                                    className="w-full bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500/20"
                                />
                            </div>
                            <LiquidButton onClick={handleUrlImport} disabled={isLoading || !url} className="w-full">
                                {isLoading ? 'Importing...' : 'Import from URL'}
                            </LiquidButton>
                        </div>
                    )}

                    {activeTab === 'raw' && (
                        <div className="space-y-4 h-full flex flex-col">
                            <div className="flex-1 min-h-[300px] border border-[var(--border-color)] rounded-lg overflow-hidden">
                                <CodeEditor
                                    value={rawContent}
                                    onChange={(val) => setRawContent(val || '')}
                                    language="yaml"
                                    height="100%"
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 13,
                                    }}
                                />
                            </div>
                            <LiquidButton onClick={() => handleImport(rawContent, 'raw')} disabled={isLoading || !rawContent} className="w-full">
                                {isLoading ? 'Importing...' : 'Import JSON/YAML'}
                            </LiquidButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
