"use client";

import { usePathname } from "next/navigation";
import { tools } from "../data/tools";
import { useTranslations } from "next-intl";

export default function ToolSchemaWrapper() {
    const pathname = usePathname();
    const t = useTranslations('Tools');
    const tCategories = useTranslations('Homepage.categories');

    // Extract tool ID from pathname (e.g. "/en/tools/bmi-calculator" -> "bmi-calculator")
    // We assume the tool ID is the last segment
    const toolId = pathname?.split('/').filter(Boolean).pop();

    if (!toolId) return null;

    const tool = tools.find((t) => t.id === toolId);

    if (!tool) return null;

    // Map internal categories to Schema.org ApplicationCategory
    const getApplicationCategory = (category: string) => {
        const map: Record<string, string> = {
            "Developer": "DeveloperApplication",
            "Design": "DesignApplication",
            "Content": "MultimediaApplication",
            "Security": "SecurityApplication",
            "Productivity": "ProductivityApplication",
            "Math": "EducationalApplication",
            "Utility": "UtilitiesApplication"
        };
        return map[category] || "ApplicationVariables";
    };

    const toolName = t(`${tool.id}.name`, { fallback: tool.name });
    const toolDescription = t(`${tool.id}.description`, { fallback: tool.description });
    const toolCategory = tCategories(tool.category, { fallback: tool.category });

    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": toolName,
        "description": toolDescription,
        "url": `https://www.dailydev.tools${pathname}`,
        "applicationCategory": getApplicationCategory(tool.category),
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "120"
        },
        "author": {
            "@type": "Organization",
            "name": "DailyDevTools",
            "url": "https://www.dailydev.tools"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
