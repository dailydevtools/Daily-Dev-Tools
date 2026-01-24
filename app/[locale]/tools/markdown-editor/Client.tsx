"use client";

import { useState } from "react";
import { Eye, Code } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import DOMPurify from "isomorphic-dompurify";

// We will use a simple regex based parser for improved performance without heavy deps
// In a real prod app, we'd use 'react-markdown' or 'marked'

export default function MarkdownEditorClient() {
    const t = useTranslations('MarkdownEditor');
    const [input, setInput] = useState("# Hello World\n\nThis is a **bold** statement.\n\n- Item 1\n- Item 2\n\n```\nconsole.log('code');\n```");

    // Simple Markdown Parser (Client-side, validation-free)
    const parseMarkdown = (text: string) => {
        let html = text
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
            .replace(/\*(.*)\*/gim, '<i>$1</i>')
            .replace(/`([^`]*)`/gim, '<code>$1</code>')
            .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
            .replace(/^-(.*$)/gim, '<li>$1</li>')
            .replace(/\n\n/gim, '<br/><br/>'); // Basic line breaks

        return { __html: DOMPurify.sanitize(html) };
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pb-[60px] px-6 pt-6">
                <div className="max-w-[1200px] mx-auto">
                    <ToolPageHeader
                        title="Markdown Editor"
                        description="Write and preview Markdown in real-time. Simple and fast."
                        icon={<span className="text-2xl">📝</span>}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)] min-h-[500px]">
                        {/* Editor */}
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 flex flex-col rounded-2xl overflow-hidden">
                            <div className="px-5 py-3 border-b border-white/5 bg-white/[0.02] flex items-center gap-2">
                                <Code className="w-4 h-4 text-[#fb923c]" />
                                <span className="text-sm font-medium text-white">{t('inputLabel')}</span>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none p-5 font-mono text-sm text-[#e5e7eb] resize-none outline-none leading-relaxed"
                            />
                        </div>

                        {/* Preview */}
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 flex flex-col rounded-2xl overflow-hidden">
                            <div className="px-5 py-3 border-b border-white/5 bg-white/[0.02] flex items-center gap-2">
                                <Eye className="w-4 h-4 text-[#4ade80]" />
                                <span className="text-sm font-medium text-white">{t('previewLabel')}</span>
                            </div>
                            <div
                                className="flex-1 p-5 overflow-y-auto text-[#e5e7eb] leading-relaxed markdown-preview
                                [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-[0.5em] [&>h1]:border-b [&>h1]:border-white/10 [&>h1]:pb-[0.2em] [&>h1]:text-[#fb923c]
                                [&>h2]:text-[1.5em] [&>h2]:font-bold [&>h2]:mb-[0.5em] [&>h2]:text-[#facc15]
                                [&>h3]:text-[1.25em] [&>h3]:font-bold [&>h3]:mb-[0.5em]
                                [&>p]:mb-[1em]
                                [&>code]:bg-black/30 [&>code]:px-[4px] [&>code]:py-[2px] [&>code]:rounded [&>code]:font-mono [&>code]:text-[#fb923c]
                                [&>pre]:bg-black/30 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:mb-[1em] [&>pre]:overflow-x-auto
                                [&>pre>code]:bg-transparent [&>pre>code]:p-0 [&>pre>code]:text-[#e5e7eb]
                                [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-[1em]
                                [&>li]:mb-[0.2em]
                                [&>blockquote]:border-l-4 [&>blockquote]:border-[#fb923c] [&>blockquote]:pl-4 [&>blockquote]:m-[0_0_1em_0] [&>blockquote]:text-[#9ca3af]
                                "
                                dangerouslySetInnerHTML={parseMarkdown(input)}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
