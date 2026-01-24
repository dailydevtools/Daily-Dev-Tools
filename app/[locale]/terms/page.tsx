import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - DailyDevTools',
    description: 'Terms of Service for using DailyDevTools.',
};

import { useTranslations } from 'next-intl';

export default function TermsPage() {
    const t = useTranslations('Terms');
    const sections = ['acceptance', 'useLicense', 'disclaimer', 'limitations', 'revisions'];

    return (
        <div className="max-w-[800px] mx-auto py-20 px-6">
            <h1 className="text-3xl font-bold mb-6 text-[var(--title-color)]">{t('title')}</h1>
            <div>
                <p className="mb-6 text-[var(--foreground)]">{t('lastUpdated')}: {new Date().toLocaleDateString()}</p>

                {sections.map((section, index) => (
                    <div key={section}>
                        <h2 className="text-[28px] font-bold text-[var(--title-color)] mt-12 mb-6">{t(`sections.${section}.title`)}</h2>
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
