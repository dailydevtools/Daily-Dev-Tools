import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const title = 'Terms of Service - DailyDevTools';
    const description = 'Terms of Service for using DailyDevTools.';
    const siteUrl = 'https://www.dailydev.tools';
    const canonical = `${siteUrl}/${locale}/terms`;

    const ogImageUrl = new URL(`${siteUrl}/api/og`);
    ogImageUrl.searchParams.set('title', 'Terms of Service');
    ogImageUrl.searchParams.set('description', description);

    return {
        title,
        description,
        alternates: {
            canonical: canonical,
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
                    alt: title,
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

import { useTranslations } from 'next-intl';

export default function TermsPage() {
    const t = useTranslations('Terms');
    const sections = ['acceptance', 'useLicense', 'disclaimer', 'limitations', 'revisions'];

    return (
        <div className="max-w-[800px] mx-auto py-20 px-6">
            <h1 className="text-3xl font-bold font-heading mb-6 text-[var(--title-color)]">{t('title')}</h1>
            <div>
                <p className="mb-6 text-[var(--foreground)]">{t('lastUpdated')}: {new Date().toLocaleDateString()}</p>

                {sections.map((section, index) => (
                    <div key={section}>
                        <h2 className="text-[28px] font-bold font-heading text-[var(--title-color)] mt-12 mb-6">{t(`sections.${section}.title`)}</h2>
                        <p className="mb-6 text-[var(--foreground)]">
                            {t(`sections.${section}.content`)}
                        </p>
                        {/* Special handling for lists or extra content if needed, currently useLicense has a list */}
                        {section === 'useLicense' && (
                            <ul className="list-disc pl-6 mb-6 text-[var(--foreground)]">
                                {t.raw('sections.useLicense.list').map((item: string, i: number) => (
                                    <li key={i} className="mb-2">{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
