"use client";

import { useState } from "react";
import { Upload, FileImage, Download, RefreshCw } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

interface ConvertedFile {
    originalName: string;
    blob: Blob;
    url: string;
    format: string;
    size: number;
}

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidSelect } from "../../../components/ui/LiquidInput";

export default function ImageConverterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [files, setFiles] = useState<FileList | null>(null);
    const [format, setFormat] = useState("image/webp");
    const [quality, setQuality] = useState(0.8);
    const [results, setResults] = useState<ConvertedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(e.target.files);
            setResults([]); // Clear previous
        }
    };

    const convert = async () => {
        if (!files) return;
        setIsProcessing(true);
        setResults([]);
        const newResults: ConvertedFile[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                const blob = await processFile(file, format, quality);
                newResults.push({
                    originalName: file.name,
                    blob,
                    url: URL.createObjectURL(blob),
                    format: format.split('/')[1],
                    size: blob.size
                });
            } catch (e) {
                console.error("Failed to convert", file.name, e);
            }
        }
        setResults(newResults);
        setIsProcessing(false);
    };

    const processFile = (file: File, type: string, q: number): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) return reject("No context");

                // Handle transparency for JPEG (white background)
                if (type === "image/jpeg") {
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                ctx.drawImage(img, 0, 0);
                canvas.toBlob(
                    (blob) => {
                        if (blob) resolve(blob);
                        else reject("Conversion failed");
                    },
                    type,
                    q
                );
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title={tTools('image-converter.name')}
                        description={tTools('image-converter.description')}
                        icon={<RefreshCw size={28} className="text-[#fb923c]" />}
                    />

                    <div className="border-2 border-dashed border-[var(--border-color)] bg-neutral-50/50 dark:bg-white/5 rounded-3xl p-10 text-center mb-8 cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group" onClick={() => document.getElementById('file-upload')?.click()}>
                        <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Upload size={32} />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <div className="text-lg font-semibold text-[var(--foreground)] mb-2">{t('ImageConverter.selectImage')}</div>
                        <p className="text-[var(--muted-text)] text-sm">
                            Supports PNG, JPG, WEBP, AVIF. Processed locally.
                        </p>
                    </div>

                    {files && files.length > 0 && (
                        <LiquidCard className="p-6">
                            <div className="flex flex-wrap gap-6 mb-8 items-end border-b border-[var(--border-color)] pb-6">
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block mb-2 text-sm font-medium text-[var(--muted-text)]">{t('ImageConverter.format')}</label>
                                    <LiquidSelect
                                        value={format}
                                        onChange={e => setFormat(e.target.value)}
                                    >
                                        <option value="image/webp">WebP</option>
                                        <option value="image/jpeg">JPEG</option>
                                        <option value="image/png">PNG</option>
                                    </LiquidSelect>
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block mb-2 text-sm font-medium text-[var(--muted-text)]">{t('ImageConverter.quality')} ({Math.round(quality * 100)}%)</label>
                                    <input
                                        type="range" min="0.1" max="1" step="0.1"
                                        value={quality} onChange={e => setQuality(Number(e.target.value))}
                                        className="w-full accent-orange-500 cursor-pointer h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none my-3"
                                    />
                                </div>
                                <div className="min-w-[150px]">
                                    <LiquidButton
                                        onClick={convert}
                                        disabled={isProcessing}
                                        className="w-full justify-center"
                                    >
                                        {isProcessing ? <RefreshCw className="animate-spin mr-2" size={18} /> : null}
                                        {t('ImageConverter.convert')}
                                    </LiquidButton>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {results.length > 0 ? (
                                    results.map((res, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-white/5 rounded-xl border border-transparent hover:border-orange-500/30 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white dark:bg-black/40 rounded-lg flex items-center justify-center border border-[var(--border-color)]">
                                                    <FileImage size={24} className="text-orange-500" />
                                                </div>
                                                <div>
                                                    <div className="text-[var(--foreground)] font-medium text-sm">{res.originalName}</div>
                                                    <div className="text-[var(--muted-text)] text-xs mt-0.5 font-mono">
                                                        {formatSize(res.size)} • {res.format.toUpperCase()}
                                                    </div>
                                                </div>
                                            </div>
                                            <a
                                                href={res.url}
                                                download={`converted_${i}.${res.format}`}
                                                className="inline-flex"
                                            >
                                                <LiquidButton variant="secondary" className="text-xs py-2 px-4 h-auto">
                                                    <Download size={14} className="mr-2" /> {t('ImageConverter.download')}
                                                </LiquidButton>
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-[var(--muted-text)] text-sm text-center py-8 bg-neutral-50/50 dark:bg-white/5 rounded-xl border border-dashed border-[var(--border-color)]">
                                        {files.length} file(s) selected. Ready to convert.
                                    </div>
                                )}
                            </div>
                        </LiquidCard>
                    )}

                </div>
            </div>
        </main>
    );
}
