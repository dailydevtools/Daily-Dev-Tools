"use client";

import { useState } from "react";
import { Download, Search, Image as ImageIcon } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

export default function YTThumbnailClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [url, setUrl] = useState("");
    const [videoId, setVideoId] = useState("");
    const [error, setError] = useState("");

    const extractId = () => {
        try {
            if (!url) { setError("Please enter a URL"); return; }
            // Regex for various YT formats
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            if (match && match[2].length === 11) {
                setVideoId(match[2]);
                setError("");
            } else {
                setVideoId("");
                setError("Invalid YouTube URL");
            }
        } catch (e) {
            setError("Error parsing URL");
        }
    };

    const ThumbCard = ({ label, quality }: { label: string, quality: string }) => {
        const src = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;

        return (
            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-4 overflow-hidden">
                <div className="mb-3 flex justify-between items-center">
                    <span className="font-semibold text-white">{label}</span>
                    <a href={src} download={`thumbnail_${quality}.jpg`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-1.5 px-3 text-[13px] flex items-center">
                        <Download size={14} className="mr-1.5" /> {t('YtThumbnail.download')}
                    </a>
                </div>
                <div className="rounded-lg overflow-hidden bg-black aspect-video flex items-center justify-center">
                    <img src={src} alt={label} className="w-full h-auto" />
                </div>
            </div>
        );
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title={tTools('yt-thumbnail.name')}
                        description={tTools('yt-thumbnail.description')}
                        icon={<ToolIcon name="Youtube" size={32} />}
                    />

                    <div className="flex gap-3 mb-10">
                        <div className="glass flex-1 px-5 flex items-center gap-3 rounded-xl">
                            <Search className="text-[#9ca3af]" size={20} />
                            <input
                                type="text"
                                placeholder={t('YtThumbnail.inputPlaceholder')}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && extractId()}
                                className="w-full h-14 bg-transparent border-none outline-none text-white text-base"
                            />
                        </div>
                        <button onClick={extractId} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] px-8 rounded-xl font-medium">
                            {t('YtThumbnail.getThumbnail')}
                        </button>
                    </div>

                    {error && (
                        <div className="text-center text-[#ef4444] mb-5">{error}</div>
                    )}

                    {!videoId && !error && (
                        <div className="text-center text-[#6b7280] p-10">
                            <ImageIcon size={48} className="opacity-20 mb-4 mx-auto" />
                            <p>{tTools('yt-thumbnail.description')}</p>
                        </div>
                    )}

                    {videoId && (
                        <div className="flex flex-col gap-6">
                            <ThumbCard label="HD (1280x720)" quality="maxresdefault" />
                            <ThumbCard label="SD (640x480)" quality="sddefault" />
                            <ThumbCard label="HQ (480x360)" quality="hqdefault" />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
