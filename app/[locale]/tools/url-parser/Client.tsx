"use client";

import { useState, useEffect } from "react";
import { Link as LinkIcon, AlertCircle } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function UrlParserClient() {
    const t = useTranslations('UrlParser');
    const [input, setInput] = useState("");
    const [parsed, setParsed] = useState<any>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!input) {
            setParsed(null);
            setError("");
            return;
        }
        try {
            const url = new URL(input);
            const params: Record<string, string> = {};
            url.searchParams.forEach((v, k) => params[k] = v);

            setParsed({
                protocol: url.protocol,
                host: url.host,
                hostname: url.hostname,
                port: url.port,
                pathname: url.pathname,
                search: url.search,
                hash: url.hash,
                origin: url.origin,
                params
            });
            setError("");
        } catch (e) {
            setParsed(null);
            setError(t('error'));
        }
    }, [input]);

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="URL Parser"
                        description="Parse URLs into their components (protocol, hostname, path, parameters)."
                        icon={<LinkIcon size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="mb-6">
                            <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('enterUrl')}</label>
                            <input
                                type="text" value={input} onChange={e => setInput(e.target.value)}
                                placeholder="https://example.com/path?query=123"
                                className="input-field w-full p-3 rounded-xl bg-transparent dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)]"
                            />
                        </div>

                        {error && <div className="text-[#ef4444] mb-5 flex items-center gap-2"><AlertCircle size={16} /> {error}</div>}

                        {parsed && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(parsed).map(([key, val]) => {
                                    if (key === 'params') return null;
                                    return (
                                        <div key={key}>
                                            <div className="text-[13px] text-[#9ca3af] capitalize">{key}</div>
                                            <div className="text-[var(--foreground)] break-all p-2 bg-neutral-100 dark:bg-white/5 rounded-md mt-1">{String(val) || '-'}</div>
                                        </div>
                                    );
                                })}

                                {Object.keys(parsed.params).length > 0 && (
                                    <div className="col-span-1 md:col-span-2 mt-4">
                                        <div className="text-[13px] text-[#9ca3af]">{t('params')}</div>
                                        <div className="mt-2 flex flex-col gap-2">
                                            {Object.entries(parsed.params).map(([k, v]) => (
                                                <div key={k} className="flex bg-neutral-100 dark:bg-white/5 rounded-md p-2">
                                                    <div className="w-[120px] font-semibold text-[#fb923c]">{k}</div>
                                                    <div className="flex-1 text-[var(--foreground)] break-all">{String(v)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
