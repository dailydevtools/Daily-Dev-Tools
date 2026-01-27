"use client";

import { ChevronRight, Home } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { tools } from "../data/tools";
import { useTranslations } from "next-intl";

export default function Breadcrumb() {
    const t = useTranslations('Breadcrumb');
    const pathname = usePathname();
    // pathname from next-intl already excludes locale, e.g. "/tools/age-calculator"
    const parts = pathname.split('/').filter(Boolean);

    // If we're on a tool page ie. parts=['tools', 'slug']
    const isToolPage = parts[0] === 'tools' && parts.length === 2;

    // Find tool name if on a tool page
    const toolName = isToolPage
        ? tools.find((t: any) => t.id === parts[1])?.name || parts[1]
        : null;

    if (!isToolPage) return null;

    return (
        <div className="flex items-center gap-2 text-sm text-[var(--muted-text)] mb-6 flex-wrap">
            <Link
                href="/"
                className="flex items-center gap-1.5 text-[var(--muted-text)] no-underline transition-colors duration-200 hover:text-primary"
            >
                <Home size={14} />
                <span>{t('home')}</span>
            </Link>

            <ChevronRight size={14} className="opacity-50" />

            <Link
                href="/#tools"
                className="text-[var(--muted-text)] no-underline transition-colors duration-200 hover:text-primary"
            >
                {t('tools')}
            </Link>

            <ChevronRight size={14} className="opacity-50" />

            <span className="text-[var(--title-color)] font-medium font-heading">
                {toolName}
            </span>
        </div>
    );
}
