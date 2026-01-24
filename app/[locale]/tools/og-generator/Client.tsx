"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('title')}</label>
                                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('description')}</label>
                                    <textarea value={desc} onChange={e => setDesc(e.target.value)} className="input-field w-full h-20 p-3 rounded-xl bg-black/30 border border-white/10 text-white resize-y" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('image')}</label>
                                    <input type="text" value={image} onChange={e => setImage(e.target.value)} className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('url')}</label>
                                    <input type="text" value={url} onChange={e => setUrl(e.target.value)} className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('type')}</label>
                                    <select value={type} onChange={e => setType(e.target.value)} className="w-full p-3 rounded-xl bg-[#111] border border-[#333] text-white">
                                        <option value="website">{t('website')}</option>
                                        <option value="article">{t('article')}</option>
                                        <option value="profile">{t('profile')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden">
                                <div className="p-3 bg-white/5 text-[13px] text-[#9ca3af] border-b border-white/5">{t('preview')}</div>
                                <div className="p-0 bg-[#f0f2f5] rounded-b-2xl">
                                    <div className="w-full h-[200px] flex items-center justify-center text-[#8b9dc3] bg-cover bg-center"
                                        style={{ backgroundImage: image ? `url(${image})` : 'none', backgroundColor: image ? 'transparent' : '#dfe3ee' }}>
                                        {!image && <Share2 size={48} />}
                                    </div>
                                    <div className="p-3 bg-[#f0f2f5] border-t border-[#ddd]">
                                        <div className="text-xs text-[#606770] uppercase">{url ? new URL(url).hostname : 'EXAMPLE.COM'}</div>
                                        <div className="text-base font-semibold text-[#1d2129] my-1 leading-tight">{title || "Your Page Title"}</div>
                                        <div className="text-sm text-[#606770] leading-snug max-h-10 overflow-hidden line-clamp-2">{desc || "A description of your page content goes here."}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0">
                                <div className="p-3 bg-black/20 text-[#9ca3af] text-[13px] border-b border-white/10">{t('generatedHtml')}</div>
                                <textarea readOnly value={output} className="w-full h-[150px] p-5 rounded-none bg-transparent border-none text-[#fb923c] font-mono resize-none outline-none" />
                                <div className="p-3 text-right border-t border-white/10">
                                    <button onClick={() => navigator.clipboard.writeText(output)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2 px-4">{t('copy')}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
