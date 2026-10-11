import { MetadataRoute } from 'next';
import { tools } from './data/tools';
import { blogPosts } from './[locale]/blog/data';
import { locales } from '@/i18n/routing';
import { localizedUrl, hreflangAlternates } from './lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = ['', '/tools', '/about', '/privacy', '/terms', '/blog',
        ...tools.map(tool => `/tools/${tool.id}`),
        ...blogPosts.map(post => `/blog/${post.slug}`)];

    // Do not invent lastmod dates on each request/build. Add dates only when
    // actual content modification dates are maintained for the corresponding page.
    return paths.flatMap(path => locales.map(locale => ({
        url: localizedUrl(locale, path),
        alternates: { languages: hreflangAlternates(path) },
    })));
}
