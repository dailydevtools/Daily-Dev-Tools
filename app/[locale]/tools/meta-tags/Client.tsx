"use client";

import { useState } from "react";
import { Copy, Code2 } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="grid grid-cols-1 gap-5">

                            <div>
                                <div className="flex justify-between mb-2 text-[13px] text-[#9ca3af]">
                                    <span>{t('pageTitle')}</span>
                                    <span>{title.length}/60</span>
                                </div>
                                <input
                                    type="text" value={title} onChange={e => setTitle(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2 text-[13px] text-[#9ca3af]">
                                    <span>{t('description')}</span>
                                    <span>{desc.length}/160</span>
                                </div>
                                <textarea
                                    value={desc} onChange={e => setDesc(e.target.value)}
                                    className="input-field w-full h-20 p-3 rounded-xl bg-black/30 border border-white/10 text-white resize-y"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('keywords')}</label>
                                <input
                                    type="text" value={keywords} onChange={e => setKeywords(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('author')}</label>
                                <input
                                    type="text" value={author} onChange={e => setAuthor(e.target.value)}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                />
                            </div>

                            <div className="relative mt-3">
                                <textarea
                                    readOnly
                                    value={output}
                                    className="w-full h-[200px] p-5 rounded-xl bg-[#111] border-none text-[#fb923c] font-mono resize-none"
                                />
                                <button onClick={() => navigator.clipboard.writeText(output)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] absolute top-3 right-3 p-2">
                                    <Copy size={16} />
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
