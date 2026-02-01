"use client";

import { useState } from "react";
import { Link as LinkIcon, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";
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

                    <LiquidCard className="p-10">
                        <div className="flex flex-col gap-5">

                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('websiteUrl')}</label>
                                <LiquidInput
                                    value={url} onChange={e => setUrl(e.target.value)}
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('source')}</label>
                                    <LiquidInput
                                        value={source} onChange={e => setSource(e.target.value)}
                                        placeholder="google, newsletter"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('medium')}</label>
                                    <LiquidInput
                                        value={medium} onChange={e => setMedium(e.target.value)}
                                        placeholder="cpc, banner, email"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('name')}</label>
                                    <LiquidInput
                                        value={campaign} onChange={e => setCampaign(e.target.value)}
                                        placeholder="summer_sale"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('term')}</label>
                                    <LiquidInput
                                        value={term} onChange={e => setTerm(e.target.value)}
                                        placeholder="running+shoes"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('content')}</label>
                                    <LiquidInput
                                        value={content} onChange={e => setContent(e.target.value)}
                                        placeholder="logolink, textlink"
                                    />
                                </div>
                            </div>

                            <div className="p-6 bg-[var(--card-hover-bg)] border border-[var(--border-color)] rounded-2xl mt-3">
                                <div className="text-[13px] text-[var(--muted-text)] mb-2">{t('generatedUrl')}</div>
                                <div className="mb-6 break-all text-orange-500 text-base font-mono min-h-[1.5em]">
                                    {result || "..."}
                                </div>
                                <div className="text-right">
                                    <LiquidButton
                                        variant="ghost"
                                        onClick={() => navigator.clipboard.writeText(result)}
                                        disabled={!url}
                                        className="ml-auto"
                                    >
                                        <Copy size={16} className="mr-2" /> Copy URL
                                    </LiquidButton>
                                </div>
                            </div>

                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
