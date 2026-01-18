import { blogPosts } from "./data";
import BlogCard from "../components/BlogCard";

export const metadata = {
    title: "Developer Blog - DailyDevTools",
    description: "Tutorials, guides, and best practices for developers.",
};

export default function BlogIndex() {
    return (
        <div style={{ padding: '40px 24px', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
            <div style={{ marginBottom: 60, textAlign: 'center' }}>
                <h1 style={{
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: 800,
                    color: 'var(--title-color)',
                    marginBottom: 16,
                    lineHeight: 1.1
                }}>
                    Developer <span className="gradient-text">Resources</span>
                </h1>
                <p style={{ color: 'var(--muted-text)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
                    Deep dives into the tools we build and the concepts behind them.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 32
            }}>
                {blogPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
