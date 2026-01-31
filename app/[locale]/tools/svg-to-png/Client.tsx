"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Download } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidTextArea } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";
export default function SvgToPngClient() {
    const t = useTranslations('SvgToPng');
    const [svgContent, setSvgContent] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [downloadUrl, setDownloadUrl] = useState("");
    const [error, setError] = useState("");

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "image/svg+xml") {
            setError(t('errorType'));
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            setSvgContent(ev.target?.result as string);
            process(ev.target?.result as string);
        };
        reader.readAsText(file);
    };

    const process = (svgStr: string) => {
        setError("");
        try {
            // Create an image from SVG blob
            const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const img = new Image();
            img.onload = () => {
                if (!canvasRef.current) return;
                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) return;

                const scale = 2; // High res
                canvasRef.current.width = img.width * scale;
                canvasRef.current.height = img.height * scale;

                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);

                const pngUrl = canvasRef.current.toDataURL("image/png");
                setDownloadUrl(pngUrl);
                URL.revokeObjectURL(url);
            };
            img.onerror = () => {
                setError(t('errorRender'));
            };
            img.src = url;

        } catch (e) {
            setError(t('errorProcess'));
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="SVG to PNG Converter"
                        description="Convert SVG vector files to high-resolution PNG images."
                        icon={<ImageIcon size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-10 text-center">
                        <div
                            className="border-2 border-dashed border-[var(--border-color)] rounded-2xl p-10 text-center mb-6 cursor-pointer hover:bg-[var(--card-hover-bg)] transition-colors"
                            onClick={() => document.getElementById('svgInput')?.click()}
                        >
                            <input id="svgInput" type="file" accept=".svg" onChange={handleFile} className="hidden" />
                            <ImageIcon size={48} className="text-[#fb923c] mb-4 mx-auto" />
                            <div className="text-lg text-[var(--foreground)] mb-2 font-medium">{t('upload')}</div>
                            <div className="text-sm text-[var(--muted-text)]">{t('browse')}</div>
                        </div>

                        <div className="mb-6">
                            <div className="text-[13px] text-[var(--muted-text)] mb-2 text-left px-1">{t('paste')}</div>
                            <LiquidTextArea
                                value={svgContent} onChange={e => { setSvgContent(e.target.value); process(e.target.value); }}
                                placeholder="<svg>...</svg>"
                                className="h-[100px] font-mono text-xs"
                            />
                        </div>

                        {error && <div className="text-red-500 mb-5 text-sm">{error}</div>}

                        <div className={`mt-5 ${downloadUrl ? 'block' : 'hidden'}`}>
                            <div className="mb-3 text-[13px] text-[var(--muted-text)]">{t('preview')}</div>
                            <canvas ref={canvasRef} className="max-w-full border border-[var(--border-color)] bg-neutral-100 dark:bg-[#111] rounded-lg mx-auto" />

                            <div className="mt-6">
                                <LiquidButton
                                    onClick={() => {
                                        const a = document.createElement('a');
                                        a.href = downloadUrl;
                                        a.download = 'converted.png';
                                        a.click();
                                    }}
                                    className="px-8 py-3"
                                >
                                    <Download size={18} className="mr-2" /> {t('download')}
                                </LiquidButton>
                            </div>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
