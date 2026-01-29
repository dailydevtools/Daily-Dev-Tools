"use client";

import { useState } from "react";
import { Image as ImageIcon, FileText } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidTextArea } from "../../../components/ui/LiquidInput";

export default function ImageBase64Client() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [base64, setBase64] = useState("");
    const [preview, setPreview] = useState("");
    const [mode, setMode] = useState<"toBase64" | "toImage">("toBase64");

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const res = ev.target?.result as string;
            setBase64(res);
            setPreview(res);
        };
        reader.readAsDataURL(file);
    };

    const handleBase64Input = (val: string) => {
        setBase64(val);
        if (val.startsWith("data:image")) {
            setPreview(val);
        } else {
            // Try to guess prefix if missing
            // simplified
            setPreview(`data:image/png;base64,${val}`);
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title={tTools('image-base64.name')}
                        description={tTools('image-base64.description')}
                        icon={<ToolIcon name="Image" size={32} />}
                    />

                    <div className="flex justify-center mb-10">
                        <div className="dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200 dark:border-white/5 flex gap-1">
                            <button
                                onClick={() => { setMode("toBase64"); setBase64(""); }}
                                className={`py-2 px-6 rounded-lg text-sm font-medium transition-all ${mode === 'toBase64' ? 'bg-white dark:bg-neutral-700 shadow-sm text-orange-500' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                            >
                                {t('ImageBase64.convertToBase64')}
                            </button>
                            <button
                                onClick={() => { setMode("toImage"); setBase64(""); }}
                                className={`py-2 px-6 rounded-lg text-sm font-medium transition-all ${mode === 'toImage' ? 'bg-white dark:bg-neutral-700 shadow-sm text-orange-500' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                            >
                                {t('ImageBase64.convertToImage')}
                            </button>
                        </div>
                    </div>

                    <LiquidCard className="p-10">
                        {mode === 'toBase64' ? (
                            <div>
                                <div className="border-2 border-dashed border-[var(--border-color)] bg-neutral-50/50 dark:bg-white/5 rounded-2xl p-10 text-center mb-6 cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group" onClick={() => document.getElementById('fileInput')?.click()}>
                                    <input id="fileInput" type="file" accept="image/*" onChange={handleFile} className="hidden" />
                                    <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <ImageIcon size={32} />
                                    </div>
                                    <div className="text-lg font-semibold text-[var(--foreground)] mb-2">{t('ImageBase64.uploadImage')}</div>
                                    <div className="text-sm text-[var(--muted-text)]">JPG, PNG, GIF, SVG, WebP</div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('ImageBase64.base64String')}</label>
                                <LiquidTextArea
                                    value={base64} onChange={e => handleBase64Input(e.target.value)}
                                    placeholder={t('ImageBase64.placeholder')}
                                    className="h-[150px]"
                                />
                            </div>
                        )}

                        {base64 && (
                            <div className="mt-8 border-t border-[var(--border-color)] pt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                                    <div className="flex flex-col gap-4">
                                        <div className="text-sm font-medium text-[var(--muted-text)]">{t('GridGenerator.preview')}</div>
                                        <div className="rounded-xl overflow-hidden border border-[var(--border-color)] bg-[repeating-conic-gradient(#f5f5f5_0%_25%,_#ffffff_0%_50%)_50%_/_20px_20px] dark:bg-[repeating-conic-gradient(#111_0%_25%,_#222_0%_50%)_50%_/_20px_20px]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={preview} alt="Preview" className="w-full h-auto block" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col h-full">
                                        <div className="text-sm font-medium text-[var(--muted-text)] mb-2">{t('ImageBase64.base64String')}</div>
                                        <div className="flex-1 relative mb-4">
                                            <LiquidTextArea
                                                readOnly
                                                value={base64}
                                                className="h-full min-h-[200px] font-mono text-xs text-orange-600 dark:text-orange-400"
                                            />
                                        </div>
                                        <div className="text-right">
                                            <LiquidButton
                                                onClick={() => navigator.clipboard.writeText(base64)}
                                                className="gap-2"
                                            >
                                                {t('ImageBase64.copy')} Base64
                                            </LiquidButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
