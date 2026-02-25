"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "../../i18n/routing";
import { Zap, Shield, Code, Sparkles, Github, Star } from "lucide-react";
import { tools } from "../data/tools";
import { ArrowRight, Zap, Shield, Code, Sparkles, Search, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { tools, ToolCategory, getSortedTools } from "../data/tools";
import WebsiteSchema from "../components/WebsiteSchema";
import ToolsCarousel from "../components/ToolsCarousel";
import ToolIcon from "../components/ToolIcon";
import ToolMarquee from "../components/ToolMarquee";
import { useTranslations } from "next-intl";
import MotionCard from "../components/ui/MotionCard";
import MeshGradientBackground from "../components/MeshGradientBackground";
import PopularTools from "../components/PopularTools";
import CategoryShowcase from "../components/CategoryShowcase";
import CommunitySection from "../components/CommunitySection";


export default function Home() {
  const t = useTranslations('Homepage');
  const tTools = useTranslations('Tools');
  const tHeader = useTranslations('Header');
  const [recents, setRecents] = useState<typeof tools>([]);
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    // Defer state updates to the next tick to avoid
    // synchronous setState directly inside the effect body.
    const timeoutId = window.setTimeout(() => {
      setMounted(true);
      const savedRecents = localStorage.getItem("recent_tools");
      if (savedRecents) {
        const ids = JSON.parse(savedRecents);
        const recentTools = ids.map((id: string) => tools.find(t => t.id === id)).filter(Boolean);
        setRecents(recentTools);
      }
    }, 0);

    // Fetch GitHub stars
    fetch("https://api.github.com/repos/dailydevtools/Daily-Dev-Tools")
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => setStars(null));

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);


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

  const features = [
    { icon: <Zap size={20} />, title: t('features.fast.title'), description: t('features.fast.desc') },
    { icon: <Shield size={20} />, title: t('features.private.title'), description: t('features.private.desc') },
    { icon: <Code size={20} />, title: t('features.simple.title'), description: t('features.simple.desc') },
    { icon: <Sparkles size={20} />, title: t('features.free.title'), description: t('features.free.desc') },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <WebsiteSchema />
      {/* Mesh Gradient Background */}
      <div className="absolute top-0 left-0 right-0 h-[800px] overflow-hidden pointer-events-none z-0">
        <MeshGradientBackground />
        {/* Gradient overlay to fade out at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </div>

      {/* Background glows - contained within viewport */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute rounded-full blur-[100px] opacity-50 top-[-10%] left-[-10%] w-[min(600px,80vw)] h-[min(600px,80vw)] bg-[radial-gradient(circle,rgba(249,115,22,0.15)_0%,rgba(255,255,255,0)_70%)]" />
        <div className="absolute rounded-full blur-[100px] opacity-50 top-[20%] right-[-5%] w-[min(500px,70vw)] h-[min(500px,70vw)] bg-[radial-gradient(circle,rgba(234,179,8,0.1)_0%,rgba(255,255,255,0)_70%)]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 mt-12 px-6 flex flex-col items-center">
        <div className="w-full max-w-[1200px] mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f973161a] border border-[#f9731633] rounded-full text-[13px] text-[#fb923c] mb-6">
            <Sparkles size={16} />
            <span>{t('heroTag')}</span>
          </div>

          <h1 className="text-[clamp(40px,8vw,72px)] font-bold font-heading mb-6 leading-[1.1] text-[var(--title-color)]">
            {t('titleLine1')}<br />
            <span className="bg-gradient-to-br from-[#fb923c] via-[#facc15] to-[#fde047] bg-clip-text text-transparent">{t('titleLine2')}</span>
          </h1>

          <p className="text-[clamp(16px,2.5vw,20px)] text-[var(--muted-text)] max-w-[800px] mx-auto mb-8 leading-[1.7]">
            {t('subtitle')}
          </p>

          <div className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/tools"
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-neutral-50 group"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fdba74_0%,#f97316_50%,#fdba74_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white/90 dark:bg-neutral-950/90 px-8 py-1 text-sm font-medium text-neutral-950 dark:text-white backdrop-blur-3xl transition-all duration-300 hover:bg-white/80 dark:hover:bg-neutral-950/80 border border-orange-500/20 group-hover:border-transparent">
                <span className="relative flex items-center gap-2">
                  {t('exploreButton', { fallback: 'Explore Tools' })}
                  <Sparkles className="w-4 h-4 text-orange-400 transition-transform duration-300 group-hover:rotate-12" />
                </span>
              </span>
            </Link>

            <a
              href="https://github.com/dailydevtools/Daily-Dev-Tools"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-neutral-50 group"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fdba74_0%,#f97316_50%,#fdba74_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white/90 dark:bg-neutral-950/90 px-8 py-1 text-sm font-medium text-neutral-950 dark:text-white backdrop-blur-3xl transition-all duration-300 hover:bg-white/80 dark:hover:bg-neutral-950/80 border border-orange-500/20 group-hover:border-transparent">
                <span className="relative flex items-center gap-2">
                  <Github size={18} className="text-orange-400" aria-hidden="true" />
                  <span>{t('starOnGithub', { fallback: 'Star on GitHub' })}</span>
                  {stars !== null && (
                    <span className="flex items-center gap-1.5 pl-2.5 ml-1 border-l border-neutral-200 dark:border-white/20">
                      <Star size={14} className="text-orange-400 fill-orange-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-mono text-xs">{stars.toLocaleString()}</span>
                    </span>
                  )}
                </span>
              </span>
            </a>
          </div>

          {/* Tool Marquee */}
          <div className="w-full mt-8 max-w-[1200px] overflow-hidden mb-14">
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

      {/* Popular Tools Section - New */}
      <PopularTools />

      {/* Category Showcase - New */}
      <CategoryShowcase />

      {/* Features Section - Improved (Bento Grid) */}
      <section className="relative z-10 py-12 px-6 flex flex-col items-center">
        <h2 className="text-sm font-semibold text-[#fb923c] uppercase tracking-wider mb-3">Why Daily Dev Tools?</h2>
        <h3 className="text-3xl font-bold font-heading text-[var(--title-color)] mb-16 text-center">Everything you need, nothing you don't.</h3>

        <div className="w-full max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 grid-rows-2">
            {/* Feature 1 (Large) */}
            <MotionCard className="md:col-span-4 p-8 rounded-3xl bg-[var(--header-bg)] border border-[var(--border-color)] hover:border-[#fb923c]/30 transition-all duration-300 group relative overflow-hidden">
              {/* <div className="absolute top-0 right-0 p-8 opacity-10 bg-gradient-to-bl from-orange-500 to-transparent rounded-bl-full w-32 h-32 -mr-8 -mt-8" /> */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center justify-center rounded-2xl bg-[#f973161a] text-[#fb923c] border border-[#f9731633] w-14 h-14">{features[0].icon}</div>
                {/* <span className="text-xs font-mono text-[var(--muted-text)] border border-[var(--border-color)] px-2 py-1 rounded-md">01</span> */}
              </div>
              <h3 className="font-bold font-heading text-[var(--title-color)] mb-3 text-xl">{features[0].title}</h3>
              <p className="text-[15px] text-[var(--muted-text)] leading-relaxed max-w-sm">{features[0].description}</p>
            </MotionCard>

            {/* Feature 2 (Small) */}
            <MotionCard className="md:col-span-2 p-8 rounded-3xl bg-[var(--header-bg)] border border-[var(--border-color)] hover:border-[#fb923c]/30 transition-all duration-300 group">
              <div className="mb-6 flex items-center justify-center rounded-2xl bg-[#f973161a] text-[#fb923c] border border-[#f9731633] w-14 h-14">{features[1].icon}</div>
              <h3 className="font-bold font-heading text-[var(--title-color)] mb-2 text-lg">{features[1].title}</h3>
              <p className="text-[14px] text-[var(--muted-text)]">{features[1].description}</p>
            </MotionCard>

            {/* Feature 3 (Small) */}
            <MotionCard className="md:col-span-2 p-8 rounded-3xl bg-[var(--header-bg)] border border-[var(--border-color)] hover:border-[#fb923c]/30 transition-all duration-300 group">
              <div className="mb-6 flex items-center justify-center rounded-2xl bg-[#f973161a] text-[#fb923c] border border-[#f9731633] w-14 h-14">{features[2].icon}</div>
              <h3 className="font-bold font-heading text-[var(--title-color)] mb-2 text-lg">{features[2].title}</h3>
              <p className="text-[14px] text-[var(--muted-text)]">{features[2].description}</p>
            </MotionCard>

            {/* Feature 4 (Large) */}
            <MotionCard className="md:col-span-4 p-8 rounded-3xl bg-[var(--header-bg)] border border-[var(--border-color)] hover:border-[#fb923c]/30 transition-all duration-300 group relative overflow-hidden">
              {/* <div className="absolute top-0 right-0 p-8 opacity-10 bg-gradient-to-bl from-blue-500 to-transparent rounded-bl-full w-32 h-32 -mr-8 -mt-8" /> */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center justify-center rounded-2xl bg-[#f973161a] text-[#fb923c] border border-[#f9731633] w-14 h-14">{features[3].icon}</div>
                {/* <span className="text-xs font-mono text-[var(--muted-text)] border border-[var(--border-color)] px-2 py-1 rounded-md">04</span> */}
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="relative z-10 py-20 px-6 flex flex-col items-center min-h-screen [overflow-anchor:none]">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[clamp(28px,5vw,44px)] font-bold font-heading mb-3 text-[var(--title-color)]">
              {query ? t('searchResults') : <><span className="bg-gradient-to-br from-orange-600 via-amber-500 to-orange-400 dark:from-[#fb923c] dark:via-[#facc15] dark:to-[#fde047] bg-clip-text text-transparent">{activeCategory === 'All' ? t('popularTools') : t(`categories.${activeCategory}`)}</span> {tHeader('tools')}</>}
            </h2>
            <p className="text-[var(--muted-text)]">{t('toolsCount', { count: filteredTools.length })}</p>
          </div>

          {/* Deep Liquid Tabs (Hover + Active Motion) - FIXED FOR LIGHT/DARK MODE */}
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
                  {/* Active Pill */}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full shadow-[0_10px_30px_rgba(15,23,42,0.12)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.5)] bg-[var(--tab-pill-active-bg)] ring-1 ring-[rgba(15,23,42,0.06)] dark:ring-white/5"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      style={{ zIndex: -1 }}
                    />
                  )}

                  {/* Hover Pill - Only shows if not active */}
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

          <div className="min-h-screen">
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
              <h3 className="font-bold font-heading text-[var(--title-color)] mb-3 text-xl">{features[3].title}</h3>
              <p className="text-[15px] text-[var(--muted-text)] leading-relaxed max-w-sm">{features[3].description}</p>
            </MotionCard>
          </div>
        </div>
      </section>

      {/* Community Section - New */}
      <CommunitySection />

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        {/* <AdUnit slot="homepage_bottom" /> */}
      </div>
    </div>
  );
}