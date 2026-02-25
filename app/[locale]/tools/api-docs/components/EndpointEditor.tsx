"use client";

import { useState } from "react";
import { X, Wand2, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { LiquidButton } from "../../../../components/ui/LiquidButton";
import { LiquidInput } from "../../../../components/ui/LiquidInput";
import LiquidSelect from "../../../../components/ui/LiquidSelect";
import { APICollection, APIEndpoint, HTTPMethod, HeaderParam, QueryParam } from "../../../../lib/apiDocsTypes";
import { parseCurl, isValidCurl } from "../../../../lib/curlParser";
import { generateId } from "../../../../lib/apiDocsStorage";

interface Props {
    endpoint: APIEndpoint | null;
    collection: APICollection;
    onSave: (endpoint: APIEndpoint) => void;
    onClose: () => void;
}

const methodOptions: { value: HTTPMethod; label: string }[] = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'PATCH', label: 'PATCH' },
    { value: 'DELETE', label: 'DELETE' },
    { value: 'HEAD', label: 'HEAD' },
    { value: 'OPTIONS', label: 'OPTIONS' },
];

export default function EndpointEditor({ endpoint, collection, onSave, onClose }: Props) {
    const t = useTranslations('APIDocs');
    const isEditing = !!endpoint;

    // cURL input state
    const [curlInput, setCurlInput] = useState(endpoint?.originalCurl || '');
    const [parseError, setParseError] = useState('');
    const [isParsed, setIsParsed] = useState(isEditing);

    // Endpoint fields
    const [name, setName] = useState(endpoint?.name || '');
    const [description, setDescription] = useState(endpoint?.description || '');
    const [method, setMethod] = useState<HTTPMethod>(endpoint?.method || 'GET');
    const [path, setPath] = useState(endpoint?.path || '/');
    const [headers, setHeaders] = useState<HeaderParam[]>(endpoint?.headers || []);
    const [queryParams, setQueryParams] = useState<QueryParam[]>(endpoint?.queryParams || []);
    const [requestBody, setRequestBody] = useState(endpoint?.requestBody?.example || '');
    const [contentType, setContentType] = useState(endpoint?.requestBody?.contentType || 'application/json');

    const [error, setError] = useState('');

    // Parse cURL command
    const handleParseCurl = async () => {
        setParseError('');

        if (!curlInput.trim()) {
            setParseError(t('enterCurlCommand'));
            return;
        }

        if (!isValidCurl(curlInput)) {
            setParseError(t('invalidCurlCommand'));
            return;
        }

        try {
            const parsed = await parseCurl(curlInput);

            setMethod(parsed.method);
            setPath(parsed.path);
            setHeaders(parsed.headers);
            setQueryParams(parsed.queryParams);

            if (parsed.requestBody) {
                setRequestBody(parsed.requestBody.example);
                setContentType(parsed.requestBody.contentType);
            }

            // Auto-generate name from path if empty
            if (!name) {
                const pathParts = parsed.path.split('/').filter(Boolean);
                const lastPart = pathParts[pathParts.length - 1] || 'endpoint';
                const autoName = `${parsed.method} ${lastPart.charAt(0).toUpperCase() + lastPart.slice(1)}`;
                setName(autoName);
            }

            setIsParsed(true);
        } catch (err: any) {
            setParseError(err.message);
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError(t('endpointNameRequired'));
            return;
        }

        if (!path.trim()) {
            setError(t('pathRequired'));
            return;
        }

        const now = Date.now();
        const savedEndpoint: APIEndpoint = {
            id: endpoint?.id || generateId(),
            name: name.trim(),
            description: description.trim() || undefined,
            method,
            path: path.trim(),
            headers,
            queryParams,
            requestBody: requestBody.trim() ? {
                contentType,
                example: requestBody.trim(),
            } : undefined,
            originalCurl: curlInput,
            createdAt: endpoint?.createdAt || now,
            updatedAt: now,
        };

        onSave(savedEndpoint);
    };

    // Update header/param helpers
    const updateHeader = (index: number, field: keyof HeaderParam, value: string | boolean) => {
        const updated = [...headers];
        updated[index] = { ...updated[index], [field]: value };
        setHeaders(updated);
    };

    const removeHeader = (index: number) => {
        setHeaders(headers.filter((_, i) => i !== index));
    };

    const addHeader = () => {
        setHeaders([...headers, { key: '', value: '', required: false }]);
    };

    const updateQueryParam = (index: number, field: keyof QueryParam, value: string | boolean) => {
        const updated = [...queryParams];
        updated[index] = { ...updated[index], [field]: value };
        setQueryParams(updated);
    };

    const removeQueryParam = (index: number) => {
        setQueryParams(queryParams.filter((_, i) => i !== index));
    };

    const addQueryParam = () => {
        setQueryParams([...queryParams, { key: '', value: '', required: false }]);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4">
            <div className="bg-white dark:bg-neutral-900 border border-[var(--border-color)] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)] shrink-0">
                    <h2 className="text-lg font-semibold">
                        {isEditing ? t('editEndpoint') : t('addEndpoint')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[var(--bg-color)] rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5">
                    {!isParsed ? (
                        // Step 1: Paste cURL
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {t('pasteCurl')}
                                </label>
                                <textarea
                                    value={curlInput}
                                    onChange={(e) => setCurlInput(e.target.value)}
                                    placeholder="curl https://api.example.com/users -H 'Authorization: Bearer token'"
                                    className="w-full h-48 px-4 py-3 text-sm font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-xl resize-none outline-none focus:ring-2 focus:ring-purple-500/30"
                                />
                                <p className="text-xs text-[var(--muted-text)] mt-2">
                                    {t('curlTip')}
                                </p>
                            </div>

                            {parseError && (
                                <div className="flex items-start gap-2 text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">
                                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                    {parseError}
                                </div>
                            )}

                            <div className="flex justify-end">
                                <LiquidButton onClick={handleParseCurl}>
                                    <Wand2 className="w-4 h-4 mr-1" /> {t('parseCurl')}
                                </LiquidButton>
                            </div>
                        </div>
                    ) : (
                        // Step 2: Edit extracted data
                        <form id="endpoint-form" onSubmit={handleSubmit} className="space-y-5">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        {t('endpointName')} <span className="text-red-500">*</span>
                                    </label>
                                    <LiquidInput
                                        value={name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                        placeholder={t('endpointNamePlaceholder')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        {t('descriptionLabel')}
                                    </label>
                                    <LiquidInput
                                        value={description}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                                        placeholder={t('descriptionPlaceholderEndpoint')}
                                    />
                                </div>
                            </div>

                            {/* Method & Path */}
                            <div className="grid grid-cols-[120px_1fr] gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">{t('method')}</label>
                                    <LiquidSelect
                                        value={method}
                                        onChange={(val) => setMethod(val as HTTPMethod)}
                                        options={methodOptions}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        {t('path')} <span className="text-red-500">*</span>
                                    </label>
                                    <LiquidInput
                                        value={path}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPath(e.target.value)}
                                        placeholder={t('pathPlaceholder')}
                                    />
                                </div>
                            </div>

                            {/* Headers */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium">{t('headers')}</label>
                                    <button
                                        type="button"
                                        onClick={addHeader}
                                        className="text-xs text-purple-500 hover:text-purple-400"
                                    >
                                        {t('addHeader')}
                                    </button>
                                </div>
                                {headers.length === 0 ? (
                                    <p className="text-sm text-[var(--muted-text)] italic">{t('noHeaders')}</p>
                                ) : (
                                    <div className="space-y-2">
                                        {headers.map((header, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={header.key}
                                                    onChange={(e) => updateHeader(index, 'key', e.target.value)}
                                                    placeholder={t('key')}
                                                    className="flex-1 px-3 py-2 text-sm bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg outline-none focus:ring-2 focus:ring-purple-500/30"
                                                />
                                                <input
                                                    type="text"
                                                    value={header.value}
                                                    onChange={(e) => updateHeader(index, 'value', e.target.value)}
                                                    placeholder={t('value')}
                                                    className="flex-1 px-3 py-2 text-sm bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg outline-none focus:ring-2 focus:ring-purple-500/30"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeHeader(index)}
                                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Query Params */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium">{t('queryParameters')}</label>
                                    <button
                                        type="button"
                                        onClick={addQueryParam}
                                        className="text-xs text-purple-500 hover:text-purple-400"
                                    >
                                        {t('addParameter')}
                                    </button>
                                </div>
                                {queryParams.length === 0 ? (
                                    <p className="text-sm text-[var(--muted-text)] italic">{t('noQueryParameters')}</p>
                                ) : (
                                    <div className="space-y-2">
                                        {queryParams.map((param, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={param.key}
                                                    onChange={(e) => updateQueryParam(index, 'key', e.target.value)}
                                                    placeholder={t('key')}
                                                    className="flex-1 px-3 py-2 text-sm bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg outline-none focus:ring-2 focus:ring-purple-500/30"
                                                />
                                                <input
                                                    type="text"
                                                    value={param.value}
                                                    onChange={(e) => updateQueryParam(index, 'value', e.target.value)}
                                                    placeholder={t('value')}
                                                    className="flex-1 px-3 py-2 text-sm bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg outline-none focus:ring-2 focus:ring-purple-500/30"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeQueryParam(index)}
                                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Request Body */}
                            <div>
                                <label className="block text-sm font-medium mb-2">{t('requestBody')}</label>
                                <textarea
                                    value={requestBody}
                                    onChange={(e) => setRequestBody(e.target.value)}
                                    placeholder='{"key": "value"}'
                                    className="w-full h-40 px-4 py-3 text-sm font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-xl resize-none outline-none focus:ring-2 focus:ring-purple-500/30"
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">
                                    {error}
                                </p>
                            )}
                        </form>
                    )}
                </div>

                {/* Footer */}
                {isParsed && (
                    <div className="flex justify-between items-center p-5 border-t border-[var(--border-color)] shrink-0">
                        <button
                            type="button"
                            onClick={() => setIsParsed(false)}
                            className="text-sm text-[var(--muted-text)] hover:text-[var(--foreground)]"
                        >
                            {t('backToCurl')}
                        </button>
                        <div className="flex gap-2">
                            <LiquidButton
                                type="button"
                                variant="secondary"
                                onClick={onClose}
                            >
                                {t('cancel')}
                            </LiquidButton>
                            <LiquidButton type="submit" form="endpoint-form">
                                {isEditing ? t('saveChanges') : t('addEndpoint')}
                            </LiquidButton>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
