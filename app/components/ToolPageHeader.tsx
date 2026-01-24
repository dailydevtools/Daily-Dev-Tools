
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "../../i18n/routing";
import { useTranslations } from "next-intl";

interface ToolPageHeaderProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export default function ToolPageHeader({ title, description, icon }: ToolPageHeaderProps) {
    const router = useRouter();
    const t = useTranslations('ToolPage');
    
    const handleBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push('/#tools');
        }
    };

    return (
        <div className="mb-10">
            <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-[var(--muted-text)] hover:text-[var(--title-color)] transition-colors duration-200 mb-6 no-underline group bg-transparent border-none cursor-pointer"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">{t('common.back', { fallback: 'Back' })}</span>
            </button>
            <div className="text-center">
                {icon && (
                    <div className="bg-[#f973161a] text-[#fb923c] flex items-center justify-center rounded-xl border border-[#f9731633] transition-transform duration-300 hover:scale-110 w-16 h-16 mx-auto mb-6">
                        {icon}
                    </div>
                )}
                <h1 className="text-4xl font-extrabold text-[var(--title-color)] mb-3">{title}</h1>
                <p className="text-[var(--muted-text)] text-base">{description}</p>
            </div>
        </div>
    );
}
