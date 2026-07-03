"use client";

import { usePathname } from "next/navigation";
import { tools } from "../data/tools";
import { Link } from "../../i18n/routing";
import ToolIcon from "./ToolIcon";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export default function RelatedTools() {
    const t = useTranslations("RelatedTools");
    const tTools = useTranslations("Tools");
    const pathname = usePathname();

    const relatedTools = useMemo(() => {
        const currentId = pathname?.split("/").filter(Boolean).pop();
        const currentTool = tools.find((t) => t.id === currentId);
        if (!currentTool) return [];

        // Same category first, then fill from other categories if needed
        const sameCategory = tools.filter(
            (t) => t.id !== currentId && t.category === currentTool.category
        );
        const others = tools.filter(
            (t) => t.id !== currentId && t.category !== currentTool.category
        );

        return [...sameCategory, ...others].slice(0, 4);
    }, [pathname]);

    if (relatedTools.length === 0) return null;

    return (
        <div className="mt-16 border-t border-[var(--border-color)] pt-10">
            <div className="mb-6">
                <h3 className="text-xl font-bold font-heading text-[var(--title-color)] mb-1">
                    {t("title")}
                </h3>
                <p className="text-sm text-[var(--muted-text)]">{t("subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {relatedTools.map((tool) => (
                    <Link
                        key={tool.id}
                        href={`/tools/${tool.id}`}
                        className="group flex items-start gap-3 p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl hover:border-[#fb923c]/40 hover:-translate-y-0.5 transition-all duration-200 no-underline"
                    >
                        <div className="shrink-0 w-9 h-9 rounded-xl bg-[#f973161a] border border-[#f9731622] flex items-center justify-center text-[#fb923c] group-hover:scale-110 transition-transform duration-200">
                            <ToolIcon name={tool.icon} size={18} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-[var(--title-color)] group-hover:text-[#fb923c] transition-colors truncate">
                                {tTools(`${tool.id}.name`, { fallback: tool.name })}
                            </p>
                            <p className="text-[11px] text-[var(--muted-text)] line-clamp-2 mt-0.5 leading-relaxed">
                                {tTools(`${tool.id}.description`, { fallback: tool.description })}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
