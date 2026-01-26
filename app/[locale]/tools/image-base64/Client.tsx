"use client";

import { useState } from "react";
import { Image as ImageIcon, FileText } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

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

                    <div className="flex justify-center mb-8">
                        <div className="bg-white/5 p-1 rounded-xl flex gap-1">
                            <button
                                onClick={() => { setMode("toBase64"); setBase64(""); }}
                                className={`py-2 px-6 rounded-lg border-none cursor-pointer font-medium transition-colors ${mode === 'toBase64' ? 'bg-[#fb923c] text-black' : 'bg-transparent text-[#9ca3af]'}`}
                            >
                                {t('ImageBase64.convertToBase64')}
                            </button>
                            <button
                                onClick={() => { setMode("toImage"); setBase64(""); }}
                                className={`py-2 px-6 rounded-lg border-none cursor-pointer font-medium transition-colors ${mode === 'toImage' ? 'bg-[#fb923c] text-black' : 'bg-transparent text-[#9ca3af]'}`}
                            >
                                {t('ImageBase64.convertToImage')}
                            </button>
                        </div>
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        {mode === 'toBase64' ? (
                            <div>
                                <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center mb-6 cursor-pointer hover:border-[#fb923c]/50 transition-colors" onClick={() => document.getElementById('fileInput')?.click()}>
                                    <input id="fileInput" type="file" accept="image/*" onChange={handleFile} className="hidden" />
                                    <ImageIcon size={48} color="#fb923c" className="mx-auto mb-4" />
                                    <div className="text-lg text-white mb-2">{t('ImageBase64.uploadImage')}</div>
                                    <div className="text-sm text-[#9ca3af]">JPG, PNG, GIF, SVG, WebP</div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('ImageBase64.base64String')}</label>
                                <textarea
                                    value={base64} onChange={e => handleBase64Input(e.target.value)}
                                    placeholder={t('ImageBase64.placeholder')}
                                    className="w-full h-[150px] bg-black/30 border border-white/10 rounded-xl p-4 text-white resize-y"
                                />
                            </div>
                        )}

                        {base64 && (
                            <div className="mt-6 border-t border-white/10 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                                    <div className="flex flex-col gap-3">
                                        <div className="text-[13px] text-[#9ca3af]">{t('GridGenerator.preview')}</div>
                                        <div className="rounded-xl overflow-hidden border border-white/10 bg-[repeating-conic-gradient(#111_0%_25%,_#222_0%_50%)_50%_/_20px_20px]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={preview} alt="Preview" className="w-full block" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[13px] text-[#9ca3af] mb-2">{t('ImageBase64.base64String')}</div>
                                        <textarea
                                            readOnly
                                            value={base64}
                                            className="w-full h-[200px] bg-black/30 border border-white/10 rounded-xl p-4 text-[#fb923c] resize-none"
                                        />
                                        <div className="mt-3 text-right">
                                            <button onClick={() => navigator.clipboard.writeText(base64)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]">{t('ImageBase64.copy')} Base64</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
