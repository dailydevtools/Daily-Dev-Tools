"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HeaderSearchTrigger() {
    const t = useTranslations('Header');

    return (
        <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-cmd-palette"))}
            className="flex items-center gap-2 py-1.5 px-3 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-lg cursor-pointer h-9 w-full md:w-auto transition-all duration-300 hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-0.5"
        >
            <Search size={14} className="text-[var(--muted-text)]" />
            <span className="text-[13px] text-[var(--muted-text)] mr-2">{t('searchPlaceholder')}</span>
            <div className="flex items-center gap-1">
                <span className="text-[10px] bg-[var(--card-hover-bg)] px-1 py-0.5 rounded text-[var(--muted-text)] font-mono border border-[var(--border-color)]">
                    ⌘K
                </span>
            </div>
        </button>
    );
}
