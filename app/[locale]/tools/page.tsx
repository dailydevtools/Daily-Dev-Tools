import { getTranslations } from 'next-intl/server';
import ToolsExplorer from '../../components/ToolsExplorer';
import { locales } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Header' });
    const siteUrl = 'https://www.dailydev.tools';
    const canonical = `${siteUrl}/${locale}/tools`;

    return {
        title: `${t('tools')} | Daily Dev Tools`,
        alternates: {
            canonical,
            languages: {
                ...Object.fromEntries(locales.map((loc) => [loc, `${siteUrl}/${loc}/tools`])),
                'x-default': `${siteUrl}/en/tools`,
            },
        },
    };
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
    await params;
    return <ToolsExplorer />;
}
