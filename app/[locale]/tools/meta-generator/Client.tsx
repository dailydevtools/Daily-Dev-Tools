"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Tags } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-[20px]">
                                <h3 className="text-white font-semibold mb-4">{t('websiteDetails')}</h3>

                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('pageTitle')}</label>
                                        <input type="text" name="title" value={data.title} onChange={handleChange} placeholder="My Awesome Website" className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white outline-none focus:border-[#fb923c]/50 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('description')}</label>
                                        <textarea name="description" value={data.description} onChange={handleChange} placeholder="A brief description of your site..." className="w-full h-20 bg-black/20 border border-white/10 p-3 rounded-lg text-white outline-none resize-none focus:border-[#fb923c]/50 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('keywords')}</label>
                                        <input type="text" name="keywords" value={data.keywords} onChange={handleChange} placeholder="web, tools, dev" className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white outline-none focus:border-[#fb923c]/50 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('author')}</label>
                                        <input type="text" name="author" value={data.author} onChange={handleChange} placeholder="Your Name" className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white outline-none focus:border-[#fb923c]/50 transition-colors" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-[20px]">
                                <h3 className="text-white font-semibold mb-4">{t('socialPreview')}</h3>
                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('websiteUrl')}</label>
                                        <input type="text" name="url" value={data.url} onChange={handleChange} placeholder="https://example.com" className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white outline-none focus:border-[#fb923c]/50 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('previewImage')}</label>
                                        <input type="text" name="image" value={data.image} onChange={handleChange} placeholder="https://example.com/og-image.jpg" className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white outline-none focus:border-[#fb923c]/50 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 rounded-3xl overflow-hidden flex flex-col h-fit sticky top-6">
                            <div className="p-4 px-6 border-b border-white/5 flex items-center justify-between">
                                <span className="font-medium text-[#fb923c]">{t('generatedHtml')}</span>
                                <button onClick={copyToClipboard} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-1.5 px-3 text-xs flex items-center gap-1.5">
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {copied ? t('copied') : t('copy')}
                                </button>
                            </div>
                            <textarea
                                value={code}
                                readOnly
                                placeholder="Meta tags will appear here..."
                                className="flex-1 min-h-[400px] bg-transparent border-none p-6 text-[#4ade80] font-mono text-[13px] resize-none outline-none leading-relaxed"
                            />
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
