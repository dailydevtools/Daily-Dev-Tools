import { getTranslations } from 'next-intl/server';
import ToolsExplorer from '../../components/ToolsExplorer';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'Header' });
    return {
        title: `${t('tools')} | Daily Dev Tools`,
    };
}

export default function ToolsPage({ params: { locale } }: { params: { locale: string } }) {
    return <ToolsExplorer />;
}
