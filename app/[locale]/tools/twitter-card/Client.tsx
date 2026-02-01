"use client";

import { useState } from "react";
import { Twitter, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import LiquidSelect from "../../../components/ui/LiquidSelect";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput, LiquidTextArea } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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
                        <LiquidCard className="p-8">
                            <div className="flex flex-col gap-4">
                                <div className="relative z-20">
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('cardType')}</label>
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
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('siteHandle')}</label>
                                    <LiquidInput value={site} onChange={e => setSite(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('title')}</label>
                                    <LiquidInput value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('description')}</label>
                                    <LiquidTextArea value={desc} onChange={e => setDesc(e.target.value)} className="h-24" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('imageUrl')}</label>
                                    <LiquidInput value={image} onChange={e => setImage(e.target.value)} />
                                </div>
                            </div>
                        </LiquidCard>

                        <div className="flex flex-col gap-6">
                            <LiquidCard className="p-0 overflow-hidden">
                                <div className="p-3 bg-neutral-100/50 dark:bg-white/5 text-[13px] font-medium text-[var(--muted-text)] border-b border-[var(--border-color)]">{t('preview')}</div>
                                <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-b-2xl transition-colors">
                                    <div className={`border border-[var(--border-color)] rounded-xl overflow-hidden bg-white dark:bg-black transition-colors ${cardType === 'summary' ? 'flex' : 'block'}`}>
                                        <div
                                            className={`
                                                ${cardType === 'summary' ? 'w-[120px] h-[120px]' : 'w-full h-[200px]'}
                                                bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-600 shrink-0 bg-center bg-cover transition-colors
                                            `}
                                            style={{ backgroundImage: image ? `url(${image})` : undefined }}
                                        >
                                            {!image && <Twitter size={32} />}
                                        </div>
                                        <div className="p-3 flex-1">
                                            <div className="text-sm font-bold text-neutral-900 dark:text-white mb-1 line-clamp-1">{title || t('placeholderTitle')}</div>
                                            <div className="text-[13px] text-neutral-500 dark:text-neutral-400 mb-1 max-h-10 overflow-hidden line-clamp-2">{desc || t('placeholderDesc')}</div>
                                            <div className="text-xs text-neutral-400 dark:text-neutral-500">Example.com</div>
                                        </div>
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
                                <LiquidTextArea
                                    readOnly
                                    value={output}
                                    className="h-[150px] border-none !bg-transparent text-orange-500 font-mono resize-none outline-none text-sm leading-relaxed"
                                />
                            </LiquidCard>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
