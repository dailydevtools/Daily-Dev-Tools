import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="glass-card"
            style={{
                textDecoration: 'none',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="badge">{post.category}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted-text)' }}>
                        <Calendar size={14} />
                        {post.date}
                    </div>
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--title-color)', marginBottom: 12, lineHeight: 1.4 }}>
                    {post.title}
                </h3>

                <p style={{ color: 'var(--muted-text)', fontSize: 15, lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                    {post.excerpt}
                </p>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: 16,
                    marginTop: 'auto'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted-text)' }}>
                        <Clock size={14} />
                        {post.readTime}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fb923c', fontSize: 14, fontWeight: 500 }}>
                        Read Article
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
