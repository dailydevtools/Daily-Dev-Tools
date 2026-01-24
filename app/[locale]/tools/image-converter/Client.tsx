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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center mb-6">
                        <div className="mb-6">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-4 px-8 text-base inline-flex items-center gap-2 cursor-pointer"
                            >
                                <Upload size={20} />
                                {t('ImageConverter.selectImage')}
                            </label>
                            <p className="mt-3 text-[#9ca3af] text-[13px]">
                                Supports PNG, JPG, WEBP, AVIF. Processed locally.
                            </p>
                        </div>

                        {files && files.length > 0 && (
                            <div className="p-6 bg-white/5 rounded-xl text-left">
                                <div className="flex flex-wrap gap-6 mb-6 items-center">
                                    <div>
                                        <label className="block mb-2 text-[13px] text-[#9ca3af]">{t('ImageConverter.format')}</label>
                                        <select
                                            value={format}
                                            onChange={e => setFormat(e.target.value)}
                                            className="input-field p-2.5 rounded-lg min-w-[120px] bg-[#111] text-white border border-[#333]"
                                        >
                                            <option value="image/webp">WebP</option>
                                            <option value="image/jpeg">JPEG</option>
                                            <option value="image/png">PNG</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-[13px] text-[#9ca3af]">{t('ImageConverter.quality')} ({Math.round(quality * 100)}%)</label>
                                        <input
                                            type="range" min="0.1" max="1" step="0.1"
                                            value={quality} onChange={e => setQuality(Number(e.target.value))}
                                            className="w-[150px] accent-[#fb923c]"
                                        />
                                    </div>
                                    <div className="flex-1 text-right">
                                        <button
                                            onClick={convert}
                                            disabled={isProcessing}
                                            className={`inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-2.5 px-6 ${isProcessing ? 'opacity-70' : ''}`}
                                        >
                                            {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : t('ImageConverter.convert')}
                                        </button>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    {results.length > 0 ? (
                                        <div className="grid gap-3">
                                            {results.map((res, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-[#111] rounded flex items-center justify-center">
                                                            <FileImage size={20} color="#fb923c" />
                                                        </div>
                                                        <div>
                                                            <div className="text-white text-sm">{res.originalName}</div>
                                                            <div className="text-[#9ca3af] text-xs">
                                                                {formatSize(res.size)} • {res.format.toUpperCase()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={res.url}
                                                        download={`converted_${i}.${res.format}`}
                                                        className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-2 px-4 flex items-center gap-1.5 text-[13px]"
                                                    >
                                                        <Download size={14} /> {t('ImageConverter.download')}
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-[#6b7280] text-sm text-center">
                                            {files.length} file(s) selected. Ready to convert.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
