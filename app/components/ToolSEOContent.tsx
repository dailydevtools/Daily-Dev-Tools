"use client";

import { usePathname } from "next/navigation";
import { tools } from "../data/tools";
import { toolSEOContent } from "../data/tool-seo-content";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ToolSEOContent() {
    const pathname = usePathname();

    const toolId = pathname?.split("/").filter(Boolean).pop();
    const tool = tools.find((t) => t.id === toolId);
    const content = toolId ? toolSEOContent[toolId] : undefined;

    if (!tool || !content) return null;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        })),
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to use ${tool.name}`,
        step: content.howTo.map((step, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            text: step,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />

            <div className="max-w-[860px] mx-auto w-full px-6 mt-16 space-y-12 pb-4">
                {/* About */}
                <div>
                    <h2 className="text-xl font-bold font-heading text-[var(--title-color)] mb-3">
                        What is {tool.name}?
                    </h2>
                    <p className="text-[var(--muted-text)] leading-[1.75] text-[15px]">
                        {content.about}
                    </p>
                </div>

                {/* How to use */}
                <div>
                    <h2 className="text-xl font-bold font-heading text-[var(--title-color)] mb-4">
                        How to use {tool.name}
                    </h2>
                    <ol className="space-y-3">
                        {content.howTo.map((step, i) => (
                            <li key={i} className="flex gap-3 text-[15px]">
                                <span className="shrink-0 w-6 h-6 rounded-full bg-[#f973161a] border border-[#f9731633] text-[#fb923c] text-[11px] font-bold flex items-center justify-center mt-0.5">
                                    {i + 1}
                                </span>
                                <span className="text-[var(--muted-text)] leading-relaxed">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* FAQ */}
                <div>
                    <h2 className="text-xl font-bold font-heading text-[var(--title-color)] mb-4">
                        Frequently asked questions
                    </h2>
                    <div className="space-y-2">
                        {content.faq.map((item, i) => (
                            <FAQItem key={i} q={item.q} a={item.a} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-[var(--border-color)] rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--card-bg)] transition-colors duration-150"
                aria-expanded={open}
            >
                <span className="text-[14.5px] font-semibold text-[var(--title-color)]">{q}</span>
                <ChevronDown
                    size={16}
                    className={`shrink-0 text-[var(--muted-text)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>
            {open && (
                <div className="px-5 pb-4 text-[14px] text-[var(--muted-text)] leading-relaxed border-t border-[var(--border-color)] pt-3">
                    {a}
                </div>
            )}
        </div>
    );
}
