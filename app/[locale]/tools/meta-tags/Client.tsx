"use client";

import { useState } from "react";
import { Copy, Code2 } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput, LiquidTextArea } from "../../../components/ui/LiquidInput";
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
                                <LiquidTextArea
                                    value={desc} onChange={e => setDesc(e.target.value)}
                                    className="h-24"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">Keywords</label>
                                <LiquidInput
                                    value={keywords} onChange={e => setKeywords(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('author')}</label>
                                <LiquidInput
                                    value={author} onChange={e => setAuthor(e.target.value)}
                                />
                            </div>

                            <div className="relative mt-6">
                                <LiquidTextArea
                                    readOnly
                                    value={output}
                                    className="h-[200px] font-mono text-orange-600 dark:text-orange-500 bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
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
