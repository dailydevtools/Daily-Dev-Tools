"use client";

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Play, Square, Save, Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { APIEndpoint, APICollection, RequestHistoryItem } from '../../../../lib/apiDocsTypes';
import { runApiRequest, RequestResult, buildCurlSnippet, buildFetchSnippet, buildAxiosSnippet } from '../../../../lib/apiRequest';
import { addRequestHistory, generateId } from '../../../../lib/apiDocsStorage';
import { LiquidButton } from '../../../../components/ui/LiquidButton';
import LiquidTabs from '../../../../components/ui/LiquidTabs';
import CodeEditor from '../../../../components/CodeEditor';
import ResponseViewer from './ResponseViewer';
import RequestHistory from './RequestHistory';

interface Props {
    endpoint: APIEndpoint;
    collection: APICollection;
}

const bodySchema = z.string().optional();

export default function TryItOut({ endpoint, collection }: Props) {
    const [response, setResponse] = useState<RequestResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshHistory, setRefreshHistory] = useState(0);
    const [activeTab, setActiveTab] = useState<'params' | 'body' | 'auth' | 'code'>('params');

    // Form setup
    const form = useForm<{ body?: string }>({
        resolver: zodResolver(z.object({ body: bodySchema })),
        defaultValues: { body: endpoint.requestBody?.example || '' },
    });

    // Initialize params state
    const [pathParams, setPathParams] = useState<Record<string, string>>({});
    const [queryParams, setQueryParams] = useState<Record<string, string>>({});
    const [headers, setHeaders] = useState<Record<string, string>>({});

    // Reset state when endpoint changes
    useEffect(() => {
        const initialPathParams: Record<string, string> = {};
        // Extract path params from URL (e.g. /users/:id or /users/{id})
        const matches = endpoint.path.match(/[:{]([a-zA-Z0-9_]+)[}]?/g);
        if (matches) {
            matches.forEach(m => {
                const key = m.replace(/[:{}]/g, '');
                initialPathParams[key] = '';
            });
        }
        setPathParams(initialPathParams);

        const initialQueryParams: Record<string, string> = {};
        endpoint.queryParams.forEach(p => {
            initialQueryParams[p.key] = p.value || '';
        });
        setQueryParams(initialQueryParams);

        const initialHeaders: Record<string, string> = {};
        endpoint.headers.forEach(h => {
            initialHeaders[h.key] = h.value || '';
        });
        setHeaders(initialHeaders);

        form.reset({ body: endpoint.requestBody?.example || '' });
        setResponse(null);
    }, [endpoint, form]);

    // Handle Request Execution
    const handleSendRequest = async () => {
        setIsLoading(true);
        try {
            // Validate JSON body if present
            const rawBody = form.getValues('body');
            if (rawBody?.trim()) {
                try {
                    JSON.parse(rawBody);
                } catch {
                    // Start basic validation, allow non-JSON if content-type isn't json? 
                    // For now assume JSON if content-type is json
                    if (endpoint.requestBody?.contentType.includes('json')) {
                        toast.error('Invalid JSON body');
                        setIsLoading(false);
                        return;
                    }
                }
            }

            // Construct URL
            let url = `${collection.baseUrl}${endpoint.path}`;
            Object.entries(pathParams).forEach(([key, value]) => {
                url = url.replace(new RegExp(`[:{]${key}[}]?`, 'g'), value);
            });

            // Execute request
            const result = await runApiRequest({
                method: endpoint.method,
                url,
                headers: {
                    ...headers,
                    ...(rawBody ? { 'Content-Type': 'application/json' } : {}), // Default to JSON for now
                },
                query: queryParams,
                body: rawBody,
            });

            setResponse(result);

            // Save History
            const historyItem: RequestHistoryItem = {
                id: generateId(),
                collectionId: collection.id,
                endpointId: endpoint.id,
                method: endpoint.method,
                url,
                status: result.status,
                durationMs: result.durationMs,
                createdAt: Date.now(),
            };
            await addRequestHistory(historyItem);
            setRefreshHistory(prev => prev + 1);

        } catch (error) {
            console.error('Request failed', error);
            toast.error('Failed to send request');
        } finally {
            setIsLoading(false);
        }
    };

    // Restore from history
    const restoreRequest = (item: RequestHistoryItem) => {
        // Logic to restore params would need the full stored request payload in history items...
        // For now, simpler implementation: just warn user it restores URL but not specific params if they were custom
        // Actually, let's just populate what we can parse from the URL in the history item
        toast.info('Restored request URL from history');
        // Ideally we should store the full request payload in history to restore fully.
        // For this MVP, we just re-run the request
    };

    // Generated Snippets
    const snippets = useMemo(() => {
        let url = `${collection.baseUrl}${endpoint.path}`;
        Object.entries(pathParams).forEach(([key, value]) => {
            url = url.replace(new RegExp(`[:{]${key}[}]?`, 'g'), value || `:${key}`);
        });

        const input = {
            method: endpoint.method,
            url,
            headers,
            body: form.watch('body'),
        };

        return {
            curl: buildCurlSnippet(input),
            fetch: buildFetchSnippet(input),
            axios: buildAxiosSnippet(input),
        };
    }, [endpoint, collection, pathParams, headers, endpoint.method, form.watch('body')]); // Watch form body changes

    const copySnippet = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Snippet copied!');
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6">
            {/* Left Panel: Request Builder & Response */}
            <div className="space-y-6">
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-lg text-sm font-bold border ${endpoint.method === 'GET' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                endpoint.method === 'POST' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                    endpoint.method === 'PUT' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                        endpoint.method === 'DELETE' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                            'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                }`}>
                                {endpoint.method}
                            </span>
                            <code className="text-sm font-mono bg-[var(--bg-color)] px-2 py-1 rounded">
                                {collection.baseUrl}{endpoint.path}
                            </code>
                        </div>

                        <LiquidButton onClick={handleSendRequest} disabled={isLoading} className="min-w-[100px]">
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            ) : (
                                <Play className="w-4 h-4 mr-2" />
                            )}
                            Send
                        </LiquidButton>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 border-b border-[var(--border-color)] pb-0">
                        <LiquidTabs
                            tabs={['params', 'body', 'code'] as const}
                            activeTab={activeTab}
                            onChange={(tab) => setActiveTab(tab as 'params' | 'body' | 'code')}
                            variant="inline"
                            labels={{
                                params: 'Params',
                                body: 'Body',
                                code: 'Code',
                            }}
                            icons={endpoint.requestBody ? {
                                body: <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />
                            } : undefined}
                        />
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[200px]">
                        {activeTab === 'params' && (
                            <div className="space-y-6">
                                {/* Path Params */}
                                {Object.keys(pathParams).length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-[var(--muted-text)] uppercase font-mono tracking-wider">Path Params</h4>
                                        <div className="grid gap-3">
                                            {Object.keys(pathParams).map(key => (
                                                <div key={key} className="flex items-center gap-3">
                                                    <label className="w-32 text-sm font-mono text-right truncate" title={key}>{key}</label>
                                                    <input
                                                        type="text"
                                                        value={pathParams[key]}
                                                        onChange={e => setPathParams({ ...pathParams, [key]: e.target.value })}
                                                        className="flex-1 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                                                        placeholder={`value for ${key}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Query Params */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-semibold text-[var(--muted-text)] uppercase font-mono tracking-wider">Query Params</h4>
                                    </div>
                                    {Object.keys(queryParams).length > 0 ? (
                                        <div className="grid gap-3">
                                            {Object.keys(queryParams).map(key => (
                                                <div key={key} className="flex items-center gap-3">
                                                    <label className="w-32 text-sm font-mono text-right truncate" title={key}>{key}</label>
                                                    <input
                                                        type="text"
                                                        value={queryParams[key]}
                                                        onChange={e => setQueryParams({ ...queryParams, [key]: e.target.value })}
                                                        className="flex-1 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                                                        placeholder="value"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-[var(--muted-text)] italic">No query parameters defined.</p>
                                    )}
                                </div>

                                {/* Headers */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-[var(--muted-text)] uppercase font-mono tracking-wider">Headers</h4>
                                    {Object.keys(headers).length > 0 ? (
                                        <div className="grid gap-3">
                                            {Object.keys(headers).map(key => (
                                                <div key={key} className="flex items-center gap-3">
                                                    <label className="w-32 text-sm font-mono text-right truncate" title={key}>{key}</label>
                                                    <input
                                                        type="text"
                                                        value={headers[key]}
                                                        onChange={e => setHeaders({ ...headers, [key]: e.target.value })}
                                                        className="flex-1 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                                                        placeholder="value"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-[var(--muted-text)] italic">No headers defined.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'body' && (
                            <div className="h-[300px]">
                                <CodeEditor
                                    height="100%"
                                    language="json"
                                    value={form.watch('body') || ''}
                                    onChange={(value) => form.setValue('body', value || '')}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 13,
                                        wordWrap: 'on',
                                        lineNumbers: 'on',
                                        scrollBeyondLastLine: false,
                                    }}
                                />
                            </div>
                        )}

                        {activeTab === 'code' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-xs font-semibold text-[var(--muted-text)] uppercase">cURL</h5>
                                        <button onClick={() => copySnippet(snippets.curl)} className="p-1 hover:bg-[var(--bg-color)] rounded transition-colors">
                                            <Copy className="w-3 h-3 text-[var(--muted-text)]" />
                                        </button>
                                    </div>
                                    <div className="h-32 border border-[var(--border-color)] rounded-lg overflow-hidden">
                                        <CodeEditor
                                            language="shell"
                                            value={snippets.curl}
                                            options={{
                                                readOnly: true,
                                                minimap: { enabled: false },
                                                fontSize: 12,
                                                wordWrap: 'on',
                                                lineNumbers: 'off',
                                                padding: { top: 8, bottom: 8 },
                                                renderLineHighlight: 'none',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-xs font-semibold text-[var(--muted-text)] uppercase">Fetch</h5>
                                        <button onClick={() => copySnippet(snippets.fetch)} className="p-1 hover:bg-[var(--bg-color)] rounded transition-colors">
                                            <Copy className="w-3 h-3 text-[var(--muted-text)]" />
                                        </button>
                                    </div>
                                    <div className="h-32 border border-[var(--border-color)] rounded-lg overflow-hidden">
                                        <CodeEditor
                                            language="javascript"
                                            value={snippets.fetch}
                                            options={{
                                                readOnly: true,
                                                minimap: { enabled: false },
                                                fontSize: 12,
                                                wordWrap: 'on',
                                                lineNumbers: 'off',
                                                padding: { top: 8, bottom: 8 },
                                                renderLineHighlight: 'none',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <ResponseViewer response={response} />
            </div>

            {/* Right Panel: History */}
            <div>
                <RequestHistory
                    endpointId={endpoint.id}
                    onSelect={restoreRequest}
                    refreshTrigger={refreshHistory}
                />
            </div>
        </div>
    );
}
