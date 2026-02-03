import HomeClient from "./HomeClient";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    const title = t('title'); // "DailyDevTools - Free Online Developer Tools"
    const description = t('description');
    const siteUrl = 'https://dailydev.tools';
    const canonical = `${siteUrl}/${locale}`;

    // Dynamic OG Image for Homepage
    const ogImageUrl = new URL(`${siteUrl}/api/og`);
    ogImageUrl.searchParams.set('title', 'DailyDevTools');
    ogImageUrl.searchParams.set('description', 'Free, Fast & Private Developer Tools');

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
                    alt: "DailyDevTools Homepage",
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

export default function Page() {
    return <HomeClient />;
}
