import { getTranslations } from 'next-intl/server';
import ToolsExplorer from '../../components/ToolsExplorer';
import { localizedUrl, hreflangAlternates } from '../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Header' });
    const canonical = localizedUrl(locale, '/tools');

    return {
        title: `${t('tools')} | Daily Dev Tools`,
        alternates: {
            canonical,
            languages: hreflangAlternates('/tools'),
        },
    };
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
    await params;
    return <ToolsExplorer />;
}
