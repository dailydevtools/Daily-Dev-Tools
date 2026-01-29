"use client";

import { useState, useEffect } from "react";
import { Download, QrCode } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function QrGeneratorClient() {
    const [text, setText] = useState("https://dailydev.tools");
    const [qrDataUrl, setQrDataUrl] = useState("");
    const [color, setColor] = useState("#000000");
    const [bg, setBg] = useState("#ffffff");
    const t = useTranslations('ToolPage.QrGenerator');
    const tTools = useTranslations('Tools');

    useEffect(() => {
        const generateQr = () => {
            if (!text) return;
            const cleanColor = color.replace('#', '');
            const cleanBg = bg.replace('#', '');
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(text)}&color=${cleanColor}&bgcolor=${cleanBg}`;
            setQrDataUrl(url);
        };

        // Debounce to prevent too many requests
        const timer = setTimeout(() => {
            generateQr();
        }, 500);
        return () => clearTimeout(timer);
    }, [text, color, bg]);

    const downloadQr = () => {
        const a = document.createElement("a");
        a.href = qrDataUrl;
        a.download = "qrcode.png";
        a.click();
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
                            <LiquidCard className="p-6">
                                <label className="block text-orange-500 font-medium mb-3">{t('content')}</label>
                                <LiquidInput
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder={t('placeholder')}
                                />
                            </LiquidCard>

                            <LiquidCard className="p-6">
                                <h3 className="text-[var(--foreground)] font-semibold mb-4">{t('customization')}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[var(--muted-text)] mb-2 text-[13px]">{t('foreground')}</label>
                                        <div className="flex gap-2">
                                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded-lg border border-[var(--border-color)] cursor-pointer p-0 overflow-hidden bg-transparent" />
                                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 bg-neutral-100 dark:bg-black/20 border border-[var(--border-color)] rounded-lg px-3 text-[var(--foreground)] outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[var(--muted-text)] mb-2 text-[13px]">{t('background')}</label>
                                        <div className="flex gap-2">
                                            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-10 h-10 rounded-lg border border-[var(--border-color)] cursor-pointer p-0 overflow-hidden bg-transparent" />
                                            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="flex-1 bg-neutral-100 dark:bg-black/20 border border-[var(--border-color)] rounded-lg px-3 text-[var(--foreground)] outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </LiquidCard>
                        </div>

                        <LiquidCard className="p-8 flex flex-col items-center justify-center">
                            <div className="bg-white p-4 rounded-2xl mb-6 shadow-sm border border-neutral-200">
                                {qrDataUrl && <img src={qrDataUrl} alt="QR Code" className="w-[240px] h-[240px] block" />}
                            </div>
                            <LiquidButton onClick={downloadQr} className="w-full gap-2 h-11 text-base">
                                <Download size={18} /> {t('download')}
                            </LiquidButton>
                        </LiquidCard>

                    </div>

                </div>
            </div>
        </main>
    );
}
