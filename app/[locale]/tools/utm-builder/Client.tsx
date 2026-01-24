"use client";

import { useState } from "react";
import { Link as LinkIcon, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function UtmBuilderClient() {
    const t = useTranslations('UtmBuilder');
    const [url, setUrl] = useState("");
    const [source, setSource] = useState("");
    const [medium, setMedium] = useState("");
    const [campaign, setCampaign] = useState("");
    const [term, setTerm] = useState("");
    const [content, setContent] = useState("");

    const build = () => {
        if (!url) return "";
        try {
            const u = new URL(url);
            if (source) u.searchParams.set("utm_source", source);
            if (medium) u.searchParams.set("utm_medium", medium);
            if (campaign) u.searchParams.set("utm_campaign", campaign);
            if (term) u.searchParams.set("utm_term", term);
            if (content) u.searchParams.set("utm_content", content);
            return u.toString();
        } catch (e) {
            return "Invalid URL";
        }
    };

    const result = build();

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="UTM Builder"
                        description="Generate tracking links with UTM parameters for your campaigns."
                        icon={<LinkIcon size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="flex flex-col gap-5">

                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('websiteUrl')}</label>
                                <input
                                    type="text" value={url} onChange={e => setUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('source')}</label>
                                    <input
                                        type="text" value={source} onChange={e => setSource(e.target.value)}
                                        placeholder="google, newsletter"
                                        className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('medium')}</label>
                                    <input
                                        type="text" value={medium} onChange={e => setMedium(e.target.value)}
                                        placeholder="cpc, banner, email"
                                        className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('name')}</label>
                                    <input
                                        type="text" value={campaign} onChange={e => setCampaign(e.target.value)}
                                        placeholder="summer_sale"
                                        className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('term')}</label>
                                    <input
                                        type="text" value={term} onChange={e => setTerm(e.target.value)}
                                        placeholder="running+shoes"
                                        className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('content')}</label>
                                    <input
                                        type="text" value={content} onChange={e => setContent(e.target.value)}
                                        placeholder="logolink, textlink"
                                        className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                    />
                                </div>
                            </div>

                            <div className="p-6 bg-white/5 rounded-2xl mt-3">
                                <div className="text-[13px] text-[#9ca3af] mb-2">{t('generatedUrl')}</div>
                                <div className="mb-6 break-all text-[#fb923c] text-base font-mono">
                                    {result || "..."}
                                </div>
                                <div className="text-right">
                                    <button onClick={() => navigator.clipboard.writeText(result)} className={`inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] flex items-center gap-2 ml-auto ${!url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`} disabled={!url}>
                                        <Copy size={16} /> {t('copy')}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
