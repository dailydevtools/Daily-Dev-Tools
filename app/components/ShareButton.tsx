"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LiquidButton } from "./ui/LiquidButton";

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
        <LiquidButton
            variant="secondary"
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-1.5 h-auto text-xs rounded-lg mb-6"
        >
            {copied ? <Check size={12} className="text-[#22c55e]" /> : <Share2 size={12} />}
            {copied ? t('copiedLink') : t('shareTool')}
        </LiquidButton>
    );
}
