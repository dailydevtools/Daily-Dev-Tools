"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Tags } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidInput } from "../../../components/ui/LiquidInput";

export default function MetaGeneratorClient() {
    const t = useTranslations('MetaGenerator');
    const [data, setData] = useState({
        title: "",
        description: "",
        keywords: "",
        author: "",
        url: "",
        image: ""
    });
    const [code, setCode] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const generateCode = () => {
        let html = `<!-- Primary Meta Tags -->
<title>${data.title}</title>
<meta name="title" content="${data.title}" />
<meta name="description" content="${data.description}" />
<meta name="keywords" content="${data.keywords}" />
<meta name="author" content="${data.author}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${data.url}" />
<meta property="og:title" content="${data.title}" />
<meta property="og:description" content="${data.description}" />
<meta property="og:image" content="${data.image}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${data.url}" />
<meta property="twitter:title" content="${data.title}" />
<meta property="twitter:description" content="${data.description}" />
<meta property="twitter:image" content="${data.image}" />`;

        setCode(html);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1100px] mx-auto">
                    <ToolPageHeader
                        title="Meta Tag Generator"
                        description="Generate SEO-friendly meta tags, including Open Graph and Twitter Cards."
                        icon={<Tags size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        <div className="flex flex-col gap-6">
                            <LiquidCard className="p-6">
                                <h3 className="text-[var(--foreground)] font-bold mb-6 flex items-center gap-2">
                                    <Tags size={18} className="text-orange-500" /> {t('websiteDetails')}
                                </h3>

                                <div className="grid gap-6">
                                    <div>
                                        <label className="block text-[var(--muted-text)] mb-2 text-sm font-medium">{t('pageTitle')}</label>
                                        <LiquidInput type="text" name="title" value={data.title} onChange={handleChange} placeholder="My Awesome Website" />
                                    </div>
                                    <div>
                                        <label className="block text-[var(--muted-text)] mb-2 text-sm font-medium">{t('description')}</label>
                                        <textarea
                                            name="description"
                                            value={data.description}
                                            onChange={handleChange}
                                            placeholder="A brief description of your site..."
                                            className="w-full h-24 bg-neutral-100 dark:bg-black/30 border border-transparent dark:border-white/10 p-4 rounded-xl text-[var(--foreground)] outline-none resize-none focus:ring-2 ring-orange-500/50 transition-all text-sm leading-relaxed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[var(--muted-text)] mb-2 text-sm font-medium">{t('keywords')}</label>
                                        <LiquidInput type="text" name="keywords" value={data.keywords} onChange={handleChange} placeholder="web, tools, dev" />
                                    </div>
                                    <div>
                                        <label className="block text-[var(--muted-text)] mb-2 text-sm font-medium">{t('author')}</label>
                                        <LiquidInput type="text" name="author" value={data.author} onChange={handleChange} placeholder="Your Name" />
                                    </div>
                                </div>
                            </LiquidCard>

                            <LiquidCard className="p-6">
                                <h3 className="text-[var(--foreground)] font-bold mb-6 flex items-center gap-2">
                                    <Tags size={18} className="text-blue-500" /> {t('socialPreview')}
                                </h3>
                                <div className="grid gap-6">
                                    <div>
                                        <label className="block text-[var(--muted-text)] mb-2 text-sm font-medium">{t('websiteUrl')}</label>
                                        <LiquidInput type="text" name="url" value={data.url} onChange={handleChange} placeholder="https://example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-[var(--muted-text)] mb-2 text-sm font-medium">{t('previewImage')}</label>
                                        <LiquidInput type="text" name="image" value={data.image} onChange={handleChange} placeholder="https://example.com/og-image.jpg" />
                                    </div>
                                </div>
                            </LiquidCard>
                        </div>

                        <LiquidCard className="p-0 overflow-hidden flex flex-col h-fit sticky top-6">
                            <div className="p-4 px-6 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                <span className="font-medium text-orange-500">{t('generatedHtml')}</span>
                                <LiquidButton onClick={copyToClipboard} className="gap-2 py-1.5 px-3 text-xs h-auto min-h-0">
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {copied ? t('copied') : t('copy')}
                                </LiquidButton>
                            </div>
                            <textarea
                                value={code}
                                readOnly
                                placeholder="Meta tags will appear here..."
                                className="flex-1 min-h-[500px] bg-transparent border-none p-6 text-green-500 font-mono text-[13px] resize-none outline-none leading-relaxed"
                            />
                        </LiquidCard>

                    </div>

                </div>
            </div>
        </main>
    );
}
