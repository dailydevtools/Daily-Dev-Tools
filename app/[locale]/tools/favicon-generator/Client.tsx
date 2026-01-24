"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Download } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function FaviconGeneratorClient() {
    const t = useTranslations('FaviconGenerator');
    const [preview, setPreview] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [downloadUrl, setDownloadUrl] = useState("");

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                setPreview(img.src);
                generate(img);
            };
            img.src = ev.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const generate = (img: HTMLImageElement) => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // 32x32 standard favicon
        ctx.clearRect(0, 0, 32, 32);
        ctx.drawImage(img, 0, 0, 32, 32);

        const url = canvasRef.current.toDataURL("image/png");
        setDownloadUrl(url);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="Favicon Generator"
                        description="Convert any image into a standard 32x32 PNG favicon for your website."
                        icon={<ImageIcon size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center">
                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center mb-6 cursor-pointer hover:border-[#fb923c]/50 transition-colors" onClick={() => document.getElementById('favInput')?.click()}>
                            <input id="favInput" type="file" accept="image/*" onChange={handleFile} className="hidden" />
                            <ImageIcon size={48} color="#fb923c" className="mx-auto mb-4" />
                            <div className="text-lg text-white mb-2">{t('upload')}</div>
                            <div className="text-sm text-[#9ca3af]">{t('browse')}</div>
                        </div>

                        {preview && (
                            <div className="flex flex-col items-center gap-6 mt-10">
                                <div className="flex gap-10">
                                    <div>
                                        <div className="mb-2 text-[13px] text-[#9ca3af]">{t('original')}</div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={preview} alt="Original" className="w-16 h-16 rounded-lg" />
                                    </div>
                                    <div>
                                        <div className="mb-2 text-[13px] text-[#9ca3af]">{t('favicon')}</div>
                                        <canvas ref={canvasRef} width={32} height={32} className="w-8 h-8 border border-[#333]" />
                                    </div>
                                </div>

                                {downloadUrl && (
                                    <a href={downloadUrl} download="favicon.png" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-8 flex items-center gap-2 no-underline">
                                        <Download size={18} /> {t('download')}
                                    </a>
                                )}
                                <div className="text-xs text-[#6b7280]">{t('note')}</div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
