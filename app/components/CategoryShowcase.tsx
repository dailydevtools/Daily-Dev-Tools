"use client";

import React from "react";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";
import { ToolCategory } from "../data/tools";
import { motion, type Variants } from "framer-motion";
import { Code2, Palette, FileText, Shield, Timer, Calculator, Wrench, Star } from "lucide-react";
import { useEffect, useState } from "react";

// Map categories to icons
const categoryIcons: Record<string, React.ElementType> = {
    "Favorites": Star,
    "Developer": Code2,
    "Design": Palette,
    "Content": FileText,
    "Security": Shield,
    "Productivity": Timer,
    "Math": Calculator,
    "Utility": Wrench
};

// Per-category accent colors for a richer visual identity
const categoryAccents: Record<string, { bg: string; border: string; iconBg: string; iconColor: string; label: string }> = {
    "Favorites": {
        bg: "from-amber-500/8 to-transparent",
        border: "hover:border-amber-400/40",
        iconBg: "bg-amber-500/10 border-amber-400/20",
        iconColor: "text-amber-400",
        label: "text-amber-400",
    },
    "Developer": {
        bg: "from-blue-500/8 to-transparent",
        border: "hover:border-blue-400/40",
        iconBg: "bg-blue-500/10 border-blue-400/20",
        iconColor: "text-blue-400",
        label: "text-blue-400",
    },
    "Design": {
        bg: "from-pink-500/8 to-transparent",
        border: "hover:border-pink-400/40",
        iconBg: "bg-pink-500/10 border-pink-400/20",
        iconColor: "text-pink-400",
        label: "text-pink-400",
    },
    "Content": {
        bg: "from-violet-500/8 to-transparent",
        border: "hover:border-violet-400/40",
        iconBg: "bg-violet-500/10 border-violet-400/20",
        iconColor: "text-violet-400",
        label: "text-violet-400",
    },
    "Security": {
        bg: "from-emerald-500/8 to-transparent",
        border: "hover:border-emerald-400/40",
        iconBg: "bg-emerald-500/10 border-emerald-400/20",
        iconColor: "text-emerald-400",
        label: "text-emerald-400",
    },
    "Productivity": {
        bg: "from-cyan-500/8 to-transparent",
        border: "hover:border-cyan-400/40",
        iconBg: "bg-cyan-500/10 border-cyan-400/20",
        iconColor: "text-cyan-400",
        label: "text-cyan-400",
    },
    "Math": {
        bg: "from-orange-500/8 to-transparent",
        border: "hover:border-orange-400/40",
        iconBg: "bg-orange-500/10 border-orange-400/20",
        iconColor: "text-orange-400",
        label: "text-orange-400",
    },
    "Utility": {
        bg: "from-slate-500/8 to-transparent",
        border: "hover:border-slate-400/40",
        iconBg: "bg-slate-500/10 border-slate-400/20",
        iconColor: "text-slate-400",
        label: "text-slate-400",
    },
};

const defaultAccent = categoryAccents["Utility"];

// Define categories with counts
type CategoryItem = {
    id: ToolCategory | "Favorites";
    count: number;
};

const staticCategories: CategoryItem[] = [
    { id: "Developer", count: 28 },
    { id: "Design", count: 14 },
    { id: "Content", count: 12 },
    { id: "Security", count: 8 },
    { id: "Productivity", count: 1 },
    { id: "Math", count: 14 },
    { id: "Utility", count: 21 }
];

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } }
};

export default function CategoryShowcase() {
    const t = useTranslations('Homepage');
    const [favCount, setFavCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            const saved = localStorage.getItem("favorites");
            setFavCount(saved ? JSON.parse(saved).length : 0);
        };

        updateCount();
        window.addEventListener("storage", updateCount);
        // Custom event for same-window updates
        window.addEventListener("favorites-updated", updateCount);

        return () => {
            window.removeEventListener("storage", updateCount);
            window.removeEventListener("favorites-updated", updateCount);
        };
    }, []);

    const categories: CategoryItem[] = [
        { id: "Favorites", count: favCount },
        ...staticCategories
    ];

    return (
        <section className="relative z-10 py-20 px-6">
            <div className="w-full max-w-[1100px] mx-auto">
                <div className="mb-12">
                    <p className="text-[13px] font-semibold text-[#fb923c] uppercase tracking-widest mb-3">
                        Browse by category
                    </p>
                    <h2 className="text-[clamp(26px,4vw,40px)] font-bold font-heading text-[var(--title-color)] leading-tight">
                        Find exactly what you need.
                    </h2>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                >
                    {categories.map((cat) => {
                        const Icon = categoryIcons[cat.id] || Wrench;
                        const isFavorites = cat.id === "Favorites";
                        const accent = categoryAccents[cat.id] || defaultAccent;

                        return (
                            <motion.div key={cat.id} variants={item}>
                                <Link
                                    href={isFavorites ? "/tools?category=Favorites" : `/tools?category=${cat.id}`}
                                    className="block no-underline group cursor-pointer"
                                >
                                    <div
                                        className={`relative flex items-center gap-3.5 p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl transition-all duration-250 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg ${accent.border}`}
                                    >
                                        {/* Category accent gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                                        {/* Icon */}
                                        <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 transition-all duration-250 group-hover:scale-110 ${accent.iconBg} ${accent.iconColor}`}>
                                            <Icon
                                                size={19}
                                                fill={isFavorites ? "currentColor" : "none"}
                                                className="transition-transform duration-250 group-hover:rotate-[-8deg]"
                                            />
                                        </div>

                                        {/* Text */}
                                        <div className="relative z-10 min-w-0">
                                            <p className={`text-[14px] font-semibold text-[var(--title-color)] truncate transition-colors group-hover:${accent.label.split('-')[1] ? accent.label : 'text-[#fb923c]'}`}>
                                                {t(`categories.${cat.id}`, { fallback: cat.id })}
                                            </p>
                                            <p className="text-[11px] text-[var(--muted-text)] mt-0.5">
                                                {cat.count} tools
                                            </p>
                                        </div>

                                        {/* Arrow indicator */}
                                        <div className={`relative z-10 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0 ${accent.iconColor}`}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
