import { MetadataRoute } from 'next'
import { tools } from './data/tools'
import { blogPosts } from './[locale]/blog/data'
import { locales } from '@/i18n/routing';

const BASE_URL = 'https://www.dailydev.tools';


export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    // Home page — English is priority 1, others 0.6
    for (const locale of locales) {
        const isEn = locale === 'en';
        entries.push({
            url: `${BASE_URL}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: isEn ? 1.0 : 0.6,
        });
    }

    // Tool pages — English at 0.9 (highest for tools), others at 0.5
    for (const tool of tools) {
        for (const locale of locales) {
            const isEn = locale === 'en';
            entries.push({
                url: `${BASE_URL}/${locale}/tools/${tool.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: isEn ? 0.9 : 0.5,
            });
        }
    }

    // Blog index
    for (const locale of locales) {
        const isEn = locale === 'en';
        entries.push({
            url: `${BASE_URL}/${locale}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: isEn ? 0.8 : 0.5,
        });
    }

    // Blog posts — English only at 0.7, other locales at 0.4
    for (const post of blogPosts) {
        for (const locale of locales) {
            const isEn = locale === 'en';
            entries.push({
                url: `${BASE_URL}/${locale}/blog/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly' as const,
                priority: isEn ? 0.7 : 0.4,
            });
        }
    }

    return entries;
}

