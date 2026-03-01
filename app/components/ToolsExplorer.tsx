"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "../../i18n/routing";
import { ArrowRight, Search, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { tools, ToolCategory, getSortedTools } from "../data/tools";
import ToolIcon from "./ToolIcon";
import { useTranslations } from "next-intl";
import MotionCard from "./ui/MotionCard";
import { useSearchParams } from "next/navigation";

type CategoryFilter = "All" | "Favorites" | ToolCategory;
const CATEGORIES: CategoryFilter[] = ["All", "Developer", "Design", "Content", "Security", "Productivity", "Math", "Utility"];

export default function ToolsExplorer() {
    const t = useTranslations('Homepage');
    const tTools = useTranslations('Tools');
    const tHeader = useTranslations('Header');
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const categoryParam = searchParams.get("category");
        if (categoryParam) {
            if (categoryParam === "Favorites") {
                setActiveCategory("Favorites");
            } else if (CATEGORIES.includes(categoryParam as CategoryFilter)) {
                setActiveCategory(categoryParam as CategoryFilter);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        setMounted(true);
        const savedFavs = localStorage.getItem("favorites");
        if (savedFavs) setFavorites(JSON.parse(savedFavs));

        const handleStorageChange = () => {
            const savedFavs = localStorage.getItem("favorites");
            if (savedFavs) setFavorites(JSON.parse(savedFavs));
        }

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const toggleFavorite = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        let newFavs;
        if (favorites.includes(id)) {
            newFavs = favorites.filter(f => f !== id);
        } else {
            newFavs = [...favorites, id];
        }
        setFavorites(newFavs);
        localStorage.setItem("favorites", JSON.stringify(newFavs));

        // Dispatch storage event for other components to update
        window.dispatchEvent(new Event("storage"));
    };

    const filteredTools = useMemo(() => {
        const filtered = tools.filter((tool) => {
            const matchesSearch = tool.name.toLowerCase().includes(query.toLowerCase()) ||
                tool.description.toLowerCase().includes(query.toLowerCase());

            let matchesCategory = true;
            if (activeCategory === "Favorites") {
                matchesCategory = favorites.includes(tool.id);
            } else if (activeCategory !== "All") {
                matchesCategory = tool.category === activeCategory;
            }

            return matchesSearch && matchesCategory;
        });
        return getSortedTools(filtered);
    }, [query, activeCategory, favorites]);

    return (
        <div className="w-full max-w-[1200px] mx-auto min-h-screen pb-20">
            <div className="text-center mb-10 pt-10">
                <h1 className="text-[clamp(28px,5vw,44px)] font-bold font-heading mb-3 text-[var(--title-color)]">
                    {query ? t('searchResults') : <><span className="bg-gradient-to-br from-orange-600 via-amber-500 to-orange-400 dark:from-[#fb923c] dark:via-[#facc15] dark:to-[#fde047] bg-clip-text text-transparent">{activeCategory === 'All' ? t('popularTools') : t(`categories.${activeCategory}`)}</span> {tHeader('tools')}</>}
                </h1>
                <p className="text-[var(--muted-text)]">{t('toolsCount', { count: filteredTools.length })}</p>
            </div>

            <div className="flex justify-center mb-12 w-full px-4 overflow-hidden">
                <div
                    className="flex flex-nowrap gap-1 p-1 bg-[rgba(255,255,255,0.9)] dark:bg-[var(--card-bg)] rounded-full backdrop-blur-xl backdrop-saturate-150 relative z-0 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border border-[var(--card-border)] scroll-smooth mx-auto shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:shadow-none"
                    onMouseLeave={() => setHoveredCategory(null)}
                >
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveCategory(cat);
                            }}
                            onMouseEnter={() => setHoveredCategory(cat)}
                            className={`relative px-4 py-1.5 text-[13px] font-medium transition-colors duration-200 rounded-full flex-shrink-0 z-10 select-none outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50
                ${activeCategory === cat
                                    ? 'text-[var(--title-color)] font-semibold'
                                    : 'text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'}`}
                            style={
                                activeCategory === cat || hoveredCategory === cat
                                    ? { color: 'var(--title-color)' }
                                    : undefined
                            }
                        >
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-full shadow-[0_10px_30px_rgba(15,23,42,0.12)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.5)] bg-[var(--tab-pill-active-bg)] ring-1 ring-[rgba(15,23,42,0.06)] dark:ring-white/5"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    style={{ zIndex: -1 }}
                                />
                            )}

                            {hoveredCategory === cat && activeCategory !== cat && (
                                <motion.div
                                    layoutId="hover-pill"
                                    className="absolute inset-0 rounded-full bg-[var(--tab-pill-hover-bg)] border border-[var(--tab-pill-hover-border)]"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    style={{ zIndex: -2 }}
                                />
                            )}
                            <span className="relative block">
                                {t(`categories.${cat}`)}
                            </span>
                        </button>
                    ))}

                    {mounted && favorites.length > 0 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveCategory("Favorites");
                            }}
                            onMouseEnter={() => setHoveredCategory("Favorites")}
                            className={`group relative px-4 py-1.5 text-[13px] font-medium transition-colors duration-200 rounded-full flex-shrink-0 z-10 flex items-center gap-1.5 select-none outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50
                ${activeCategory === "Favorites"
                                    ? 'text-[var(--title-color)] font-semibold'
                                    : 'text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'}`}
                            style={
                                activeCategory === "Favorites" || hoveredCategory === "Favorites"
                                    ? { color: 'var(--title-color)' }
                                    : undefined
                            }
                        >
                            {activeCategory === "Favorites" && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-full shadow-[0_10px_30px_rgba(15,23,42,0.12)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.5)] bg-[var(--tab-pill-active-bg)] ring-1 ring-[rgba(15,23,42,0.06)] dark:ring-white/5"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    style={{ zIndex: -1 }}
                                />
                            )}
                            {hoveredCategory === "Favorites" && activeCategory !== "Favorites" && (
                                <motion.div
                                    layoutId="hover-pill"
                                    className="absolute inset-0 rounded-full bg-[var(--tab-pill-hover-bg)] border border-[var(--tab-pill-hover-border)]"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    style={{ zIndex: -2 }}
                                />
                            )}
                            <span className="relative flex items-center gap-1.5">
                                <Star
                                    size={13}
                                    className={activeCategory === "Favorites"
                                        ? "text-orange-500 fill-orange-500"
                                        : "text-neutral-600 dark:text-neutral-400"
                                    }
                                />
                                {t('categories.Favorites')}
                                <span className={activeCategory === "Favorites" ? "opacity-100" : "opacity-60"}>
                                    ({favorites.length})
                                </span>
                            </span>
                        </button>
                    )}
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5"
            >
                <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool) => (
                        <motion.div
                            key={tool.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link href={`/tools/${tool.id}`} className="block no-underline h-full">
                                <MotionCard className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] text-[var(--foreground)] p-6 h-full">
                                    <button
                                        type="button"
                                        onClick={(e) => toggleFavorite(e, tool.id)}
                                        className={`absolute top-5 right-5 bg-transparent border-none cursor-pointer transition-all duration-200 z-10 ${favorites.includes(tool.id) ? 'text-[#fb923c]' : 'text-[var(--muted-text)]'
                                            }`}
                                        aria-label={favorites.includes(tool.id) ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        <Star size={20} fill={favorites.includes(tool.id) ? "#fb923c" : "none"} aria-hidden="true" />
                                    </button>

                                    <div className="flex items-center justify-center rounded-xl bg-[#f973161a] text-[#fb923c] border border-[#f9731633] transition-transform duration-300 group-hover:scale-110 w-12 h-12 mb-4">
                                        <ToolIcon name={tool.icon} size={24} className="text-[#fb923c]" />
                                    </div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold font-heading text-[var(--title-color)]">{tTools(`${tool.id}.name`, { fallback: tool.name })}</h3>
                                        <span className="text-[10px] bg-[var(--card-hover-bg)] px-2 py-0.5 rounded-full text-[var(--muted-text)] border border-[var(--border-color)] ml-4 shrink-0 mt-1">{t(`categories.${tool.category}`, { fallback: tool.category })}</span>
                                    </div>
                                    {tool.isNew && (
                                        <span className="absolute right-5 bottom-5 px-2 py-1 text-[10px] font-bold uppercase tracking-wide bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-md shadow-lg">
                                            NEW
                                        </span>
                                    )}
                                    <p className="text-[var(--muted-text)] text-sm mb-4">{tTools(`${tool.id}.description`, { fallback: tool.description })}</p>
                                    <div className="flex items-center text-[#fb923c] text-sm font-medium">
                                        <span>{t('openTool')}</span>
                                        <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </MotionCard>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            {filteredTools.length === 0 && (
                <div className="text-center p-20 text-[#6b7280]">
                    <p className="text-lg">{t('noResults')} "{query}"</p>
                    <button type="button" onClick={() => { setQuery(""); setActiveCategory("All"); }} className="mt-4 bg-transparent border-none text-[#fb923c] cursor-pointer underline">
                        {t('clearFilters')}
                    </button>
                </div>
            )}
        </div>
    );
}
