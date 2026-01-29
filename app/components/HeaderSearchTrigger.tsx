"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HeaderSearchTrigger() {
    const t = useTranslations('Header');

    return (
        <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-cmd-palette"))}
            className="flex items-center gap-2 py-2 px-3 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-full cursor-pointer min-h-[40px] w-full md:w-auto transition-all duration-300 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:bg-[var(--card-hover-bg)] hover:-translate-y-0.5"
            aria-label={t('searchPlaceholder')}
        >
            <Search size={16} className="text-[var(--muted-text)]" aria-hidden="true" />
            <span className="text-[13px] text-[var(--muted-text)] mr-2">{t('searchPlaceholder')}</span>
            <div className="flex items-center gap-1 ml-auto md:ml-0">
                <span className="text-[10px] bg-[var(--card-hover-bg)] px-1 py-0.5 rounded text-[var(--muted-text)] font-mono border border-[var(--border-color)]">
                    ⌘K
                </span>
            </div>
        </button>
    );
}
