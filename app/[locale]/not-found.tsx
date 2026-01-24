"use client";

import { Link } from '../../i18n/routing';
import { useTranslations } from 'next-intl';
import { Ghost, Home } from 'lucide-react';

export default function NotFound() {
    const t = useTranslations('NotFound');

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute rounded-full blur-[100px] z-0 opacity-50 pointer-events-none top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(249,115,22,0.15)_0%,rgba(255,255,255,0)_70%)]" />
            <div className="absolute rounded-full blur-[100px] z-0 opacity-50 pointer-events-none bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(234,179,8,0.1)_0%,rgba(255,255,255,0)_70%)]" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-[600px]">
                {/* Glitch/Ghost Effect Container */}
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] p-8 rounded-[30px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] animate-float">
                        <Ghost size={80} className="text-[#fb923c] animate-wiggle" strokeWidth={1.5} />
                    </div>
                </div>

                <h1 className="text-[clamp(80px,15vw,120px)] font-bold mb-2 leading-none">
                    <span className="bg-gradient-to-br from-[#fb923c] via-[#facc15] to-[#fde047] bg-clip-text text-transparent">404</span>
                </h1>

                <h2 className="text-[clamp(24px,5vw,32px)] font-bold text-[var(--title-color)] mb-4">
                    {t('title')}
                </h2>

                <p className="text-[var(--muted-text)] text-lg mb-10 leading-relaxed">
                    {t('description')}
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#fb923c] text-[#fb923c] font-semibold text-sm px-8 py-3.5 rounded-full cursor-pointer transition-all duration-300 no-underline hover:bg-[#fb923c] hover:text-white hover:shadow-[0_0_20px_rgba(251,146,60,0.4)] hover:-translate-y-0.5"
                >
                    <Home size={18} />
                    {t('backHome')}
                </Link>
            </div>

        </div>
    );
}
