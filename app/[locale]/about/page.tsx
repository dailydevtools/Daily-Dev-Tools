import type { Metadata } from 'next';
import { Shield, Zap, Code, Heart } from 'lucide-react';
import { locales } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });
    const title = t('title');
    const description = t('description');
    const siteUrl = 'https://www.dailydev.tools';
    const canonical = `${siteUrl}/${locale}/about`;

    const ogImageUrl = new URL(`${siteUrl}/api/og`);
    ogImageUrl.searchParams.set('title', 'About Us');
    ogImageUrl.searchParams.set('description', description);

    return {
        title,
        description,
        alternates: {
            canonical: canonical,
            languages: {
                ...Object.fromEntries(locales.map((loc) => [loc, `${siteUrl}/${loc}/about`])),
                'x-default': `${siteUrl}/en/about`,
            },
        },
        openGraph: {
            title,
            description,
            siteName: "DailyDevTools",
            url: canonical,
            locale: locale === 'en' ? 'en_US' : locale,
            type: 'website',
            images: [
                {
                    url: ogImageUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: "About DailyDevTools",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImageUrl.toString()],
        },
    };
}

export default function AboutPage() {
    const t = useTranslations('About');
    return (
        <div className="max-w-[800px] mx-auto py-20 px-6">
            <div className="text-center mb-15">
                <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold font-heading mb-6 text-[var(--title-color)] leading-[1.1]">
                    {t('heroTitleStart')} <span className="gradient-text">{t('heroTitleHighlight')}</span>
                </h1>
                <p className="text-[var(--muted-text)] text-lg max-w-[600px] mx-auto leading-[1.6]">
                    {t('heroSubtitle')}
                </p>
            </div>

            <div className="grid gap-10">
                <section className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 rounded-3xl border border-[var(--border-color)]">
                    <div className="bg-[#f973161a] text-[#fb923c] flex items-center justify-center rounded-xl border border-[#f9731633] transition-transform duration-300 hover:scale-110 w-12 h-12 mb-5 flex items-center justify-center">
                        <Shield size={24} className="text-[#fb923c]" />
                    </div>
                    <h2 className="text-2xl font-bold font-heading mb-4 text-[var(--title-color)]">{t('clientSide.title')}</h2>
                    <p className="text-[var(--foreground)] leading-[1.7]">
                        {t('clientSide.content')}
                    </p>
                </section>

                <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-[20px] border border-[var(--border-color)]">
                        <Zap size={24} className="text-[#fb923c] mb-4" />
                        <h3 className="text-lg font-semibold font-heading mb-2 text-[var(--title-color)]">{t('fast.title')}</h3>
                        <p className="text-[var(--muted-text)] text-sm leading-[1.6]">
                            {t('fast.content')}
                        </p>
                    </div>
                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-[20px] border border-[var(--border-color)]">
                        <Heart size={24} className="text-[#fb923c] mb-4" />
                        <h3 className="text-lg font-semibold font-heading mb-2 text-[var(--title-color)]">{t('free.title')}</h3>
                        <p className="text-[var(--muted-text)] text-sm leading-[1.6]">
                            {t('free.content')}
                        </p>
                    </div>
                </section>

                <section className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 rounded-3xl border border-[var(--border-color)] text-center">
                    <h2 className="text-2xl font-bold font-heading mb-4 text-[var(--title-color)]">{t('openSource.title')}</h2>
                    <p className="text-[var(--foreground)] leading-[1.7] mb-6">
                        {t('openSource.content')}
                    </p>
                    <a href="https://github.com/sohanpaliyal" target="_blank" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] inline-flex items-center gap-2">
                        <Code size={18} />
                        {t('openSource.cta')}
                    </a>
                </section>
            </div>
        </div>
    );
}
