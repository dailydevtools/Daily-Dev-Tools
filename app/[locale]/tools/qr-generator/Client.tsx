"use client";

import { useState, useEffect } from "react";
import { Download, QrCode } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { useDebounce } from "../../../hooks/useDebounce";
import { useDownload } from "../../../hooks/useDownload";
import { ColorPicker } from "../../../components/ui/ColorPicker";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function QrGeneratorClient() {
    const [text, setText] = useState("https://dailydev.tools");
    const [qrDataUrl, setQrDataUrl] = useState("");
    const [color, setColor] = useState("#000000");
    const [bg, setBg] = useState("#ffffff");
    const t = useTranslations('ToolPage.QrGenerator');
    const tTools = useTranslations('Tools');

    const debouncedText = useDebounce(text, 500);
    const debouncedColor = useDebounce(color, 500);
    const debouncedBg = useDebounce(bg, 500);
    const { download } = useDownload();

    useEffect(() => {
        if (!debouncedText) return;
        const cleanColor = debouncedColor.replace('#', '');
        const cleanBg = debouncedBg.replace('#', '');
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(debouncedText)}&color=${cleanColor}&bgcolor=${cleanBg}`;
        setQrDataUrl(url);
    }, [debouncedText, debouncedColor, debouncedBg]);

    const handleDownload = () => {
        download(qrDataUrl, "qrcode.png");
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[900px] mx-auto">

                    <ToolPageHeader
                        title={tTools('qr-generator.name')}
                        description={tTools('qr-generator.description')}
                        icon={<QrCode size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-8">

                        <div className="flex flex-col gap-6">
                            <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all">
                                <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5 opacity-60">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('content')}</span>
                                    </div>
                                    <span className="text-xs text-[var(--muted-text)] font-mono">{text.length} chars</span>
                                </div>
                                <div className="p-4 bg-[var(--card-bg)]">
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder={t('placeholder')}
                                        className="w-full h-12 bg-transparent border-none text-[var(--foreground)] text-lg outline-none placeholder:text-[var(--muted-text)] font-sans"
                                    />
                                </div>
                            </LiquidCard>

                            <LiquidCard className="p-6">
                                <h3 className="text-[var(--foreground)] font-semibold mb-4 text-sm uppercase tracking-wider opacity-80">{t('customization')}</h3>
                                <div className="flex flex-col gap-6">
                                    <ColorPicker
                                        label={t('foreground')}
                                        value={color}
                                        onChange={setColor}
                                    />
                                    <ColorPicker
                                        label={t('background')}
                                        value={bg}
                                        onChange={setBg}
                                    />
                                </div>
                            </LiquidCard>
                        </div>

                        <LiquidCard className="p-8 flex flex-col items-center justify-center">
                            <div className="bg-white p-4 rounded-2xl mb-6 shadow-sm border border-neutral-200">
                                {qrDataUrl && <img src={qrDataUrl} alt="QR Code" className="w-[240px] h-[240px] block" />}
                            </div>
                            <LiquidButton onClick={handleDownload} className="w-full gap-2 h-11 text-base">
                                <Download size={18} /> {t('download')}
                            </LiquidButton>
                        </LiquidCard>

                    </div>

                </div>
            </div>
        </main>
    );
}
