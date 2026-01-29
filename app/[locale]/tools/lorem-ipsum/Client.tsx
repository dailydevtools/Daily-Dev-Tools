"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, FileText } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidInput } from "../../../components/ui/LiquidInput";

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

                    <LiquidCard className="p-6 mb-6 flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3">
                            <label className="text-orange-500 font-medium">{t('LoremIpsum.paragraphs')}</label>
                            <LiquidInput
                                type="number"
                                min="1"
                                max="20"
                                value={paragraphs}
                                onChange={(e) => setParagraphs(Number(e.target.value))}
                                className="w-24 text-center"
                            />
                        </div>
                        <LiquidButton onClick={generateLorem} className="gap-2">
                            <RefreshCw size={16} /> {t('LoremIpsum.generate')}
                        </LiquidButton>
                        <div className="flex-1" />
                        <LiquidButton onClick={copyToClipboard} variant="ghost" className="gap-2">
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            {t('LoremIpsum.copyText')}
                        </LiquidButton>
                    </LiquidCard>

                    <LiquidCard className="p-10 min-h-[400px]">
                        {text.split('\n\n').map((p, i) => (
                            <p key={i} className="text-[var(--foreground)] leading-loose mb-6 text-lg last:mb-0">
                                {p}
                            </p>
                        ))}
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
