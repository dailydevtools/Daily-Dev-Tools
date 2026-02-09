import { blogPosts } from "./data";
import BlogCard from "../../components/BlogCard";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Blog' });

    const title = "Developer Blog - DailyDevTools";
    const description = "Tutorials, guides, and best practices for developers.";
    const siteUrl = 'https://www.dailydev.tools';
    const canonical = `${siteUrl}/${locale}/blog`;

    const ogImageUrl = new URL(`${siteUrl}/api/og`);
    ogImageUrl.searchParams.set('title', "Developer Blog");
    ogImageUrl.searchParams.set('description', description);

    return {
        title,
        description,
        alternates: {
            canonical: canonical,
        },
        openGraph: {
            title,
            description,
            siteName: "DailyDevTools",
            url: canonical,
            locale: locale === 'en' ? 'en_US' : locale,
            type: 'website',
            images: [
                {
                    url: ogImageUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: "DailyDevTools Blog",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImageUrl.toString()],
        },
    };
}

export default function BlogIndex() {
    const t = useTranslations('Blog');
    const tPosts = useTranslations('BlogPosts');

    // Create localized posts array
    const localizedPosts = blogPosts.map(post => ({
        ...post,
        title: tPosts(`${post.slug}.title`, { fallback: post.title }),
        excerpt: tPosts(`${post.slug}.excerpt`, { fallback: post.excerpt }),
        category: tPosts(`${post.slug}.category`, { fallback: post.category }),
    }));

    return (
        <div className="py-10 px-6 max-w-[1000px] mx-auto w-full">
            <div className="mb-[60px] text-center">
                <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold font-heading text-[var(--title-color)] mb-4 leading-[1.1]">
                    {t('title').split(' ')[0]} <span className="bg-gradient-to-br from-[#fb923c] via-[#facc15] to-[#fde047] bg-clip-text text-transparent">{t('title').split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="text-[var(--muted-text)] text-lg max-w-[600px] mx-auto">
                    {t('subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
                {localizedPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
