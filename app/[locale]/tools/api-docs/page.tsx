import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Client from './Client';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'APIDocs' });
    const siteUrl = 'https://dailydev.tools';
    const canonical = `${siteUrl}/${locale}/tools/api-docs`;

    const ogImageUrl = new URL(`${siteUrl}/api/og`);
    ogImageUrl.searchParams.set('title', t('title'));
    ogImageUrl.searchParams.set('description', t('description'));

    const title = `${t('title')} - DailyDevTools`;
    const description = t('description');

    return {
        title,
        description,
        alternates: {
            canonical: canonical,
        },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: "DailyDevTools",
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

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <Client />;
}
