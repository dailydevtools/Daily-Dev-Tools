"use client";

import { usePathname } from "next/navigation";
import { tools } from "../data/tools";
import Link from "next/link";
import ToolIcon from "./ToolIcon";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function RelatedTools() {
    const t = useTranslations('RelatedTools');
    const pathname = usePathname();
    const [randomTools, setRandomTools] = useState<typeof tools>([]);

    useEffect(() => {
        const currentId = pathname?.split('/').pop();
        const others = tools.filter(t => t.id !== currentId);
        // Fisher-Yates shuffle would be better, but simple sort is enough for small list
        const shuffled = [...others].sort(() => 0.5 - Math.random());
        setRandomTools(shuffled.slice(0, 3));
    }, [pathname]);

    if (randomTools.length === 0) return null;

    return (
        <div className="mt-20 border-t border-[var(--border-color)] py-10">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-heading text-[var(--title-color)] mb-2">{t('title')}</h3>
                <p className="text-[var(--muted-text)]">{t('subtitle')}</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
                {randomTools.map(tool => (
                    <Link key={tool.id} href={`/tools/${tool.id}`} className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 block p-6 no-underline bg-[var(--card-bg)]">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="text-[#fb923c]">
                                <ToolIcon name={tool.icon} size={24} />
                            </div>
                            <h4 className="text-base font-semibold font-heading text-[var(--title-color)]">{tool.name}</h4>
                        </div>
                        <p className="text-[13px] text-[var(--muted-text)] mb-4 leading-relaxed">{tool.description}</p>
                        <div className="flex items-center text-[#fb923c] text-[13px] font-medium">
                            <span>{t('openTool')}</span>
                            <ArrowRight size={14} className="ml-1.5" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
