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
                        <Image src="/project_logo.webp" alt="DailyDevTools Logo" width={36} height={36} />
                        <span className="font-semibold font-heading text-[var(--title-color)]">DailyDevTools</span>
                    </Link>
                    <p className="text-[var(--muted-text)] text-[13px] text-center">
                        {t('builtWith')}{' '}
                        <a href="https://sohanpaliyal.github.io" target="_blank" className="text-[#fb923c] underline underline-offset-4 decoration-[#fb923c]/30 hover:decoration-[#fb923c]">
                            Sohan Paliyal
                        </a>
                    </p>
                    <div className="flex items-center gap-5 text-sm flex-wrap justify-center font-heading">
                        <Link href="/#tools" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)] relative group py-1">
                            {t('allTools')}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fb923c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                        <Link href="/blog" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)] relative group py-1">
                            {t('blog')}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fb923c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                        <Link href="/about" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)] relative group py-1">
                            {t('about')}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fb923c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                        <Link href="/privacy" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)] relative group py-1">
                            {t('privacy')}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fb923c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                        <Link href="/terms" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)] relative group py-1">
                            {t('terms')}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fb923c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                        <a href="https://github.com/sohanpaliyal/Daily-Dev-Tools" target="_blank" className="text-[var(--muted-text)] no-underline hover:text-[var(--title-color)] relative group py-1">
                            GitHub
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fb923c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </a>
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
