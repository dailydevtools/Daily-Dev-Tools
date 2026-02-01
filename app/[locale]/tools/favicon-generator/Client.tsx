"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Download } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
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

                    <LiquidCard className="p-10 text-center">
                        <div className="border-2 border-dashed border-[var(--border-color)] rounded-2xl p-10 text-center mb-6 cursor-pointer hover:border-[#fb923c]/50 transition-colors" onClick={() => document.getElementById('favInput')?.click()}>
                            <input id="favInput" type="file" accept="image/*" onChange={handleFile} className="hidden" />
                            <ImageIcon size={48} color="#fb923c" className="mx-auto mb-4" />
                            <div className="text-lg text-[var(--foreground)] mb-2 font-medium">{t('upload')}</div>
                            <div className="text-sm text-[var(--muted-text)]">Recommended: 512x512 PNG</div>
                        </div>

                        {preview && (
                            <div className="flex flex-col items-center gap-6 mt-10">
                                <div className="flex gap-10">
                                    <div>
                                        <div className="mb-2 text-[13px] text-[var(--muted-text)]">{t('original')}</div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={preview} alt="Original" className="w-16 h-16 rounded-lg border border-[var(--border-color)]" />
                                    </div>
                                    <div>
                                        <div className="mb-2 text-[13px] text-[var(--muted-text)]">{t('favicon')}</div>
                                        <canvas ref={canvasRef} width={32} height={32} className="w-8 h-8 border border-[var(--border-color)]" />
                                    </div>
                                </div>

                                {downloadUrl && (
                                    <LiquidButton
                                        onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = downloadUrl;
                                            link.download = 'favicon.png';
                                            link.click();
                                        }}
                                        className="px-8 py-3"
                                    >
                                        <Download size={18} className="mr-2" /> {t('download')}
                                    </LiquidButton>
                                )}
                                <div className="text-xs text-[var(--muted-text)]">{t('note')}</div>
                            </div>
                        )}
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
