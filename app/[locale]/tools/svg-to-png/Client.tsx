"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Download } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center">
                        <div
                            className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center mb-6 cursor-pointer hover:bg-white/5 transition-colors"
                            onClick={() => document.getElementById('svgInput')?.click()}
                        >
                            <input id="svgInput" type="file" accept=".svg" onChange={handleFile} className="hidden" />
                            <ImageIcon size={48} className="text-[#fb923c] mb-4 mx-auto" />
                            <div className="text-lg text-white mb-2">{t('upload')}</div>
                            <div className="text-sm text-[#9ca3af]">{t('browse')}</div>
                        </div>

                        <div className="mb-6">
                            <div className="text-[13px] text-[#9ca3af] mb-2 text-left px-1">{t('paste')}</div>
                            <textarea
                                value={svgContent} onChange={e => { setSvgContent(e.target.value); process(e.target.value); }}
                                placeholder="<svg>...</svg>"
                                className="w-full h-[100px] p-3 rounded-xl bg-black/30 border border-white/10 text-white font-mono text-xs resize-y"
                            />
                        </div>

                        {error && <div className="text-[#ef4444] mb-5 text-sm">{error}</div>}

                        <div className={`mt-5 ${downloadUrl ? 'block' : 'hidden'}`}>
                            <div className="mb-3 text-[13px] text-[#9ca3af]">{t('preview')}</div>
                            <canvas ref={canvasRef} className="max-w-full border border-white/10 bg-[repeating-conic-gradient(#111_0%_25%,_#222_0%_50%)_50%_/_20px_20px] rounded-lg" />

                            <div className="mt-6">
                                <a href={downloadUrl} download="converted.png" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-8 inline-flex items-center gap-2 no-underline">
                                    <Download size={18} /> {t('download')}
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
