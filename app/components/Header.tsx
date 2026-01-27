"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderSearchTrigger from "./HeaderSearchTrigger";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const t = useTranslations('Header');

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-3 bg-[var(--header-bg)] backdrop-blur-[20px] border-b border-[var(--border-color)] flex justify-center">
            <div className="w-full max-w-[1200px] flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 h-9 rounded-lg no-underline group">
                    <Image src="/project_logo.webp" alt="DailyDevTools Logo" width={42} height={42} priority />

                    <span className="text-[18px] font-bold font-heading tracking-tight text-[var(--title-color)]">{t('title')}</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-5 desktop-nav">
                    <HeaderSearchTrigger />
                    <Link href="/#tools" className="text-[var(--muted-text)] font-heading text-sm no-underline px-3 py-1.5 rounded-lg transition-all hover:bg-[var(--card-hover-bg)] hover:text-[var(--title-color)] relative group">
                        {t('tools')}
                        <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#fb923c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    </Link>
                    <Link href="/blog" className="text-[var(--muted-text)] font-heading text-sm no-underline px-3 py-1.5 rounded-lg transition-all hover:bg-[var(--card-hover-bg)] hover:text-[var(--title-color)] relative group">
                        {t('blog')}
                        <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#fb923c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    </Link>

                    <LanguageSelector variant="desktop" />

                    <ThemeToggle />
                    <a
                        href="https://github.com/sohanpaliyal/Daily-Dev-Tools"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border border-[var(--card-border)] rounded-lg w-11 h-11 flex items-center justify-center cursor-pointer transition-all duration-200 text-[var(--muted-text)] hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[#fb923c]"
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
                        className="absolute top-full left-0 right-0 bg-[var(--background)] border-b border-[var(--border-color)] px-6 py-4 flex flex-col gap-2 md:hidden mobile-menu overflow-hidden"
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
                            <a href="https://github.com/sohanpaliyal/Daily-Dev-Tools" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-4 py-3 rounded-xl border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] text-center w-full">
                                {t('github')}
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
