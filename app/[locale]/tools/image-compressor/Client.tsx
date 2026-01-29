"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, RefreshCw } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

export default function ImageCompressorClient() {
    const t = useTranslations('ImageCompressor');
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
    const [quality, setQuality] = useState(0.8);
    const [isProcessing, setIsProcessing] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        setOriginalFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewUrl(event.target?.result as string);
            compressImage(event.target?.result as string, quality, file.type);
        };
        reader.readAsDataURL(file);
    };

    const compressImage = (src: string, q: number, type: string) => {
        setIsProcessing(true);
        const img = new Image();
        img.src = src;
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.drawImage(img, 0, 0);

            // Default to jpeg if png (png doesn't support quality param in some browsers, but webp does)
            // Actually standard: image/jpeg or image/webp support quality. image/png does not.
            const outputType = type === 'image/png' ? 'image/jpeg' : type;

            canvas.toBlob(
                (blob) => {
                    setCompressedBlob(blob);
                    setIsProcessing(false);
                },
                outputType,
                q
            );
        };
    };

    // Re-compress when quality changes
    useEffect(() => {
        if (originalFile && previewUrl) {
            const timeout = setTimeout(() => {
                compressImage(previewUrl, quality, originalFile.type);
            }, 300); // Debounce
            return () => clearTimeout(timeout);
        }
    }, [quality]);

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <main className="relative min-h-screen">
            {/* Hidden Canvas */}
            <canvas ref={canvasRef} className="hidden" />

            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title="Image Compressor"
                        description="Compress images locally without uploading to server."
                        icon={<ImageIcon size={28} className="text-[#fb923c]" />}
                    />

                    {!originalFile ? (
                        <div className="border-2 border-dashed border-[var(--border-color)] bg-neutral-50/50 dark:bg-white/5 rounded-3xl p-20 text-center cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group flex flex-col items-center gap-6" onClick={() => document.getElementById('file-upload')?.click()}>
                            <div className="w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                                <ImageIcon size={48} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">{t('uploadTitle')}</h2>
                                <p className="text-[var(--muted-text)] text-lg">{t('uploadDesc')}</p>
                            </div>
                            <div className="mt-4">
                                <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-8 py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 pointer-events-none">
                                    <Upload size={20} />
                                    {t('selectImage')}
                                </button>
                                <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            </div>
                        </div>
                    ) : (
                        <LiquidCard className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">

                                {/* Preview */}
                                <div className="flex flex-col gap-4">
                                    <div className="rounded-2xl overflow-hidden bg-[repeating-conic-gradient(#f5f5f5_0%_25%,_#ffffff_0%_50%)_50%_/_20px_20px] dark:bg-[repeating-conic-gradient(#111_0%_25%,_#222_0%_50%)_50%_/_20px_20px] border border-[var(--border-color)] flex items-center justify-center min-h-[400px]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={previewUrl} alt="Preview" className="max-w-full max-h-[600px] object-contain" />
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex flex-col gap-6">
                                    <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                                        <RefreshCw size={20} className="text-orange-500" />
                                        {t('settings')}
                                    </h2>

                                    <div>
                                        <div className="flex justify-between mb-3">
                                            <label className="text-sm font-medium text-[var(--muted-text)]">{t('quality')}</label>
                                            <span className="text-sm font-bold text-orange-500">{Math.round(quality * 100)}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.1"
                                            max="1.0"
                                            step="0.05"
                                            value={quality}
                                            onChange={(e) => setQuality(Number(e.target.value))}
                                            className="w-full accent-orange-500 cursor-pointer h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none"
                                        />
                                    </div>

                                    <div className="bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 rounded-xl p-5">
                                        <div className="flex justify-between mb-3 pb-3 border-b border-neutral-200 dark:border-white/5">
                                            <span className="text-sm text-[var(--muted-text)]">{t('originalSize')}</span>
                                            <span className="text-sm font-medium text-[var(--foreground)]">{formatSize(originalFile.size)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-[var(--muted-text)]">{t('compressedSize')}</span>
                                            <div className="text-right">
                                                <div className="text-green-500 font-bold text-lg">
                                                    {compressedBlob ? formatSize(compressedBlob.size) : '...'}
                                                </div>
                                                {compressedBlob && (
                                                    <div className="text-xs text-[var(--muted-text)]">
                                                        {t('saving')} {Math.round((1 - compressedBlob.size / originalFile.size) * 100)}%
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 mt-auto">
                                        {compressedBlob && (
                                            <a
                                                href={URL.createObjectURL(compressedBlob)}
                                                download={`compressed-${originalFile.name}`}
                                                className="w-full"
                                            >
                                                <LiquidButton className="w-full justify-center py-4">
                                                    <Download size={18} className="mr-2" /> {t('download')}
                                                </LiquidButton>
                                            </a>
                                        )}
                                        <LiquidButton
                                            variant="secondary"
                                            onClick={() => { setOriginalFile(null); setCompressedBlob(null); }}
                                            className="w-full justify-center"
                                        >
                                            {t('selectImage')}
                                        </LiquidButton>
                                    </div>
                                </div>
                            </div>
                        </LiquidCard>
                    )}
                </div>
            </div>
        </main>
    );
}
