"use client";

import { useState } from "react";
import { Image as ImageIcon, FileText, Copy, Check } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import LiquidTabs from "../../../components/ui/LiquidTabs";

export default function ImageBase64Client() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [base64, setBase64] = useState("");
    const [preview, setPreview] = useState("");
    const [mode, setMode] = useState<"toBase64" | "toImage">("toBase64");
    const [copied, setCopied] = useState(false);

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(base64);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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

                    <LiquidTabs
                        tabs={['toBase64', 'toImage']}
                        activeTab={mode}
                        onChange={(val) => { setMode(val as any); setBase64(""); }}
                        labels={{
                            toBase64: t('ImageBase64.convertToBase64'),
                            toImage: t('ImageBase64.convertToImage')
                        }}
                    />

                    <div className="mt-8">
                        {mode === 'toBase64' ? (
                            <LiquidCard className="p-10 mb-8 text-center flex flex-col items-center justify-center">
                                <div className="border-2 border-dashed border-[var(--border-color)] bg-neutral-50/50 dark:bg-white/5 rounded-2xl p-10 w-full mb-2 cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group" onClick={() => document.getElementById('fileInput')?.click()}>
                                    <input id="fileInput" type="file" accept="image/*" onChange={handleFile} className="hidden" />
                                    <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <ImageIcon size={32} />
                                    </div>
                                    <div className="text-lg font-semibold text-[var(--foreground)] mb-2">{t('ImageBase64.uploadImage')}</div>
                                    <div className="text-sm text-[var(--muted-text)]">JPG, PNG, GIF, SVG, WebP</div>
                                </div>
                            </LiquidCard>
                        ) : (
                            <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all mb-8">
                                <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5 opacity-60">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('ImageBase64.base64String')}</span>
                                    </div>
                                </div>
                                <textarea
                                    value={base64}
                                    onChange={e => handleBase64Input(e.target.value)}
                                    placeholder={t('ImageBase64.placeholder')}
                                    className="flex-1 min-h-[150px] w-full bg-transparent border-none p-5 font-mono text-[13px] text-[var(--foreground)] resize-none outline-none placeholder:text-[var(--muted-text)] leading-relaxed"
                                    spellCheck={false}
                                />
                            </LiquidCard>
                        )}

                        {base64 && (
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <LiquidCard className="p-0 overflow-hidden flex flex-col">
                                    <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                        <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">{t('GridGenerator.preview')}</span>
                                    </div>
                                    <div className="p-6 flex items-center justify-center bg-[repeating-conic-gradient(#f5f5f5_0%_25%,_#ffffff_0%_50%)_50%_/_20px_20px] dark:bg-[repeating-conic-gradient(#111_0%_25%,_#222_0%_50%)_50%_/_20px_20px] min-h-[300px]">
                                        <img src={preview} alt="Preview" className="max-w-full max-h-[400px] object-contain shadow-lg rounded-lg" />
                                    </div>
                                </LiquidCard>

                                <LiquidCard className="p-0 overflow-hidden flex flex-col relative h-[450px]">
                                    <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-neutral-100/50 dark:bg-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-1.5 opacity-60">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                            </div>
                                            <span className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wider">Base64 Output</span>
                                        </div>
                                        <button
                                            onClick={copyToClipboard}
                                            className={`p-1.5 rounded-lg transition-colors bg-transparent border-none cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 ${copied ? 'text-green-500' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                                            title={t('ImageBase64.copy')}
                                        >
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                    <textarea
                                        readOnly
                                        value={base64}
                                        className="flex-1 w-full bg-transparent border-none p-5 font-mono text-xs text-orange-600 dark:text-orange-400 resize-none outline-none leading-relaxed placeholder:text-[var(--muted-text)]"
                                        spellCheck={false}
                                    />
                                </LiquidCard>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
