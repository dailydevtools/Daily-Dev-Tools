import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import MockDataGeneratorClient from './Client';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'MockDataGenerator' });

    const title = t('name');
    const description = t('description');
    const url = `https://www.dailydev.tools/${locale}/tools/mock-data-generator`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            images: [
                {
                    url: '/og-image.webp',
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/og-image.webp'],
        },
        alternates: {
            canonical: url,
        },
    };
}

export default function MockDataGenerator() {
    return <MockDataGeneratorClient />;
}
