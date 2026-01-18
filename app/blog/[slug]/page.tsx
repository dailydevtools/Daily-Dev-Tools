import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "../data";
import AdUnit from "../../components/AdUnit";
import BlogSchema from "../../components/BlogSchema";

interface Props {
    params: Promise<{ slug: string }>;
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
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article style={{ padding: '40px 24px', maxWidth: 800, margin: '0 auto', width: '100%' }}>
            <BlogSchema
                title={post.title}
                description={post.excerpt}
                url={`https://dailydev.tools/blog/${post.slug}`}
                datePublished={post.date}
            />
            <Link
                href="/blog"
                className="btn-secondary"
                style={{ display: 'inline-flex', marginBottom: 32, padding: '8px 16px', fontSize: 13 }}
            >
                <ArrowLeft size={14} />
                Back to Blog
            </Link>

            <header style={{ marginBottom: 40, borderBottom: '1px solid var(--border-color)', paddingBottom: 40 }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                    <span className="badge">{post.category}</span>
                </div>

                <h1 style={{
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: 800,
                    color: 'var(--title-color)',
                    marginBottom: 24,
                    lineHeight: 1.2
                }}>
                    {post.title}
                </h1>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, color: 'var(--muted-text)', fontSize: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Calendar size={16} />
                        {post.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Clock size={16} />
                        {post.readTime}
                    </div>
                </div>
            </header>

            {/* Content Injection - Safe because data is curated in data.ts */}
            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{ fontSize: 18, lineHeight: 1.8, color: 'var(--foreground)' }}
            />

            <hr style={{ margin: '60px 0', borderColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <p style={{ color: 'var(--muted-text)', marginBottom: 16 }}>Enjoyed this article?</p>
                <Link href="/#tools" className="btn-primary">
                    Check out our Tools
                </Link>
            </div>

            <div style={{ marginTop: 40 }}>
                {/* <AdUnit slot="blog_post_bottom" /> */}
            </div>
        </article>
    );
}
