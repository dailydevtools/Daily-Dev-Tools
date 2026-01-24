"use client";

import { useState, useEffect } from "react";
import { Download, QrCode } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-[20px]">
                                <label className="block text-[#fb923c] font-medium mb-3">{t('content')}</label>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder={t('placeholder')}
                                    className="w-full bg-black/20 border border-white/10 p-4 rounded-xl text-white text-base outline-none"
                                />
                            </div>

                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-[20px]">
                                <h3 className="text-white font-semibold mb-4">{t('customization')}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('foreground')}</label>
                                        <div className="flex gap-2">
                                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded-lg border-none cursor-pointer p-0 overflow-hidden" />
                                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('background')}</label>
                                        <div className="flex gap-2">
                                            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-10 h-10 rounded-lg border-none cursor-pointer p-0 overflow-hidden" />
                                            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 rounded-3xl flex flex-col items-center justify-center">
                            <div className="bg-white p-4 rounded-2xl mb-6">
                                {qrDataUrl && <img src={qrDataUrl} alt="QR Code" className="w-[240px] h-[240px] block" />}
                            </div>
                            <button onClick={downloadQr} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-8 w-full flex items-center justify-center gap-2">
                                <Download size={18} /> {t('download')}
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
