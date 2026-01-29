"use client";

import { useState } from "react";
import { Twitter } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import LiquidSelect from "../../../components/ui/LiquidSelect";

export default function TwitterCardClient() {
    const t = useTranslations('TwitterCard');
    const [cardType, setCardType] = useState("summary_large_image");
    const [site, setSite] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

    const generate = () => {
        let code = "";
        code += `<meta name="twitter:card" content="${cardType}" />\n`;
        if (site) code += `<meta name="twitter:site" content="${site}" />\n`;
        if (title) code += `<meta name="twitter:title" content="${title}" />\n`;
        if (desc) code += `<meta name="twitter:description" content="${desc}" />\n`;
        if (image) code += `<meta name="twitter:image" content="${image}" />`;
        return code;
    };

    const output = generate();

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title="Twitter Card Generator"
                        description="Create Twitter Card meta tags for rich tweets."
                        icon={<Twitter size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
                            <div className="flex flex-col gap-4">
                                <div className="relative z-20">
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('cardType')}</label>
                                    <LiquidSelect
                                        value={cardType}
                                        onChange={setCardType}
                                        options={[
                                            { value: 'summary', label: 'Summary' },
                                            { value: 'summary_large_image', label: 'Summary Large Image' }
                                        ]}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('siteHandle')}</label>
                                    <input type="text" value={site} onChange={e => setSite(e.target.value)} className="input-field w-full p-3 rounded-xl bg-neutral-100 dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)]" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('title')}</label>
                                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input-field w-full p-3 rounded-xl bg-neutral-100 dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)]" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('description')}</label>
                                    <textarea value={desc} onChange={e => setDesc(e.target.value)} className="input-field w-full h-20 p-3 rounded-xl bg-neutral-100 dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)] resize-y" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('imageUrl')}</label>
                                    <input type="text" value={image} onChange={e => setImage(e.target.value)} className="input-field w-full p-3 rounded-xl bg-neutral-100 dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 overflow-hidden">
                                <div className="p-3 bg-white/5 text-[13px] text-[#9ca3af] border-b border-white/5">{t('preview')}</div>
                                <div className="p-4 bg-black rounded-b-2xl">
                                    <div className={`border border-[#333] rounded-xl overflow-hidden ${cardType === 'summary' ? 'flex' : 'block'}`}>
                                        <div
                                            className={`
                                                ${cardType === 'summary' ? 'w-[120px] h-[120px]' : 'w-full h-[200px]'}
                                                bg-[#222] flex items-center justify-center text-[#555] shrink-0 bg-center bg-cover
                                            `}
                                            style={{ backgroundImage: image ? `url(${image})` : undefined }}
                                        >
                                            {!image && <Twitter size={32} />}
                                        </div>
                                        <div className="p-3 bg-black flex-1">
                                            <div className="text-sm font-bold text-white mb-1">{title || t('placeholderTitle')}</div>
                                            <div className="text-[13px] text-[#8899a6] mb-1 max-h-10 overflow-hidden">{desc || t('placeholderDesc')}</div>
                                            <div className="text-xs text-[#8899a6]">Example.com</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0">
                                <div className="p-3 bg-black/20 text-[#9ca3af] text-[13px] border-b border-white/10">{t('generatedHtml')}</div>
                                <textarea readOnly value={output} className="w-full h-[150px] p-5 bg-transparent border-none text-[#fb923c] font-mono resize-none outline-none" />
                                <div className="p-3 text-right border-t border-white/10">
                                    <button onClick={() => navigator.clipboard.writeText(output)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]">{t('copy')}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
