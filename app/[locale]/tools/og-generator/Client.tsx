"use client";

import { useState } from "react";
import { Share2, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import LiquidSelect from "../../../components/ui/LiquidSelect";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function OgGeneratorClient() {
    const t = useTranslations('OgGenerator');
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [type, setType] = useState("website");

    const generate = () => {
        let code = "";
        if (title) code += `<meta property="og:title" content="${title}" />\n`;
        if (desc) code += `<meta property="og:description" content="${desc}" />\n`;
        if (image) code += `<meta property="og:image" content="${image}" />\n`;
        if (url) code += `<meta property="og:url" content="${url}" />\n`;
        code += `<meta property="og:type" content="${type}" />`;
        return code;
    };

    const output = generate();

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title="Open Graph Generator"
                        description="Create preview-ready Open Graph meta tags for Facebook, Twitter, LinkedIn, and more."
                        icon={<Share2 size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <LiquidCard className="p-8">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('title')}</label>
                                    <LiquidInput type="text" value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('description')}</label>
                                    <textarea
                                        value={desc}
                                        onChange={e => setDesc(e.target.value)}
                                        className="w-full h-24 bg-neutral-100 dark:bg-black/30 border border-transparent dark:border-white/10 p-4 rounded-xl text-[var(--foreground)] outline-none resize-y focus:ring-2 ring-orange-500/50 transition-all text-sm leading-relaxed"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('image')}</label>
                                    <LiquidInput type="text" value={image} onChange={e => setImage(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('url')}</label>
                                    <LiquidInput type="text" value={url} onChange={e => setUrl(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('type')}</label>
                                    <LiquidSelect
                                        value={type}
                                        onChange={setType}
                                        options={[
                                            { value: "website", label: t('website') },
                                            { value: "article", label: t('article') },
                                            { value: "profile", label: t('profile') }
                                        ]}
                                    />
                                </div>
                            </div>
                        </LiquidCard>

                        <div className="flex flex-col gap-6">
                            <LiquidCard className="p-0 overflow-hidden">
                                <div className="p-3 bg-neutral-100/50 dark:bg-white/5 text-[13px] font-medium text-[var(--muted-text)] border-b border-[var(--border-color)]">{t('preview')}</div>
                                <div className="p-0 bg-[#f0f2f5] border-b border-[var(--border-color)]">
                                    <div className="w-full h-[200px] flex items-center justify-center text-[#8b9dc3] bg-cover bg-center overflow-hidden"
                                        style={{ backgroundImage: image ? `url(${image})` : 'none', backgroundColor: image ? 'transparent' : '#dfe3ee' }}>
                                        {!image && <Share2 size={48} />}
                                    </div>
                                    <div className="p-4 bg-[#f0f2f5] border-t border-[#ddd]">
                                        <div className="text-xs text-[#606770] uppercase truncate">{url ? new URL(url).hostname : 'EXAMPLE.COM'}</div>
                                        <div className="text-base font-bold text-[#1d2129] my-1 leading-tight line-clamp-2">{title || "Your Page Title"}</div>
                                        <div className="text-sm text-[#606770] leading-snug max-h-12 overflow-hidden line-clamp-2">{desc || "A description of your page content goes here."}</div>
                                    </div>
                                </div>
                            </LiquidCard>

                            <LiquidCard className="p-0 flex-1 flex flex-col">
                                <div className="p-4 px-6 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                    <span className="font-medium text-orange-500">{t('generatedHtml')}</span>
                                    <LiquidButton onClick={() => navigator.clipboard.writeText(output)} variant="ghost" className="h-8 py-0 px-3 text-xs gap-2">
                                        <Copy size={14} /> {t('copy')}
                                    </LiquidButton>
                                </div>
                                <textarea
                                    readOnly
                                    value={output}
                                    className="w-full h-[200px] p-5 bg-transparent border-none text-orange-500 font-mono resize-none outline-none text-sm leading-relaxed"
                                />
                            </LiquidCard>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
