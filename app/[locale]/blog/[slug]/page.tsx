import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "../data";
import BlogSchema from "../../../components/BlogSchema";
import { getTranslations } from "next-intl/server";
import BlogPostContent from "./BlogPostContent";

interface Props {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: ['Sohan Paliyal'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        },
        alternates: {
            canonical: `https://dailydev.tools/blog/${post.slug}`,
        },
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug, locale } = await params;
    const t = await getTranslations('Blog');
    const tPosts = await getTranslations('BlogPosts');

    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const localizedTitle = tPosts(`${post.slug}.title`, { fallback: post.title });
    const localizedExcerpt = tPosts(`${post.slug}.excerpt`, { fallback: post.excerpt });
    const localizedCategory = tPosts(`${post.slug}.category`, { fallback: post.category });

    return (
        <article className="py-10 px-6 max-w-[800px] mx-auto w-full">
            <BlogSchema
                title={localizedTitle}
                description={localizedExcerpt}
                url={`https://dailydev.tools/blog/${post.slug}`}
                datePublished={post.date}
            />
            <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] inline-flex mb-8 px-4 py-2 text-[13px]"
            >
                <ArrowLeft size={14} />
                {t('backToBlog')}
            </Link>

            <header className="mb-10 border-b border-[var(--border-color)] pb-10">
                <div className="flex gap-3 mb-5">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#f973161a] border border-[#f9731633] rounded-full text-[13px] text-[#fb923c]">{localizedCategory}</span>
                </div>

                <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold text-[var(--title-color)] mb-6 leading-[1.2]">
                    {localizedTitle}
                </h1>

                <div className="flex flex-wrap gap-6 text-[var(--muted-text)] text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {post.readTime}
                    </div>
                </div>
            </header>

            {/* Content Renderer - Styles are defined once in the component */}
            <BlogPostContent slug={post.slug} blocks={post.blocks} />

            <hr className="my-[60px] border-[var(--border-color)]" />

            <div className="text-center mb-10">
                <p className="text-[var(--muted-text)] mb-4">{t('enjoyedArticle')}</p>
                <Link href="/#tools" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]">
                    {t('checkTools')}
                </Link>
            </div>

            <div className="mt-10">
                {/* <AdUnit slot="blog_post_bottom" /> */}
            </div>
        </article>
    );
}
