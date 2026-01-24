import { Link } from "../../i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="relative z-10 border-t border-[var(--border-color)] py-12 px-6 bg-[var(--background)] flex justify-center">
            <div className="w-full max-w-[1200px]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 flex-wrap">
                    <Link href="/" className="flex items-center gap-2.5 no-underline">
                        <Image src="/project_logo.png" alt="DailyDevTools Logo" width={36} height={36} />
                        <span className="font-semibold text-[var(--title-color)]">DailyDevTools</span>
                    </Link>
                    <p className="text-[var(--muted-text)] text-[13px] text-center">
                        {t('builtWith')}{' '}
                        <a href="https://sohanpaliyal.github.io" target="_blank" className="text-[#fb923c] no-underline hover:text-[#f97316]">
                            Sohan Paliyal
                        </a>
                    </p>
                    <div className="flex items-center gap-5 text-sm flex-wrap justify-center">
                        <Link href="/#tools" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)]">{t('allTools')}</Link>
                        <Link href="/blog" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)]">{t('blog')}</Link>
                        <Link href="/about" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)]">{t('about')}</Link>
                        <Link href="/privacy" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)]">{t('privacy')}</Link>
                        <Link href="/terms" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)]">{t('terms')}</Link>
                        <a href="https://github.com/sohanpaliyal/Daily-Dev-Tools" target="_blank" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)]">GitHub</a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-[var(--border-color)] text-center">
                    <p className="text-[var(--muted-text)] text-xs">
                        &copy; {new Date().getFullYear()} DailyDevTools. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
