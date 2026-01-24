"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Github } from "lucide-react";
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
                    <Image src="/project_logo.png" alt="DailyDevTools Logo" width={42} height={42} />

                    <span className="text-[18px] font-bold text-[var(--title-color)]">{t('title')}</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-5 desktop-nav">
                    <HeaderSearchTrigger />
                    <Link href="/#tools" className="text-[var(--muted-text)] text-sm no-underline">{t('tools')}</Link>
                    <Link href="/blog" className="text-[var(--muted-text)] text-sm no-underline">{t('blog')}</Link>

                    <LanguageSelector variant="desktop" />

                    <ThemeToggle />
                    <a
                        href="https://github.com/sohanpaliyal/Daily-Dev-Tools"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border border-[var(--card-border)] rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-200 text-[var(--muted-text)] hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[#fb923c]"
                        aria-label="GitHub"
                    >
                        <Github size={18} />
                    </a>
                </div>

                {/* Mobile Nav Toggle */}
                <div className="flex md:hidden items-center gap-3 mobile-nav-toggle">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="bg-transparent border-none text-[var(--title-color)] cursor-pointer p-2"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-[var(--background)] border-b border-[var(--border-color)] px-6 py-4 flex flex-col gap-4 md:hidden mobile-menu">
                    <HeaderSearchTrigger />
                    <Link href="/#tools" onClick={() => setMobileMenuOpen(false)} className="text-[var(--title-color)] text-base no-underline py-2">{t('tools')}</Link>
                    <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-[var(--title-color)] text-base no-underline py-2">{t('blog')}</Link>
                    <LanguageSelector variant="mobile" />
                    <a href="https://github.com/sohanpaliyal/Daily-Dev-Tools" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-4 py-3 rounded-full border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] text-center">
                        {t('github')}
                    </a>
                </div>
            )}
        </nav>
    );
}
