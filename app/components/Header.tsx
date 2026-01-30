"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderSearchTrigger from "./HeaderSearchTrigger";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { Link, usePathname } from "../../i18n/routing";
import { useTranslations } from "next-intl";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);
    const t = useTranslations('Header');
    const pathname = usePathname();

    const navItems = [
        { id: 'tools', label: t('tools'), href: '/#tools' },
        { id: 'blog', label: t('blog'), href: '/blog' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed left-1/2 -translate-x-1/2 z-[100] flex justify-center items-center w-[98%] max-w-[1280px] border border-[var(--border-color)] bg-[var(--header-bg)] backdrop-blur-[20px] shadow-sm transition-all duration-300
                ${isScrolled ? "top-1" : "top-4"} rounded-2xl`}
        >
            <div className="flex items-center justify-between py-3 w-full h-full max-w-[1200px] mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 h-9 rounded-lg no-underline group focus-visible:ring-2 focus-visible:ring-orange-500/50 outline-none">
                    <Image src="/project_logo.webp" alt="DailyDevTools Logo" width={42} height={42} priority />
                    <span className="text-[18px] font-bold font-heading tracking-tight text-[var(--title-color)]">{t('title')}</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-5 desktop-nav">
                    <HeaderSearchTrigger />

                    {/* Liquid Glass Nav - Clean Hover Pills */}
                    <div className="flex items-center gap-2" onMouseLeave={() => setHoveredNav(null)}>
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="relative px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-[var(--title-color)] transition-colors duration-200 rounded-full select-none outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
                                onMouseEnter={() => setHoveredNav(item.id)}
                            >
                                {/* Hover Pill - Scale Effect */}
                                {hoveredNav === item.id && (
                                    <motion.div
                                        layoutId="nav-hover"
                                        className="absolute inset-0 bg-[var(--tab-pill-hover-bg)] border border-[var(--tab-pill-hover-border)] rounded-full"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        style={{ zIndex: -1 }}
                                    />
                                )}
                                <span className="relative block">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <LanguageSelector variant="desktop" />

                    <ThemeToggle />
                    <a
                        href="https://github.com/dailydevtools/Daily-Dev-Tools"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative overflow-hidden rounded-full w-11 h-11 flex items-center justify-center cursor-pointer transition-all duration-300
                                   bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[0_10px_30px_rgba(15,23,42,0.08)]
                                   text-[var(--muted-text)] hover:bg-[var(--card-hover-bg)] hover:text-[var(--orange-500)]"
                        aria-label="GitHub Repository"
                    >
                        <Github size={20} />
                    </a>
                </div>

                {/* Mobile Nav Toggle */}
                <div className="flex md:hidden items-center gap-3 mobile-nav-toggle">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="bg-transparent border-none text-[var(--title-color)] cursor-pointer p-3 w-11 h-11 flex items-center justify-center"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 right-0 bg-[var(--background)] border-b border-[var(--border-color)] px-6 py-4 flex flex-col gap-2 md:hidden mobile-menu overflow-hidden shadow-lg"
                    >
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                            <HeaderSearchTrigger />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                            <Link href="/#tools" onClick={() => setMobileMenuOpen(false)} className="text-[var(--title-color)] font-heading text-base no-underline py-3 block border-b border-dashed border-[var(--border-color)]">{t('tools')}</Link>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-[var(--title-color)] font-heading text-base no-underline py-3 block border-b border-dashed border-[var(--border-color)]">{t('blog')}</Link>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                            <LanguageSelector variant="mobile" />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="pt-2">
                            <a href="https://github.com/dailydevtools/Daily-Dev-Tools" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-4 py-3 rounded-xl border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[#fb923c] hover:text-[var(--title-color)] text-center w-full">
                                {t('github')}
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
