import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import CodeEditor from '../../../../components/CodeEditor';
import { RequestResult } from '../../../../lib/apiRequest';
import { LiquidButton } from '../../../../components/ui/LiquidButton';
import LiquidTabs from '../../../../components/ui/LiquidTabs';

interface Props {
    response: RequestResult | null;
}

export default function ResponseViewer({ response }: Props) {
    const [copied, setCopied] = useState(false);
    const [viewMode, setViewMode] = useState<'pretty' | 'raw' | 'preview'>('pretty');

    if (!response) return null;

    const isJson = response.contentType.includes('application/json');
    const isImage = response.contentType.includes('image/');

    let formattedBody = response.raw;
    if (isJson && viewMode === 'pretty') {
        try {
            formattedBody = JSON.stringify(JSON.parse(response.raw), null, 2);
        } catch {
            // keep raw if parse fails
        }
    }

    const copyResponse = async () => {
        await navigator.clipboard.writeText(formattedBody);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadResponse = () => {
        const blob = new Blob([response.raw], { type: response.contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `response.${isJson ? 'json' : 'txt'}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-4 pt-6 border-t border-[var(--border-color)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h3 className="font-semibold">Response</h3>
                    <div className={`px-2 py-0.5 rounded text-xs font-mono border ${response.status >= 200 && response.status < 300
                        ? 'border-green-500/20 bg-green-500/10 text-green-500'
                        : response.status >= 400
                            ? 'border-red-500/20 bg-red-500/10 text-red-500'
                            : 'border-yellow-500/20 bg-yellow-500/10 text-yellow-500'
                        }`}>
                        {response.status}
                    </div>
                    <span className="text-xs text-[var(--muted-text)] font-mono">
                        {response.durationMs.toFixed(0)}ms
                    </span>
                    <span className="text-xs text-[var(--muted-text)] font-mono">
                        {response.size}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <LiquidButton variant="ghost" onClick={copyResponse} className="h-8 w-8 p-0">
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </LiquidButton>
                    <LiquidButton variant="ghost" onClick={downloadResponse} className="h-8 w-8 p-0">
                        <Download className="w-4 h-4" />
                    </LiquidButton>
                </div>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                <div className="px-3 py-2 border-b border-[var(--border-color)]">
                    <LiquidTabs
                        tabs={isImage ? (['pretty', 'raw', 'preview'] as const) : (['pretty', 'raw'] as const)}
                        activeTab={viewMode}
                        onChange={(tab) => setViewMode(tab as 'pretty' | 'raw' | 'preview')}
                        variant="inline"
                        labels={{ pretty: 'Pretty', raw: 'Raw', preview: 'Preview' }}
                    />
                </div>

                {viewMode === 'preview' && isImage ? (
                    <div className="p-4 flex justify-center bg-[var(--bg-color)]">
                        <img src={URL.createObjectURL(new Blob([response.raw], { type: response.contentType }))} alt="Response Preview" className="max-w-full h-auto rounded" />
                    </div>
                ) : (
                    <div className="h-80">
                        <CodeEditor
                            height="100%"
                            language={isJson ? 'json' : 'text'}
                            value={formattedBody}
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                fontSize: 13,
                                wordWrap: 'on',
                                padding: { top: 12, bottom: 12 },
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Headers */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--muted-text)] uppercase">Response Headers</span>
                </div>
                <div className="bg-[var(--bg-color)] rounded-lg p-3 text-xs font-mono space-y-1 border border-[var(--border-color)]">
                    {Object.entries(response.headers).map(([key, value]) => (
                        <div key={key} className="flex gap-2">
                            <span className="text-purple-500 min-w-[120px]">{key}:</span>
                            <span className="text-[var(--muted-text)] break-all">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
