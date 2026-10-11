import { getTranslations } from 'next-intl/server';
import { tools } from '../data/tools';
import { locales, routing } from '../../i18n/routing';
import { Metadata } from 'next';

const MAX_DESCRIPTION_LENGTH = 160;

export const siteUrl = 'https://www.dailydev.tools';

/**
 * Builds an absolute URL for a locale + path, respecting the 'as-needed' locale
 * prefix: the default locale ('en') is served without a prefix, so its URL has none.
 */
export function localizedUrl(locale: string, path: string = ''): string {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    return `${siteUrl}${prefix}${path}`;
}

/** Builds an `alternates.languages` map (+ x-default) for a given path across all locales. */
export function hreflangAlternates(path: string = ''): Record<string, string> {
    return {
        ...Object.fromEntries(locales.map((loc) => [loc, localizedUrl(loc, path)])),
        'x-default': localizedUrl(routing.defaultLocale, path),
    };
}

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

    const tool = tools.find(tr => tr.id === toolId);

    // Get localized name and description
    // Fallback to tools.ts English data if translation key missing
    const name = t.has(`${toolId}.name`) ? t(`${toolId}.name`) : tool?.name || toolId;
    const rawDescription = t.has(`${toolId}.description`) ? t(`${toolId}.description`) : tool?.description || '';

    // Truncate description for SEO optimal length
    const description = rawDescription.length > MAX_DESCRIPTION_LENGTH
        ? rawDescription.substring(0, MAX_DESCRIPTION_LENGTH - 3) + '...'
        : rawDescription;

    const title = `${name} | DailyDevTools`;
    const canonical = localizedUrl(locale, `/tools/${toolId}`);

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
            languages: hreflangAlternates(`/tools/${toolId}`),
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
