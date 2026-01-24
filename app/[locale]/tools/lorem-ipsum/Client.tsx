"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, FileText } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function LoremIpsumClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [paragraphs, setParagraphs] = useState(3);
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    // Classic Lorem Ipsum text chunks
    const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Fusce convallis, mauris imperdiet gravida bibendum, nisl turpis suscipit mauris, sed placerat ipsum urna sed risus. In convallis tellus a mauris. Aspicio.";

    const sentences = loremText.split('. ');

    useEffect(() => {
        if (!text) generateLorem();
    }, []);

    function generateLorem() {
        let result = [];
        for (let i = 0; i < paragraphs; i++) {
            // Shuffle and pick random sentences to make it look different each time
            const shuffled = [...sentences].sort(() => 0.5 - Math.random());
            const pLength = Math.floor(Math.random() * 5) + 3; // 3-8 sentences per paragraph
            const p = shuffled.slice(0, pLength).join('. ') + '.';
            result.push(p);
        }
        setText(result.join('\n\n'));
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[900px] mx-auto">

                    <ToolPageHeader
                        title={tTools('lorem-ipsum.name')}
                        description={tTools('lorem-ipsum.description')}
                        icon={<FileText size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-2xl mb-6 flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <label className="text-[#fb923c] font-medium">{t('LoremIpsum.paragraphs')}</label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={paragraphs}
                                onChange={(e) => setParagraphs(Number(e.target.value))}
                                className="bg-black/30 border border-white/10 px-3 py-2 rounded-lg text-white w-20"
                            />
                        </div>
                        <button onClick={generateLorem} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-2.5 px-6 flex items-center gap-2">
                            <RefreshCw size={16} /> {t('LoremIpsum.generate')}
                        </button>
                        <button onClick={copyToClipboard} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] ml-auto py-2.5 px-6 flex items-center gap-2">
                            {copied ? <Check size={16} className="text-[#22c55e]" /> : <Copy size={16} />}
                            {t('LoremIpsum.copyText')}
                        </button>
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 rounded-3xl min-h-[400px]">
                        {text.split('\n\n').map((p, i) => (
                            <p key={i} className="text-[#e5e7eb] leading-[1.8] mb-6 text-base">
                                {p}
                            </p>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    );
}
