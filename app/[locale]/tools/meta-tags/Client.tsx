"use client";

import { useState } from "react";
import { Copy, Code2 } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function MetaTagsClient() {
    const t = useTranslations('MetaTags');
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [keywords, setKeywords] = useState("");
    const [author, setAuthor] = useState("");

    const generate = () => {
        let code = "";
        if (title) code += `<title>${title}</title>\n`;
        if (desc) code += `<meta name="description" content="${desc}">\n`;
        if (keywords) code += `<meta name="keywords" content="${keywords}">\n`;
        if (author) code += `<meta name="author" content="${author}">\n`;

        code += `<meta name="viewport" content="width=device-width, initial-scale=1.0">`;
        return code;
    };

    const output = generate();

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="Simple Meta Tags"
                        description="Quickly generate basic HTML meta tags for your page."
                        icon={<Code2 size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-8">
                        <div className="grid grid-cols-1 gap-6">

                            <div>
                                <div className="flex justify-between mb-2 text-xs font-medium text-[var(--muted-text)]">
                                    <span>{t('pageTitle')}</span>
                                    <span>{title.length}/60</span>
                                </div>
                                <LiquidInput
                                    type="text" value={title} onChange={e => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2 text-xs font-medium text-[var(--muted-text)]">
                                    <span>{t('description')}</span>
                                    <span>{desc.length}/160</span>
                                </div>
                                <textarea
                                    value={desc} onChange={e => setDesc(e.target.value)}
                                    className="w-full h-24 bg-neutral-100 dark:bg-black/30 border border-transparent dark:border-white/10 p-4 rounded-xl text-[var(--foreground)] outline-none resize-y focus:ring-2 ring-orange-500/50 transition-all text-sm leading-relaxed"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('keywords')}</label>
                                <LiquidInput
                                    type="text" value={keywords} onChange={e => setKeywords(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('author')}</label>
                                <LiquidInput
                                    type="text" value={author} onChange={e => setAuthor(e.target.value)}
                                />
                            </div>

                            <div className="relative mt-6">
                                <textarea
                                    readOnly
                                    value={output}
                                    className="w-full h-[200px] p-5 rounded-xl bg-neutral-900 border border-[var(--border-color)] text-orange-500 font-mono resize-none outline-none text-sm leading-relaxed"
                                />
                                <div className="absolute top-3 right-3">
                                    <LiquidButton onClick={() => navigator.clipboard.writeText(output)} variant="ghost" className="h-8 w-8 p-0">
                                        <Copy size={14} />
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
