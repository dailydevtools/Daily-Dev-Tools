"use client";

import { useState } from "react";
import { FileCode } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

                        <div>
                            <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('AsciiConverter.text')}</label>
                            <textarea
                                value={text} onChange={e => handleText(e.target.value)}
                                className="input-field w-full h-[200px] p-3 rounded-xl bg-black/30 border border-white/10 text-white resize-y"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('AsciiConverter.ascii')}</label>
                            <textarea
                                value={ascii} onChange={e => handleAscii(e.target.value)}
                                className="input-field w-full h-[200px] p-3 rounded-xl bg-black/30 border border-white/10 text-[#fb923c] font-mono resize-y"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
