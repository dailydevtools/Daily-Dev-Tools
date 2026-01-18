import { MetadataRoute } from 'next'
import { tools } from './data/tools'
import { blogPosts } from './blog/data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://dailydev.tools'

    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...toolRoutes,
        ...blogRoutes,
    ]
}
