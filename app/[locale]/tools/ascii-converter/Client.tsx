"use client";

import { useState } from "react";
import { FileCode } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidTextArea } from "../../../components/ui/LiquidInput";

export default function AsciiConverterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [text, setText] = useState("Hello");
    const [ascii, setAscii] = useState("72 101 108 108 111");

    const handleText = (val: string) => {
        setText(val);
        setAscii(val.split('').map(c => c.charCodeAt(0)).join(' '));
    };

    const handleAscii = (val: string) => {
        setAscii(val);
        const nums = val.trim().split(/\s+/).map(n => parseInt(n));
        const res = nums.map(n => isNaN(n) ? '' : String.fromCharCode(n)).join('');
        setText(res);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title={tTools('ascii-converter.name')}
                        description={tTools('ascii-converter.description')}
                        icon={<FileCode size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

                        <div>
                            <label className="block mb-3 text-[var(--muted-text)] text-sm font-medium">{t('AsciiConverter.text')}</label>
                            <LiquidTextArea
                                value={text} onChange={e => handleText(e.target.value)}
                                className="h-[200px] resize-y"
                            />
                        </div>

                        <div>
                            <label className="block mb-3 text-[var(--muted-text)] text-sm font-medium">{t('AsciiConverter.ascii')}</label>
                            <LiquidTextArea
                                value={ascii} onChange={e => handleAscii(e.target.value)}
                                className="h-[200px] resize-y font-mono text-orange-500"
                            />
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
