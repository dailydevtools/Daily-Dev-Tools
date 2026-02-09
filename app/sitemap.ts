import { MetadataRoute } from 'next'
import { tools } from './data/tools'
import { blogPosts } from './[locale]/blog/data'

import { locales } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.dailydev.tools'

    // const locales = ['en', 'es']; // Removed hardcoded list

    let entries: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
        // Base Routes
        entries.push({
            url: `${baseUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        });

        // Blog Index
        entries.push({
            url: `${baseUrl}/${locale}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        });

        // Tool Routes
        tools.forEach((tool) => {
            entries.push({
                url: `${baseUrl}/${locale}/tools/${tool.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            });
        });

        // Blog Post Routes
        blogPosts.forEach((post) => {
            entries.push({
                url: `${baseUrl}/${locale}/blog/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            });
        });
    }

    return entries;
}
