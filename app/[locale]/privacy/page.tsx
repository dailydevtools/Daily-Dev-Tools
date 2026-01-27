import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - DailyDevTools',
    description: 'Privacy Policy for DailyDevTools. We process your data locally in your browser.',
};

import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
    const t = useTranslations('Privacy');
    const sections = ['localProcessing', 'dataCollection', 'cookies', 'thirdParty', 'changes', 'contact'];

    return (
        <div className="max-w-[800px] mx-auto py-20 px-6">
            <h1 className="text-3xl font-bold font-heading mb-6 text-[var(--title-color)]">{t('title')}</h1>
            <div>
                <p className="mb-6 text-[var(--foreground)]">{t('lastUpdated')}: {new Date().toLocaleDateString()}</p>

                <div className="mb-6">
                    <h2 className="text-[28px] font-bold font-heading text-[var(--title-color)] mt-12 mb-6">1. Introduction</h2>
                    <p className="mb-6 text-[var(--foreground)]">{t('intro')}</p>
                </div>

                {sections.map((section, index) => (
                    <div key={section}>
                        <h2 className="text-[28px] font-bold font-heading text-[var(--title-color)] mt-12 mb-6">{t(`sections.${section}.title`)}</h2>
                        <p className="mb-6 text-[var(--foreground)]">
                            {t(`sections.${section}.content`)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
