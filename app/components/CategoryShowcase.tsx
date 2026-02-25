"use client";

import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";
import { ToolCategory } from "../data/tools";
import { motion } from "framer-motion";
import { Code2, Palette, FileText, Shield, Timer, Calculator, Wrench, Star } from "lucide-react";
import MotionCard from "./ui/MotionCard";
import { useEffect, useState } from "react";

// Map categories to icons
const categoryIcons: Record<string, any> = {
    "Favorites": Star,
    "Developer": Code2,
    "Design": Palette,
    "Content": FileText,
    "Security": Shield,
    "Productivity": Timer,
    "Math": Calculator,
    "Utility": Wrench
};

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

export default function CategoryShowcase() {
    const t = useTranslations('Homepage');
    const [favCount, setFavCount] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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

    // consistent gradient for all icons
    const unifiedGradient = "from-orange-500 to-amber-600";

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <section className="relative z-10 py-12 px-6 flex flex-col items-center">
            <div className="w-full max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-heading text-[var(--title-color)] mb-4">
                        Browse by Category
                    </h2>
                    <p className="text-[var(--muted-text)] max-w-2xl mx-auto">
                        Find the perfect tool for your specific needs, organized for quick access.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {categories.map((cat) => {
                        const Icon = categoryIcons[cat.id] || Wrench;
                        const isFavorites = cat.id === "Favorites";

                        return (
                            <motion.div key={cat.id} variants={item}>
                                <Link
                                    href={isFavorites ? "/tools?category=Favorites" : `/tools?category=${cat.id}`}
                                    className="block no-underline h-full group"
                                >
                                    <MotionCard className="bg-[var(--card-bg)] flex gap-4 backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-5 h-full transition-all duration-300 hover:border-[#fb923c]/30 hover:shadow-xl group-hover:-translate-y-2 relative overflow-hidden">
                                        {/* Gradient Background Glow */}
                                        <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${unifiedGradient} opacity-5 rounded-full blur-2xl group-hover:opacity-15 transition-opacity duration-500`} />

                                        {/* Icon */}
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-[#f973161a] text-[#fb923c] border border-[#f9731633] group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon size={24} fill={isFavorites ? "currentColor" : "none"} />
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold font-heading text-[var(--title-color)] mb-0 group-hover:text-[#fb923c] transition-colors">
                                                {t(`categories.${cat.id}`, { fallback: cat.id })}
                                            </h3>

                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-[var(--muted-text)] group-hover:text-[var(--foreground)] transition-colors">
                                                    {cat.count} tools
                                                </p>

                                                {/* <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--background)] border border-[var(--border-color)] text-[var(--muted-text)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14" />
                                                        <path d="m12 5 7 7-7 7" />
                                                    </svg>
                                                </div> */}
                                            </div>
                                        </div>
                                    </MotionCard>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
