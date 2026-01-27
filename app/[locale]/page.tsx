"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "../../i18n/routing";
import { ArrowRight, Zap, Shield, Code, Sparkles, Search, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { tools, ToolCategory } from "../data/tools";
import WebsiteSchema from "../components/WebsiteSchema";
import ToolsCarousel from "../components/ToolsCarousel";
import ToolIcon from "../components/ToolIcon";
import ToolMarquee from "../components/ToolMarquee";
import { useTranslations } from "next-intl";
import MotionCard from "../components/ui/MotionCard";

type CategoryFilter = "All" | "Favorites" | ToolCategory;
const CATEGORIES: CategoryFilter[] = ["All", "Developer", "Design", "Content", "Security", "Productivity", "Math", "Utility"];

export default function Home() {
  const t = useTranslations('Homepage');
  const tTools = useTranslations('Tools');
  const tHeader = useTranslations('Header');
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<any[]>([]); // Using any[] to safely map from ID
  const [mounted, setMounted] = useState(false);

  const loadFromStorage = () => {
    const savedFavs = localStorage.getItem("favorites");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    const savedRecents = localStorage.getItem("recent_tools");
    if (savedRecents) {
      const ids = JSON.parse(savedRecents);
      const recentTools = ids.map((id: string) => tools.find(t => t.id === id)).filter(Boolean);
      setRecents(recentTools);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadFromStorage();

    // Listen for updates from other components/tabs
    window.addEventListener("storage", loadFromStorage);
    return () => window.removeEventListener("storage", loadFromStorage);
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
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
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
  }, [query, activeCategory, favorites]);

  const features = [
    { icon: <Zap size={20} />, title: t('features.fast.title'), description: t('features.fast.desc') },
    { icon: <Shield size={20} />, title: t('features.private.title'), description: t('features.private.desc') },
    { icon: <Code size={20} />, title: t('features.simple.title'), description: t('features.simple.desc') },
    { icon: <Sparkles size={20} />, title: t('features.free.title'), description: t('features.free.desc') },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <WebsiteSchema />
      {/* Background glows - contained within viewport */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute rounded-full blur-[100px] opacity-50 top-[-10%] left-[-10%] w-[min(600px,80vw)] h-[min(600px,80vw)] bg-[radial-gradient(circle,rgba(249,115,22,0.15)_0%,rgba(255,255,255,0)_70%)]" />
        <div className="absolute rounded-full blur-[100px] opacity-50 top-[20%] right-[-5%] w-[min(500px,70vw)] h-[min(500px,70vw)] bg-[radial-gradient(circle,rgba(234,179,8,0.1)_0%,rgba(255,255,255,0)_70%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 mt-20 px-6 flex flex-col items-center">
        <div className="w-full max-w-[1200px] mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f973161a] border border-[#f9731633] rounded-full text-[13px] text-[#fb923c] mb-8">
            <Sparkles size={16} />
            <span>{t('heroTag')}</span>
          </div>

          <h1 className="text-[clamp(40px,8vw,72px)] font-bold font-heading mb-6 leading-[1.1] text-[var(--title-color)]">
            {t('titleLine1')}<br />
            <span className="bg-gradient-to-br from-[#fb923c] via-[#facc15] to-[#fde047] bg-clip-text text-transparent">{t('titleLine2')}</span>
          </h1>

          <p className="text-[clamp(16px,2.5vw,20px)] text-[var(--muted-text)] max-w-[800px] mx-auto mb-10 leading-[1.7]">
            {t('subtitle')}
          </p>

          {/* Tool Marquee */}
          <div className="w-full max-w-[1200px] overflow-hidden mb-10">
            <ToolMarquee />
          </div>

          {/* Recently Used Tools */}
          <div className="mt-10 w-full min-h-[140px]">
            {mounted ? (
              <>
                <h2 className="text-[var(--muted-text)] font-heading text-[13px] mb-4 uppercase tracking-[1px] font-semibold">{t('recentTools')}</h2>

                {recents.length > 0 ? (
                  recents.length > 2 ? (
                    <ToolsCarousel tools={recents} />
                  ) : (
                    <div className="flex justify-center flex-wrap gap-4">
                      {recents.map(tool => (
                        <Link key={tool.id} href={`/tools/${tool.id}`} className="group flex-shrink-0 w-full max-w-[320px] p-5 flex items-center gap-4 no-underline border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-xl rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1">
                          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#f973161a] text-[#fb923c] rounded-xl border border-[#f9731633] transition-transform duration-300 group-hover:scale-110">
                            <ToolIcon name={tool.icon} size={24} className="text-[#fb923c]" />
                          </div>
                          <div className="text-start min-w-0">
                            <span className="text-[var(--muted-text)] text-[11px] uppercase tracking-[0.5px] font-semibold block mb-0.5 truncate">{t(`categories.${tool.category}`, { fallback: tool.category })}</span>
                            <span className="text-[var(--title-color)] font-heading text-base font-semibold block truncate">
                              {tTools(`${tool.id}.name`, { fallback: tool.name })}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="p-6 border border-dashed border-[var(--border-color)] rounded-xl inline-block">
                    <p className="text-[#6b7280] text-sm">{t('noRecentText')}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="h-[100px]" /> // Placeholder to prevent layout shift
            )}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6 border-y border-[var(--border-color)] flex flex-col items-center">
        <h2 className="sr-only">Features</h2>
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center rounded-xl bg-[#f973161a] text-[#fb923c] border border-[#f9731633] transition-transform duration-300 w-12 h-12 mx-auto mb-4">{feature.icon}</div>
                <h3 className="font-semibold font-heading text-[var(--title-color)] mb-1 text-[15px]">{feature.title}</h3>
                <p className="text-[13px] text-[var(--muted-text)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="relative z-10 py-20 px-6 flex flex-col items-center min-h-screen [overflow-anchor:none]">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[clamp(28px,5vw,44px)] font-bold font-heading mb-3 text-[var(--title-color)]">
              {query ? t('searchResults') : <><span className="bg-gradient-to-br from-[#fb923c] via-[#facc15] to-[#fde047] bg-clip-text text-transparent">{activeCategory === 'All' ? t('popularTools') : t(`categories.${activeCategory}`)}</span> {tHeader('tools')}</>}
            </h2>
            <p className="text-[var(--muted-text)]">{t('toolsCount', { count: filteredTools.length })}</p>
          </div>

          {/* Category Pills */}
          <div className="flex justify-center flex-wrap gap-2 mb-10 md:justify-center md:flex-nowrap md:overflow-x-auto md:px-4 md:-mx-4 md:[&::-webkit-scrollbar]:hidden md:[-ms-overflow-style:none] md:[scrollbar-width:none]">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  // e.currentTarget.blur();
                  // Capture current scroll
                  const scrollY = window.scrollY;
                  setActiveCategory(cat);
                  // Restore scroll immediately with instant behavior to prevent visual jump
                  requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: 'instant' }));
                }}
                className={`gap-2 text-[13px] px-4 py-2 h-auto whitespace-nowrap flex-shrink-0 flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer
                  ${activeCategory === cat
                    ? 'bg-gradient-to-br from-[#fb923c] to-[#f97316] text-[#0a0a0a] font-semibold border-transparent hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]'
                    : 'bg-transparent text-[var(--muted-text)] font-medium border border-[var(--border-color)] hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]'}`}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
            {mounted && favorites.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  // e.currentTarget.blur();
                  const scrollY = window.scrollY;
                  setActiveCategory("Favorites");
                  requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: 'instant' }));
                }}
                className={`gap-2 text-[13px] px-4 py-2 h-auto flex items-center justify-center whitespace-nowrap flex-shrink-0 transition-all duration-300 rounded-full cursor-pointer
                  ${activeCategory === "Favorites"
                    ? 'bg-gradient-to-br from-[#fb923c] to-[#f97316] text-[#0a0a0a] font-semibold border-transparent hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]'
                    : 'bg-transparent text-[var(--muted-text)] font-medium border border-[var(--border-color)] hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]'}`}
              >
                <Star size={14} fill={activeCategory === "Favorites" ? "#0a0a0a" : "none"} className={activeCategory === "Favorites" ? "text-[#0a0a0a]" : ""} /> {t('categories.Favorites')} ({favorites.length})
              </button>
            )}
          </div>

          <div className="min-h-[100vh]">
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
                        >
                          <Star size={20} fill={favorites.includes(tool.id) ? "#fb923c" : "none"} />
                        </button>

                        <div className="flex items-center justify-center rounded-xl bg-[#f973161a] text-[#fb923c] border border-[#f9731633] transition-transform duration-300 group-hover:scale-110 w-12 h-12 mb-4">
                          <ToolIcon name={tool.icon} size={24} className="text-[#fb923c]" />
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold font-heading text-[var(--title-color)]">{tTools(`${tool.id}.name`, { fallback: tool.name })}</h3>
                          <span className="text-[10px] bg-[var(--card-hover-bg)] px-2 py-0.5 rounded-full text-[var(--muted-text)] border border-[var(--border-color)] ml-4 shrink-0 mt-1">{t(`categories.${tool.category}`, { fallback: tool.category })}</span>
                        </div>
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
        </div>
      </section>

      <section className="relative z-10 py-20 px-6 flex flex-col items-center">
        <div className="w-full max-w-[800px] mx-auto flex justify-center">
          <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] w-full p-[clamp(24px,5vw,40px)] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(249,115,22,0.05)] to-[rgba(250,204,21,0.05)]" />
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-[var(--muted-text)] text-sm mb-4 italic text-center">"{t('cta.feedbackText')}"</p>
              <button
                onClick={() => window.dispatchEvent(new Event('open-feedback-modal'))}
                className="bg-transparent border border-[var(--border-color)] text-[var(--muted-text)] hover:text-[var(--title-color)] hover:border-[#fb923c] text-xs px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
              >
                {t('cta.feedbackButton')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        {/* <AdUnit slot="homepage_bottom" /> */}
      </div>
    </div>
  );
}
