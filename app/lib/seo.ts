import { getTranslations } from 'next-intl/server';
import { tools } from '../data/tools';
import { Metadata } from 'next';

const MAX_DESCRIPTION_LENGTH = 160;

export async function constructToolMetadata({
    params,
    toolId
}: {
    params: Promise<{ locale: string }>;
    toolId: string;
}): Promise<Metadata> {
    const { locale } = await params;

    // Fetch translations for the specific tool and common metadata
    const t = await getTranslations({ locale, namespace: 'Tools' });
    const tMeta = await getTranslations({ locale, namespace: 'Metadata' }); // Assuming basic metadata structure

    const tool = tools.find(tr => tr.id === toolId);

    // Get localized name and description
    // Fallback to tools.ts English data if translation key missing
    const name = t(`${toolId}.name`, { fallback: tool?.name || '' });
    const rawDescription = t(`${toolId}.description`, { fallback: tool?.description || '' });

    // Truncate description for SEO optimal length
    const description = rawDescription.length > MAX_DESCRIPTION_LENGTH
        ? rawDescription.substring(0, MAX_DESCRIPTION_LENGTH - 3) + '...'
        : rawDescription;

    const title = `${name} | DailyDevTools`;
    const siteUrl = 'https://www.dailydev.tools';
    const canonical = `${siteUrl}/${locale}/tools/${toolId}`;

    // Construct Dynamic OG Image URL with parameters
    const ogImageUrl = new URL(`${siteUrl}/api/og`);
    ogImageUrl.searchParams.set('id', toolId);
    ogImageUrl.searchParams.set('title', name);
    ogImageUrl.searchParams.set('description', rawDescription.substring(0, 200)); // Pass a bit more for image

    return {
        title: {
            absolute: title, // Force this exact title
            default: title,
            template: "%s | DailyDevTools"
        },
        description: description,
        alternates: {
            canonical: canonical,
            languages: {
                'en': `${siteUrl}/en/tools/${toolId}`,
                'es': `${siteUrl}/es/tools/${toolId}`,
                // Add other supported languages here
            }
        },
        openGraph: {
            title: name,
            description: description,
            siteName: "DailyDevTools",
            url: canonical,
            locale: locale === 'en' ? 'en_US' : locale,
            type: 'website',
            images: [
                {
                    url: ogImageUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: `${name} Preview`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: name,
            description: description,
            images: [ogImageUrl.toString()],
        },
    };
}
