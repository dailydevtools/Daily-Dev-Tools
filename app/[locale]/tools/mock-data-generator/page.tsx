import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import MockDataGeneratorClient from './Client';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'MockDataGenerator' });

    return {
        title: t('name'),
        description: t('description'),
    };
}

export default function MockDataGenerator() {
    return <MockDataGeneratorClient />;
}
