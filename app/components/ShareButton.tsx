"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ShareButton() {
    const t = useTranslations('ShareButton');
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href,
                });
            } catch (err) {
                // Ignore abort errors
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy", err);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] flex items-center gap-2 px-4 py-2 text-[13px]"
        >
            {copied ? <Check size={14} className="text-[#22c55e]" /> : <Share2 size={14} />}
            {copied ? t('copiedLink') : t('shareTool')}
        </button>
    );
}
